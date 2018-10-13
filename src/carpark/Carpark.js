import react from 'react';
import React, { Component } from 'react';
import TicketOffice from './TicketOffice';
import threeEntryPoint from '../three/threeEntryPoint';

export default class Carpark extends Component {
    constructor() { 
        super(); 
    }

    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }

    render() {
        return (
            <div>
                <span>hello?</span>
                <div ref={element => this.threeRootElement = element} />
            </div>
        )
    }
}