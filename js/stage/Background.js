import {Container, Sprite, Texture} from "../libs/pixi.mjs";
import {config} from "../Config.js";

// export class Background extends Container {
export class Background extends Container{
    constructor() {
        super();

        this._view = new Container();

        this.back = this.addChild(new Sprite(Texture.from('back')));
        // this.back.scale.set(0.75);
        this.back.anchor.set(0.5);
        this.back.animationSpeed = 0.5;
        // this.back2 = this.addChild(new Sprite(Texture.from('back')));
        // // this.back2.scale.set(0.75);
        // this.back2.anchor.set(0.5);
        // this.back2.position.x = config.backWidth;
        // this.back2.animationSpeed = 0.5;
    }
}