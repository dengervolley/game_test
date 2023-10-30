import {Application, Graphics} from "./libs/pixi.mjs";
import {AssetsMap} from './AssetsMap.js';
import {Stage} from './stage/Stage.js';

// Create the application
const width = 960;
const height = 480;

export const app = window.app = new Application({
    width: width,
    height: height,
    backgroundColor: 0xc3a009,
    view: document.getElementById('game-container'),
});

const runGame = () => {

    const stage = new Stage();
    app.stage.addChild(stage);
    app.stage.position.set(width / 2, height / 2);
    app.stage.scale.set(0.75);

    app.ticker.add(() => {
        TWEEN.update();
        stage.tick();
    });
}

const loader = app.loader;
loader.onError.add((error) => {
    console.error(error);
});

AssetsMap.sprites.forEach((value) => app.loader.add(value));

app.loader.load(runGame);

export default app;
