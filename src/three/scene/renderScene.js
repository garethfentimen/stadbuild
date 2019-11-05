
export default (three, canvas, { width, height }) => {
    const renderer = new three.WebGLRenderer(
        { 
            canvas, 
            antialias: true, 
            alpha: true 
        }); 
    const dpr = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true; 

    return renderer;
}