import {Container} from "../libs/pixi.mjs";
import {config} from "../Config.js";
import {Scene} from "./Scene.js";
import {StartScreen} from "../StartScreen.js";

export class Stage extends Container {
    constructor() {
        super();
        this.stage = app.stage;
        this.speed = config.speed;

        this._init();
    }

    _init() {
        this.scene = new Scene();
        this.startScreen = new StartScreen()
        this.stage.addChild(this.scene);
        this.stage.addChild(this.startScreen);
    }

    tick() {
        this.scene.tick();
        this.startScreen.tick();
    }
}