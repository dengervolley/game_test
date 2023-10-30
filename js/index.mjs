import {Application} from "./libs/pixi.mjs";
import {AssetsMap} from './AssetsMap.js';
import {Stage} from './stage/Stage.js';
import {config} from './Config.js'

// Create the application
const width = config.gameWidth;
const height = config.gameHeight;

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
    handleResize();

    app.ticker.add(() => {
        TWEEN.update();
        stage.tick();
    });
}

const loader = app.loader;
loader.onError.add((error) => {
    console.error(error);
});


const canvas = app.view;
const stage = app.stage;
const maxWidth = config.gameWidth;
const aspectRatio = 2;
const uiWidth = 960;

function handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gameUI = document.getElementById('gameUI');
    let newCanvasWidth, newCanvasHeight;

    if (windowWidth / windowHeight > aspectRatio) {
        newCanvasHeight = windowHeight;
        newCanvasWidth = newCanvasHeight * aspectRatio;
    } else {
        newCanvasWidth = windowWidth;
        newCanvasHeight = newCanvasWidth / aspectRatio;
    }

    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;

    const scale = Math.min(1, newCanvasWidth / uiWidth);
    gameUI.style.top = `${newCanvasHeight -51}px`;
    gameUI.style.transform = `scale(${scale})`;

    const scaleFactor = newCanvasWidth / maxWidth;
    stage.scale.set(scaleFactor);
    stage.position.set(width * scaleFactor / 2, height * scaleFactor / 2);



    app.renderer.resize(newCanvasWidth, newCanvasHeight);
}

window.addEventListener('resize', handleResize);

AssetsMap.sprites.forEach((value) => app.loader.add(value));

app.loader.load(runGame);


export default app;
