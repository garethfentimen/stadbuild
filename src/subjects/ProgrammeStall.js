import * as three from 'three';
import React, { Component } from 'react';
import GLTFLoader from 'three-gltf-loader';
import { DRACOLoader, OrbitControls } from 'three-full';

export default class ProgrammeStall extends Component {
    constructor() { 
        super();
        this.animate = this.animate.bind(this);
        this.camera = null;
    }

    mouseMove = (e) => {
        //this.camera.position.setY(e.clientY);
        //this.camera.position.setX(e.clientX);
        //this.camera.updateProjectionMatrix();
        //this.camera.rotateZ(10);
        //console.log(`x: ${this.camera.position.x} y: ${this.camera.position.y}`)
        //this.camera.updateProjectionMatrix();
    }

    componentDidMount() {
        const width = 200;
        const height = 300;

        const renderer = new three.WebGLRenderer({ 
            antialias: true,
            gammaOutput: true,
            gammaFactor: 2.2
        });
        renderer.setSize(width, height);

        
        window.onmousemove = (e) => this.mouseMove(e);
        // const camera = new three.Camera(
        //     0,0,(height / 2) / (Math.tan(Math.PI / 3)),
        //     0,0,0,
        //     0,1,0
        // )

        const camera = new three.PerspectiveCamera(
           50, width / height, 1, 10000
        );
        camera.position.set(700, 210, 0);

        this.camera = camera;
        this.cameraControls = new OrbitControls(this.camera, renderer.domElement);
        this.cameraControls.autoRotate = true;
        this.cameraControls.autoRotateSpeed = 4;

        this.camera.position.setY(75);
        this.camera.position.setX(257);
        this.cameraControls.update();

        this.scene = new three.Scene();
        this.renderer = renderer;
        this.scene.background = new three.Color( 0x2196F3 );
        var ambientLight = new three.AmbientLight( 0xcccccc );
        this.scene.add( ambientLight );

        var light = new three.DirectionalLight( 0xffffff );
        light.position.set(1, 0.75, 0.5).normalize();
        this.scene.add( light );

        this.mount.appendChild(this.renderer.domElement);
        
        var loader = new GLTFLoader();
        DRACOLoader.setDecoderPath( '../node_modules/three/examples/js/libs/draco' );
        loader.setDRACOLoader( new DRACOLoader() );

        loader.load('./TicketBooth.gltf', ( gltf ) => {
            gltf.scene.traverse( function ( child ) {
                if ( child.isMesh ) {
                    //child.geometry.center(); // center here
                }
            });
            gltf.scene.scale.set(12,12,12) // scale here
            this.scene.add( gltf.scene );
            
        }, undefined, ( error ) => {
            console.error( error );
        });
        
        this.animate();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div
                        id="WebGL-output"
                        ref={(mount) => { this.mount = mount }}
                    />
                </div>
            </React.Fragment>
        );
    }

    animate() {
        //this.camera.position.set( 0, 20, 100 );
        this.cameraControls.update();
        this.renderer.render(this.scene, this.camera);
        this.frameId =  window.requestAnimationFrame(this.animate);
    }
}