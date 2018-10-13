import * as THREE from 'three';
import asphaltTexture from './asphalt_texture.jpg';

export default drawCarpark => {    
    const group = new THREE.Group();

    const greySquare = new THREE.Shape();
    const geometry = new THREE.BoxGeometry( 40, 30, 0 );
    const material = new THREE.MeshStandardMaterial( { color: 'grey' } );
    material.alphaMap = new THREE.TextureLoader().load(asphaltTexture);
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