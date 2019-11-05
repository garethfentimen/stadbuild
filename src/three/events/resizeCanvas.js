export default (canvas, sceneManager) => {     
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();

    return {
        canvasHalfWidth: Math.round(canvas.offsetWidth/2),
        canvasHalfHeight: Math.round(canvas.offsetHeight/2)
    }
}