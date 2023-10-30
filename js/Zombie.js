import {Container, Sprite, Texture} from "./libs/pixi.mjs";

export class Zombie extends Container {
    constructor() {
        super();

        const textures = ['zMan', 'zGirl', 'zGranny', 'zPoliceman'];

        this.view = this.addChild(new Sprite(Texture.from(this.getRandomTexture(textures))));
        this.view.anchor.set(0.5);
        this.view.scale.set(-0.4, 0.4);

        // const marker = new Graphics()
        //     .beginFill(0xff0000, 0.9)
        //     .drawCircle(0, 0, 5)
        //     .endFill();
        // this.view.addChild(marker)
    }

    getRandomTexture(textures) {
        return textures[Math.floor(Math.random() * textures.length)];
    }

    async walk() {
        return new Promise((resolve, reject) => {
            const tween = new TWEEN.Tween(this.view)
                .to({ x: -80, rotation: -0.6 }, 200)
                .onComplete(() => {
                    resolve();
                })
                .start();
        });
    }

}