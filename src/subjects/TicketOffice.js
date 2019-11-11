import React, { Component } from 'react';
import * as three from 'three';
import Cube from './Cube';

export default class TicketOffice extends Component {
    constructor() { 
        super();
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
      const width = 200;
      const height = 300;

      const renderer = new three.WebGLRenderer({ antialias: true })
      renderer.setClearColor('#000000');
      renderer.setSize(width, height);
      const camera = new three.PerspectiveCamera(
        75, width/height, 1, 1000
      );
      camera.position.z = 5;

      let geometry = new three.BoxGeometry( 1, 1, 1 );
      let material = new three.MeshBasicMaterial( {color: 0x00ff00} );
      const scene = new three.Scene();
      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      let cube = Cube();
      this.scene.add(cube);
      this.mount.appendChild(this.renderer.domElement);

      //this.animate();
    }

    animate() {
        this.props.cubes.map(cube => this.scene.add(cube.geometry));
        this.renderScene();
        this.frameId =  window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        const { cubes, addCube } = this.props;
        return (
            <div>
                <div
                    id="WebGL-output"
                    ref={(mount) => { this.mount = mount }}
                />
                <div>
                    <button className="cube-button" onClick={addCube}>+</button>
                </div>
            </div>
        );
    }
}