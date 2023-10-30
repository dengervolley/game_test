import {Sprite, Texture} from "./libs/pixi.mjs";

export class Profit extends Sprite {
    constructor() {
        super();

        this.textures = ['apple', 'box', 'chocolate', 'firstAidKit', 'money', 'shotgun',];
        const texture = this.getRandomTexture(this.textures);
        this.view = this.addChild(new Sprite(Texture.from(texture)));
        this.view.anchor.set(0.5);
        this.view.scale.set(-0.15, 0.15);
        this.view.y = 80;
    }

    getRandomTexture(textures) {
        return textures[Math.floor(Math.random() * textures.length)];
    }
}