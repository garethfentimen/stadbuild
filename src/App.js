import React, { Component } from 'react';
import './App.css';
import TicketOffice from './subjects/TicketOffice';
import CarparkScene from './scenes/Carpark';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div className="carpark">
            <CarparkScene xOffset={30} yOffset={84}>
              <TicketOffice />
            </CarparkScene>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
