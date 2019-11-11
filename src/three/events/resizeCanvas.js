export default (canvas, sceneManager, {innerWidth, innerHeight}) => {     
    canvas.style.width = `${innerWidth - 20}px`;
    canvas.style.height = `${innerHeight - 140}px`;
    
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize(canvas);

    return {
        cavasWidth: canvas.offsetWidth,
        canvasHeight: canvas.offsetHeight,
        canvasHalfWidth: Math.round(canvas.offsetWidth/2),
        canvasHalfHeight: Math.round(canvas.offsetHeight/2)
    }
}