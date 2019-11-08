import * as three from 'three';
import buildScene from './scene/buildScene';
import buildRenderer from './scene/renderScene';
import buildCamera from './scene/camera';
import mouseEvents from './events/mouseEvents';
import carpark from './CarparkSubject';
import carparkLights from './carparkLights';

const SceneManager = (canvas, store, offsets) => {
    const clock = new three.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene(three).grid();
    const sceneSubjects = [
        new carpark(scene),
        new carparkLights(scene)
    ];
    const renderer = buildRenderer(three, canvas, screenDimensions);
    const camera = buildCamera(three, screenDimensions).grid();

    const update = (time) => {
        const elapsedTime = clock.getElapsedTime();

        for(let i = 0; i < sceneSubjects.length; i++) {
            if (!sceneSubjects[i].stable)
                sceneSubjects[i].update(elapsedTime);
        }

        renderer.render(scene, camera);
    }

    const onWindowResize = ({ width, height }) => {
        console.log('resized', width, height);
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }

    const mouse = new mouseEvents(scene, offsets);

    return {
        update,
        onWindowResize,
        onMouseMove: (event) => mouse.mouseMove(
            event, screenDimensions, camera, renderer, scene
        ),
        onMouseDown: (event) => mouse.mouseDown(
            event, 
            screenDimensions, 
            store.getState().stadiumBuilder.deleteMode,
            camera,
            renderer,
            scene
        )
    }
}

export default SceneManager;