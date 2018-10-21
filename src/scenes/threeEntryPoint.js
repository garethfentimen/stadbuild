import SceneManager from './carparkSceneManager';

const containerElement = (element, xOffset, yOffset) => {
    const canvas = createCanvas(document, element);
    const sceneManager = new SceneManager(canvas, xOffset, yOffset);
    let canvasHalfWidth;
    let canvasHalfHeight;
    render();
    bindEventListeners();

    function createCanvas(document, element) {
        const canvas = document.createElement('canvas');     
        element.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        //window.onresize = resizeCanvas;
        window.onmousemove = sceneManager.onDocumentMouseMove;
        window.onmousedown = sceneManager.onDocumentMouseDown;
        resizeCanvas();	
    }

    function resizeCanvas() {       
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        canvas.width  = canvas.offsetWidth + xOffset;
        canvas.height = canvas.offsetHeight + yOffset;

        canvasHalfWidth = Math.round(canvas.offsetWidth + xOffset/2);
        canvasHalfHeight = Math.round(canvas.offsetHeight + yOffset/2);

        sceneManager.onWindowResize()
    }

    function mouseMove({screenX, screenY}) {
        sceneManager.onMouseMove(screenX-canvasHalfWidth, screenY-canvasHalfHeight);
    }

    function render() {
        requestAnimationFrame(render);
        sceneManager.update();
    }
}

export default containerElement;