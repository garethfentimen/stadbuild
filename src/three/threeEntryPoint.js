import SceneManager from './mainSceneManager';
import resizeCanvas from './events/resizeCanvas';

const containerElement = (containerElement, xOffset, yOffset, store) => {
    const createCanvas = (document, containerElement) => {
        const canvas = document.createElement('canvas');     
        containerElement.appendChild(canvas);
        return canvas;
    }

    const canvas = createCanvas(document, containerElement);
    const sceneManager = new SceneManager(canvas, xOffset, yOffset, store);

    const bindEventListeners = () => {
        window.onresize = function() {
            resizeCanvas(canvas, sceneManager);
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