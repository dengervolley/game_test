import {Container, AnimatedSprite, Texture} from "./libs/pixi.mjs";

export class Man extends Container {
    constructor() {
        super();
        this.walkTextures = [
            Texture.from('manWalk1'),
            Texture.from('manWalk2'),
            Texture.from('manWalk3'),
            Texture.from('manWalk4'),
            Texture.from('manWalk5'),
            Texture.from('manWalk6'),
            Texture.from('manWalk7'),
            Texture.from('manWalk8')
        ];
        this.zombieTextures = [
            Texture.from('manZombie1'),
            Texture.from('manZombie1'),
            Texture.from('manZombie2'),
            Texture.from('manZombie2'),
            Texture.from('manZombie3'),
            Texture.from('manZombie3'),
            Texture.from('manZombie4'),
            Texture.from('manZombie4')
        ];
        this.stopTextures = [Texture.from('manStop')];
        this.view = new AnimatedSprite(this.stopTextures);
        this.view.scale.set(0.4);
        this.view.anchor.set(0.5);
        this.view.animationSpeed = 0.2;

        this.addChild(this.view);

        this.stop();
        window['man'] = this.view;
    }

    walk() {
        this.view.textures =  this.walkTextures;
        this.view.play();
    }

    stop() {
        this.view.textures =  this.stopTextures;
        this.view.stop();
        this.view.loop = true;
    }

    standZombie() {
        this.view.textures =  this.zombieTextures;
        this.view.play();
        this.view.loop = false;
    }
}
