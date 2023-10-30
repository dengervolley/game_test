import {Container, Sprite, Texture} from "./libs/pixi.mjs";
import ui from "./page/LogicUI.mjs";

export class StartScreen extends Container {
    constructor() {
        super();

        this.back = this.addChild(new Sprite(Texture.from('startScreen')));
        this.back.anchor.set(0.5);

        this.interactive = true;
        this.tapEnywhere();

        this.on('pointerdown',() => {
            this.visible = false;
            this.removeChildren();
            this.parent.removeChild(this);
            ui.show();
        });
    }

    tapEnywhere() {
        const tapText = this.addChild(Sprite.from('tapText'));
        window.tapText = tapText;
        tapText.anchor.set(0.5);
        tapText.scale.set(0.4);
        tapText.y = 210;
    }

    tick() {

    }
}