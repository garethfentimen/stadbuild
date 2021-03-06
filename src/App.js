import React, { Component } from 'react';
import './App.css';
//import TicketOffice from './subjects/TicketOffice';
//import CarparkScene from './scenes/Carpark';
import MainCanvas from './components/main';
import PropTypes from 'prop-types';
import ProgrammeStall from './subjects/ProgrammeStall';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div className="carpark">
            <MainCanvas store={this.props.store} offsets={{x: 5, y: 92 }}>
              
            </MainCanvas>
            <ProgrammeStall />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
