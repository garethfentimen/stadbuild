import SceneManager from './mainSceneManager';
import resizeCanvas from './events/resizeCanvas';

const containerElement = (containerElement, xOffset, yOffset, store, textures) => {
    const createCanvas = (document, containerElement) => {
        const canvas = document.createElement('canvas');     
        containerElement.appendChild(canvas);
        return canvas;
    }

    const canvas = createCanvas(document, containerElement);
    const sceneManager = new SceneManager(canvas, xOffset, yOffset, store, textures);

    const bindEventListeners = () => {
        resizeCanvas(canvas, sceneManager, window);
        window.onresize = function(ev) {
            resizeCanvas(canvas, sceneManager, ev.currentTarget);
        };
        window.onmousemove = function (ev) {
            sceneManager.onMouseMove(ev);
        };
        window.onmousedown = sceneManager.onMouseDown;
    }

    bindEventListeners();
    animate();

    function animate() {
        // recursion here using animation frame to start animation polling
        requestAnimationFrame(animate);
        sceneManager.update();
    }
}

export default containerElement;