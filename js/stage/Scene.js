import {Container, Sprite, Texture, Text} from "../libs/pixi.mjs";
import {config} from "../Config.js";
import {Background} from "./Background.js";
import {Man} from "../Man.js";
import {Zombie} from "../Zombie.js";
import ui from "../page/LogicUI.mjs";
import {Profit} from "../Profit.js";
import {GamePopup} from "../popups/GamePopup.js";

export class Scene extends Container {
    constructor() {
        super();
        this.speed = config.speed;
        this.containerCount = 2;
        this.zombiesContainer = 0;
        this.isPlaying = false;
        this.treePositions = config.trees;
        this.profit = [];
        this.treeTextures = ['tree1', 'tree2', 'tree3'];
        this.width = config.backWidth;

        this.elementsContainer = this.addChild(new Container());

        this._addTreeConts();
        this.man = this.addChild(new Man());
        this.man.y = 120;

        this.logo = this.addChild(Sprite.from('logo'));
        this.logo.anchor.set(0.5);
        this.logo.scale.set(0.2);
        this.logo.y = -270;
        this.logo.x = -480;

        window["logo"] = this.logo;
        this.addListeners();
        this.addPopup();
    }

    addListeners() {
        this.animationRunning = false;
        ui.startStopButton.addEventListener('click', () => {
            if (this.animationRunning) {
                this.stopRound(true); // Stop round
            } else {
                this.playRound(); // Start round
            }
        });
    }

    _addBack(cont) {
        cont.addChild(new Background());
    }

    _addTreeConts() {
        const pos1 = {x: 0, y: 0};
        const pos2 = {x: config.backWidth, y: 0};

        this.treeCont1 = this.elementsContainer.addChild(new Container());
        this.treeCont2 = this.elementsContainer.addChild(new Container());
        this.treeCont1.number = 0;
        this.treeCont2.number = 1;
        this.treeCont2.position.set(pos2.x, pos2.y);
        this._addBack(this.treeCont1);
        this._addBack(this.treeCont2);
        this._addTrees(this.treeCont1);
        this._addTrees(this.treeCont2);
    }

    _addTrees(container) {
        container.trees = [];
        this.treePositions.forEach((data, i) => {
            const tree = container.addChild(new Sprite(Texture.from(this.treeTextures[i])));
            tree.anchor.set(data.anchorX, 0.5);
            tree.position.set(data.x, data.y);
            container.trees.push(tree);
        })
    }

    determineWhereZombieWillBe() {
        this.zombiesContainer = Math.floor(Math.random() * config.maxContNumber + 1);
    }

    addZombie(container) {
        const choosedTree = Math.floor(Math.random() * 3);

        this.zombie = container.addChildAt(new Zombie(), container.getChildIndex(container.trees[choosedTree]));
        this.zombie.x = config.trees[choosedTree].x;
        this.zombie.y = 90;
    }

    addProfit(container) {
        if (!this.probabilityProfitInContainer()) return;
        config.trees.forEach(pos => {
            if (Math.random() > 0.5) {
                const thing = container.addChild(new Profit());
                thing.x = pos.x;
                thing.y = 80;
                this.profit.push(thing);
            }
        });
    }

    probabilityProfitInContainer() {
        return Math.random() < 0.8;
    }


    clear() {
        this.parent.removeChild(this);
        this.destroy({children: true});
    }

    playRound() {
        this.isPlaying = true;
        if (ui.balance < ui.bet) {
            this.isPlaying = false;
            this.showPopup('popupNoMoney');
            return;
        }
        this.man.walk();
        ui.decreaseBalance();
        ui.setRoundWin(0);
        ui.deactivateBetButtons();
        ui.startStopButton.textContent = 'Stop Round';
        this.determineWhereZombieWillBe();
        this.animationRunning = !this.animationRunning;
    }

    async stopRound(isWin = false) {
        this.isPlaying = false;
        this.man.stop();
        if (isWin) {
            ui.increaseBalance();
        } else {
            ui.setRoundWin(0);
            await this.zombie.walk();
            this.man.standZombie();
        }
        ui.startStopButton.textContent = 'Start Round';
        ui.deactivatePlayButton();
        const popupName = isWin ? 'popupWin' : 'popupLose';
        await this.showPopup(popupName);
        this.animationRunning = !this.animationRunning;
    }

    restartScene() {
        this.profit.forEach(thing => {
            thing.parent.removeChild(thing);
            thing.destroy();
            thing = null;
        });
        if (this.zombie) {
            this.zombie.parent.removeChild(this.zombie);
            this.zombie.destroy();
            this.zombie = null;
        }
        this.man.stop();
        this.containerCount = 2;
        this.treeCont1.number = 0;
        this.treeCont2.number = 1;
        this.treeCont1.x = 0;
        this.treeCont2.x = config.backWidth;
        this.profit.length = 0;
    }

    checkZombie(containers) {
        containers.forEach(cont => {
            if (cont.number === this.zombiesContainer) {
                !this.zombie && this.addZombie(cont);
            }
        });
    }

    collectProfit() { // todo
        if (!this.profit.length) return;

        const profitPos = this.profit[0].parent.toGlobal(this.profit[0].position).x;
        const manGlobalPos = this.toGlobal(this.man.position).x;

        if (profitPos - manGlobalPos <= 20) {
            ui.increaseRoundWin();
            let thing = this.profit.shift();
            new TWEEN.Tween(thing)
                .to({alpha: 0}, 300)
                .onComplete(() => {
                    thing.parent.removeChild(thing);
                    thing.destroy();
                    thing = null;
                })
                .start();
        }
    }

    addPopup() {
        this.popup = this.addChild(new GamePopup());
        window["popup"] = this.popup;
    }

    async showPopup(popupName) {
        this.popup.once('resetPage', () => this.restartScene());
        ui.deactivatePlayButton();
        await this.popup.show(popupName);
        await this.popup.hide();
        ui.activatePlayButton();
        ui.activateBetButtons();
    }

    checkEndRound() {
        if (!this.zombie) return false;
        const zGlobalPos = this.zombie.parent.toGlobal(this.zombie.position).x;
        const manGlobalPos = this.toGlobal(this.man.position).x;

        return zGlobalPos - manGlobalPos <= 100;
    }

    tick() {
        if (!this.isPlaying) return;
        this.checkZombie([this.treeCont1, this.treeCont2]);
        this.collectProfit();

        if (this.checkEndRound()) {
            this.stopRound(false);

        }

        [this.treeCont1, this.treeCont2].forEach(cont => {
            cont.position.x -= this.speed;
            if (cont.position.x < -config.backWidth) {
                cont.position.x = config.backWidth - this.speed;
                cont.number = this.containerCount;
                this.addProfit(cont);
                if (this.containerCount < config.maxContNumber) this.containerCount++;
            }
        });

    }
}