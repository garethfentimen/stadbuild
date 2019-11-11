import * as three from 'three';
import SceneSubject from './sceneSubject';
import GeneralLights from './generalLights';
import buildScene from './scene/buildScene';
import buildRenderer from './scene/renderScene';
import buildCamera from './scene/camera';
import drawCarpark from '../scenes/CarparkSubject';

export default canvas => {
    const clock = new three.Clock();
    const origin = new three.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }

    const scene = buildScene(three);
    const renderer = buildRenderer(three, canvas, screenDimensions);
    const camera = buildCamera(three, screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new drawCarpark(scene)
            //new GeneralLights(scene),
            //new SceneSubject(scene)
        ];

        return sceneSubjects;
    }

    // animation here
    function update() {
        const elapsedTime = clock.getElapsedTime();

        for(let i = 0; i < sceneSubjects.length; i++) {
            if (!sceneSubjects[i].stable)
                sceneSubjects[i].update(elapsedTime);
        }

        updateCameraPositionRelativeToMouse(camera);

        renderer.render(scene, camera);
    }

    function updateCameraPositionRelativeToMouse() {
        camera.position.x += (  (mousePosition.x * 0.1) - camera.position.x ) *  1;
        camera.position.y += ( -(mousePosition.y * 0.1) - camera.position.y ) * 0.1;
        camera.lookAt(origin);
    }

    function onWindowResize() {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    return {
        update,
        onWindowResize,
        onMouseMove
    }
}