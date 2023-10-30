import {Container, Graphics, Sprite, Text, Texture} from '../libs/pixi.mjs';
import {config} from '../Config.js';
import ui from '../page/LogicUI.mjs';

export class GamePopup extends Container {
    constructor() {
        super();

        const width = config.backWidth;
        const height = config.backHeight;
        this.back = new Graphics()
            .beginFill(0x000)
            .drawRect(-width / 2, -height / 2, width, height)
            .endFill();
        this.addChild(this.back);
        this.back.alpha = 0;

        this.item = this.addChild(Sprite.from('popupWin'));
        this.item.anchor.set(0.5);
        this.item.scale.set(0.5);
        this.item.visible = false;
        this.item.alpha = 0;
        this.text = this.item.addChild(new Text('0', {
            fontFamily: 'Arial',
            fontSize: 62,
            fill: 0xff0000,
            align: 'center',
            fontWeight: "bolder",
            stroke: "#0e0af5",
            strokeThickness: 4
        }));
        this.text.visible = false;

        this.text.anchor.set(0.5);
        this.text.y = 380;
    }

    show(name) {
        this.text.text = `${ui.roundWin}`;
        if(name === 'popupWin') this.text.visible = true;
        this.item.texture = Texture.from(name);
        this.item.visible = true;
        new TWEEN.Tween(this.back)
            .to({alpha: 0.75}, 300)
            .start();
        new TWEEN.Tween(this.item)
            .to({alpha: 1}, 300)
            .start();
    }

    async hide() {
        return new Promise((resolve, reject) => {
            this.back.alpha = 0.75;
            const tween2 = new TWEEN.Tween(this.back)
                .to({alpha: 0}, 300)
                .onComplete(() => {
                    resolve();
                });
            const itemTween = new TWEEN.Tween(this.item)
                .to({alpha: 0}, 300)
                .onComplete(() => {
                    this.item.visible = false;
                    this.text.visible = false;
                });
            new TWEEN.Tween(this.back)
                .delay(config.waitTime)
                .to({alpha: 1}, 300)
                .onComplete(() => {
                    this.emit('resetPage');
                    tween2.start();
                    itemTween.start();
                })
                .start();
        });
    }
}