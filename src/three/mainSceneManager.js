import * as three from 'three';
import buildScene from './scene/buildScene';
import buildRenderer from './scene/renderScene';
import buildCamera from './scene/camera';
import carpark from './CarparkSubject';
import carparkLights from './carparkLights';
const squareTexture = '/textures/square-outline-textured.png';

const SceneManager = (canvas, xOffset, yOffset, store) => {
    const clock = new three.Clock();
    const objects = [];
    let camera = {};

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
    camera = buildCamera(three, screenDimensions).grid();

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

    const raycaster = new three.Raycaster();

    function onMouseMove(event) {
        event.preventDefault();
        console.log(event.clientX, event.clientY, screenDimensions);
        const clientX = event.clientX - xOffset;
        const clientY = event.clientY - yOffset;
        mouse.set( ( clientX / screenDimensions.width ) * 2 - 1, - ( clientY / screenDimensions.height ) * 2 + 1 );
        if (camera) {
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( objects );
            if ( intersects.length > 0 ) {
                var intersect = intersects[ 0 ];
                rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
                rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            }
            renderer.render(scene, camera);
        }
    }

    var cubeGeo = new three.BoxBufferGeometry( 50, 50, 50 ), cubeMaterial;
    const texture = new three.TextureLoader().load(squareTexture);
    texture.encoding = three.sRGBEncoding;
    cubeMaterial = new three.MeshLambertMaterial( {
        color: 0xC0C0C0,
        map: texture
    });
        
    const onMouseDown = ( event ) => {
        event.preventDefault();
        const clientX = event.clientX - xOffset;
        const clientY = event.clientY - yOffset;
        mouse.set( ( clientX / screenDimensions.width ) * 2 - 1, - ( clientY / screenDimensions.height ) * 2 + 1 );
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( objects );
        if (intersects.length > 0) {
            var intersect = intersects[ 0 ];
            // delete cube
            if ( store.getState().stadiumBuilder.deleteMode ) {
                if ( intersect.object !== plane ) {
                    scene.remove( intersect.object );
                    objects.splice( objects.indexOf( intersect.object ), 1 );
                }
            } else {
                // cubeMaterial = new three.MeshLambertMaterial(
                //     { color: 0xfeb74c, map: new three.TextureLoader().load(squareTexture) }
                // );
                console.log(cubeMaterial);
                var voxel = new three.Mesh( cubeGeo, cubeMaterial );
                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                scene.add( voxel );
                objects.push( voxel );
            }
            renderer.render(scene, camera);
        }
    }

    var rollOverGeo = new three.BoxBufferGeometry( 50, 50, 50 );
    const rollOverMaterial = new three.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    const rollOverMesh = new three.Mesh( rollOverGeo, rollOverMaterial );
    scene.add( rollOverMesh );
                
    const mouse = new three.Vector2();
    var geometry = new three.PlaneBufferGeometry( 1000, 1000 );
    geometry.rotateX( - Math.PI / 2 );

    const plane = new three.Mesh( geometry, new three.MeshBasicMaterial( { visible: false } ) );
    scene.add( plane );
    objects.push( plane );

    return {
        update,
        onWindowResize,
        onMouseMove,
        onMouseDown
    }
}

export default SceneManager;