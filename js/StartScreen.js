import {Container, Sprite, Text, Texture} from "./libs/pixi.mjs";
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
        const tapText = this.addChild(new Text('TAP ENYWHERE TO START', {
                fontFamily: 'Arial',
                fontSize: 32,
                fill: 0xff1010,
                align: 'center',
                fontWeight: "bold",
                stroke: "#0e0af5",
                strokeThickness: 4
            }));

        tapText.anchor.set(0.5);
        tapText.y = 290;
    }
}