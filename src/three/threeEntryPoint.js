import SceneManager from './sceneManager';
import resizeCanvas from './events/resizeCanvas';

export default containerElement => {
    const createCanvas = (document, containerElement) => {
        const canvas = document.createElement('canvas');     
        containerElement.appendChild(canvas);
        return canvas;
    }

    const canvas = createCanvas(document, containerElement);
    const sceneManager = new SceneManager(canvas);

    const bindEventListeners = () => {
        let canvasHalfWidth;
        let canvasHalfHeight;
        window.onresize = function() {
            const canvasHalf = resizeCanvas(canvas, sceneManager);
            canvasHalfHeight = canvasHalf.canvasHalfHeight;
            canvasHalfWidth = canvasHalf.canvasHalfWidth;
        };
        window.onmousemove = function () {
            const { screenX, screenY } = window;
            sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
        };
    }

    bindEventListeners();
    animate();

    function animate() {
        // recursion here using animation frame to start animation polling
        requestAnimationFrame(animate);
        sceneManager.update();
    }
}