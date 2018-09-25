import react from 'react';
import React, { Component } from 'react';
import TicketOffice from './TicketOffice';
import carparkContainer from './CarparkContainer';

export default class Carpark extends Component {
    constructor() { 
        super(); 
    }

    componentDidMount() {
        carparkContainer(this.threeRootElement);
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