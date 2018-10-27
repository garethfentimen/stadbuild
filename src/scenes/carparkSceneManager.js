import * as three from 'three';
import drawCarpark from './CarparkSubject';
import carparkLights from './carparkLights';
import squareTexture from './square-outline-textured.png';

const SceneManager = (canvas, xOffset, yOffset) => {
    const clock = new three.Clock();
    const objects = [];
    let camera = {};

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const buildScene = () => {
        const scene = new three.Scene();
        scene.background = new three.Color("#F0F0F0");
                
        // grid
        var gridHelper = new three.GridHelper( 1000, 20 );
        scene.add( gridHelper );

        // cubes
        cubeGeo = new three.BoxBufferGeometry( 50, 50, 50 );

        return scene;
    }

    const createSceneSubjects = (scene) => {
        const sceneSubjects = [
            new drawCarpark(scene),
            new carparkLights(scene)
            //new SceneSubject(scene)
        ];

        return sceneSubjects;
    }

    const update = (time) => {
        const elapsedTime = clock.getElapsedTime();

        for(let i = 0; i < sceneSubjects.length; i++) {
            if (!sceneSubjects[i].stable)
                sceneSubjects[i].update(elapsedTime);
        }

        renderer.render(scene, camera);
    }

    const buildRender = ({ width, height }) => {
        const renderer = new three.WebGLRenderer({ canvas, antialias: true, alpha: true }); 
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    const buildCamera = ({ width, height }) => {
        const aspectRatio = width / height;
        const fieldOfView = 38;
        const nearPlane = 1;
        const farPlane = 10000; 
        const aCamera = new three.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        aCamera.position.set( 500, 650, 1300 );
        aCamera.lookAt( 0, 0, 0 );

        console.log('built camera');
        return aCamera;
    }

    const onWindowResize = () => {
        const { width, height } = canvas;
        
        console.log(width, height);
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }

    function onDocumentMouseMove( event ) {
        event.preventDefault();
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

    var cubeGeo, cubeMaterial;
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        const clientX = event.clientX - xOffset;
        const clientY = event.clientY - yOffset;
        mouse.set( ( clientX / screenDimensions.width ) * 2 - 1, - ( clientY / screenDimensions.height ) * 2 + 1 );
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( objects );
        if ( intersects.length > 0 ) {
            var intersect = intersects[ 0 ];
            // delete cube
            // if ( isShiftDown ) {
            //     if ( intersect.object !== plane ) {
            //         scene.remove( intersect.object );
            //         objects.splice( objects.indexOf( intersect.object ), 1 );
            //     }
            // create cube
            //} else {
                cubeMaterial = new three.MeshLambertMaterial(
                    { color: 0xfeb74c, map: new three.TextureLoader().load(squareTexture) }
                );
                var voxel = new three.Mesh( cubeGeo, cubeMaterial );
                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                scene.add( voxel );
                objects.push( voxel );
            }
            renderer.render(scene, camera);
    }

    const scene = buildScene();
    const sceneSubjects = createSceneSubjects(scene);
    const renderer = buildRender(screenDimensions);
    camera = buildCamera(screenDimensions);

    var rollOverGeo = new three.BoxBufferGeometry( 50, 50, 50 );
    const rollOverMaterial = new three.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    const rollOverMesh = new three.Mesh( rollOverGeo, rollOverMaterial );
    scene.add( rollOverMesh );
                
    const raycaster = new three.Raycaster();
    const mouse = new three.Vector2();
    var geometry = new three.PlaneBufferGeometry( 1000, 1000 );
    geometry.rotateX( - Math.PI / 2 );

    const plane = new three.Mesh( geometry, new three.MeshBasicMaterial( { visible: false } ) );
    scene.add( plane );
    objects.push( plane );

    return {
        update,
        onWindowResize,
        onDocumentMouseMove,
        onDocumentMouseDown
    }
}

export default SceneManager;