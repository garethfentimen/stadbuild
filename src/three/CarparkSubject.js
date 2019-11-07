import * as THREE from 'three';

export default drawCarpark => {    
    const group = new THREE.Group();

    const greySquare = new THREE.Shape();
    const geometry = new THREE.BoxGeometry( 40, 5, 40 );
    const material = new THREE.MeshStandardMaterial( { color: 'grey' } );
    material.alphaMap = new THREE.TextureLoader().load('/textures/asphalt_texture.jpg');
    const cube = new THREE.Mesh( geometry, material );
    drawCarpark.add(cube);

    function update(time) {

    }

    return {
        update,
        stable: true,
        follow: true
    }
};