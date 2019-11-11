import * as three from 'three';
import React, { Component } from 'react';
import GLTFLoader from 'three-gltf-loader';
import { DRACOLoader } from 'three-full'

export default class ProgrammeStall extends Component {
    constructor() { 
        super();
        this.animate = this.animate.bind(this);
        this.camera = null;
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
        const camera = new three.PerspectiveCamera(
           110, width / height, 1, 70 
        );
        
        camera.position.set(30, 16, 20);
        camera.rotateY(2.6);
        //camera.rotateX(-0.20);
        this.camera = camera;

        this.scene = new three.Scene();
        //this.camera = camera;
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

        loader.load('./TicketBooth2.gltf', ( gltf ) => {
            gltf.scene.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.geometry.center(); // center here
                }
            });
            gltf.scene.scale.set(16,16,16) // scale here
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
                {this.camera && <div>
                    x: {this.camera.position.x}
                    y: {this.camera.position.y}
                    z: {this.camera.position.z}
                </div>}
                <div>
                    <button onClick={() => this.addZ()} >add Zs</button>
                    <button onClick={() => this.reduceZ()} >reduce Zs</button>
                    <button onClick={() => this.addYRotate()}>rotate Y</button>
                    <button onClick={() => this.addXRotate()}>rotate X</button>
                    <button onClick={() => this.addY(1)} >add y</button>
                    <button onClick={() => this.addY(-1)} >reduce y</button>
                    <button onClick={() => this.addX()} >add x</button>
                    <button onClick={() => this.reduceX()} >reduce x</button>
                </div>
            </React.Fragment>
        );
    }

    rXposition = -0.02;
    addXRotate() {
        this.rXposition = this.rXposition - 0.01;
        this.camera.rotateX(-0.01);
        console.log('camera rotate x position',this.rXposition);
    }
    rYposition = 0;
    addYRotate() {
        this.rYposition = this.rYposition + 0.1;
        this.camera.rotateY(0.1);
        console.log('camera rotate y position', this.rYposition);
    }
    yposition = 1.8;
    addY(add) {
        this.yposition = this.yposition + add;
        this.camera.position.y = this.yposition;
        console.log('camera y position', this.yposition);
    }

    xposition = 3;
    addX() {
        this.xposition = this.xposition + 1;
        this.camera.position.x = this.xposition;
        console.log('camera x position', this.xposition);
    }
    reduceX() {
        this.xposition = this.xposition - 10;
        this.camera.position.x = this.xposition;
        console.log('camera x position', this.xposition);
    }
    zposition = 25;
    addZ() {
        this.zposition = this.zposition + 1;
        this.camera.position.z = this.zposition;
        console.log('camera z position', this.zposition);
    }
    reduceZ() {
        this.zposition = this.zposition - 1;
        this.camera.position.z = this.zposition;
        console.log('camera z position', this.zposition);
    }

    animate() {
        this.renderer.render(this.scene, this.camera);
        this.frameId =  window.requestAnimationFrame(this.animate);
    }
}