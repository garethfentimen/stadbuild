import CarparkSceneManager from './CarparkSceneManager';
import Carpark from './Carpark';

export default carparkContainer => {
    const canvas = createCanvas(document, carparkContainer);
    const sceneManager = new CarparkSceneManager(canvas);

    render();
    function createCanvas(document, threeContainer) {
        const canvas = document.createElement('canvas');     
        threeContainer.appendChild(canvas);
        return canvas;
    }

    function render() {
        requestAnimationFrame(render);
        sceneManager.update();
    }
};
