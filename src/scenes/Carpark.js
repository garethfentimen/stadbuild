import React, { Component } from 'react';
import threeEntryPoint from './threeEntryPoint';
import './carpark.scss';

export default class CarparkScene extends Component {
    constructor(props) { 
        super(); 
        this.yOffset = props.yOffset;
        this.xOffset = props.xOffset;
    }

    componentDidMount() {
        console.log('mounted', this.yOffset);
        threeEntryPoint(this.threeRootElement, this.xOffset, this.yOffset);
    }

    render() {
        return (
            <div className="info">
                <div ref={element => this.threeRootElement = element} />
            </div>
        )
    }
}