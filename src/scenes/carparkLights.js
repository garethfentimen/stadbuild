import * as THREE from 'three'

export default class carparkLights {
    constructor(scene) {
        this.scene = scene;
    }

    rad = 80;
    lightOut;

    doLighting() {
        var ambientLight = new THREE.AmbientLight( 0x606060 );
        this.scene.add( ambientLight );
    
        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        this.scene.add( directionalLight );
    
        const lightIn = new THREE.PointLight("#4CAF50", 30);
        this.lightOut = new THREE.PointLight("#2196F3", 10);
        this.lightOut.position.set(40,20,40);
        this.scene.add( lightIn );
        this.scene.add( this.lightOut );
    }

    update(time) {
        if (this.lightOut) {
            const x = this.rad * Math.sin(time*0.2)
            this.lightOut.position.x = x;
        }
    }         
}