import {Container, Sprite, Texture} from "../libs/pixi.mjs";

// export class Background extends Container {
export class Background extends Container{
    constructor() {
        super();

        this.back = this.addChild(new Sprite(Texture.from('back')));
        this.back.anchor.set(0.5);
        this.back.animationSpeed = 0.5;
    }
}