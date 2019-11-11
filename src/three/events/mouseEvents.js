import * as three from 'three';
const squareTexture = '/textures/square-outline-textured.png';

export default class mouseEvents {
    constructor(scene, offsets) {
        this.geometry = new three.PlaneBufferGeometry( 1000, 1000 );
        this.geometry.rotateX( - Math.PI / 2 );
        this.offsets = offsets;

        this.plane = new three.Mesh(this.geometry, new three.MeshBasicMaterial( { visible: false } ));
        scene.add(this.plane);
        this.objects = [];
        this.objects.push(this.plane);

        this.raycaster = new three.Raycaster();
        this.mouse = new three.Vector2();

        this.cubeGeo = new three.BoxBufferGeometry( 50, 50, 50 );
        const texture = new three.TextureLoader().load(squareTexture);
        texture.encoding = three.sRGBEncoding;
        this.cubeMaterial = new three.MeshLambertMaterial( {
            color: 0xC0C0C0,
            map: texture
        });

        var rollOverGeo = new three.BoxBufferGeometry( 50, 50, 50 );
        const rollOverMaterial = new three.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
        const rollOverMesh = new three.Mesh( rollOverGeo, rollOverMaterial );
        scene.add( rollOverMesh );
        this.rollOverMesh = rollOverMesh;
    }

    mouseDown(event, {width, height}, deleteMode, camera, renderer, scene) {     
        event.preventDefault();
        const clientX = event.clientX - this.offsets.x;
        const clientY = event.clientY - this.offsets.y;
        this.mouse.set( ( clientX / width ) * 2 - 1, - ( clientY / height ) * 2 + 1 );
        this.raycaster.setFromCamera( this.mouse, camera );
        var intersects = this.raycaster.intersectObjects(this.objects);
        if (intersects.length > 0) {
            var intersect = intersects[ 0 ];
            // delete cube
            if (deleteMode) {
                if ( intersect.object !== this.plane ) {
                    scene.remove( intersect.object );
                    this.objects.splice( this.objects.indexOf( intersect.object ), 1 );
                }
            } else {
                var voxel = new three.Mesh( this.cubeGeo, this.cubeMaterial );
                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                scene.add( voxel );
                this.objects.push( voxel );
            }
            renderer.render(scene, camera);
        }
    }

    mouseMove(event, {width, height}, camera, renderer, scene) {
        event.preventDefault();
        const clientX = event.clientX - this.offsets.x;
        const clientY = event.clientY - this.offsets.y;
        this.mouse.set( ( clientX / width ) * 2 - 1, - ( clientY / height ) * 2 + 1 );
        if (camera) {
            this.raycaster.setFromCamera( this.mouse, camera );
            var intersects = this.raycaster.intersectObjects( this.objects );
            if ( intersects.length > 0 ) {
                var intersect = intersects[ 0 ];
                this.rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
                this.rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            }
            renderer.render(scene, camera);
        }
    }
}