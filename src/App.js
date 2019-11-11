import React, { Component } from 'react';
import './App.css';
import TicketOffice from './subjects/TicketOffice';
import CarparkScene from './scenes/Carpark';
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
            {/* <CarparkScene store={this.props.store} xOffset={30} yOffset={84}>
              
            </CarparkScene> */}
            {/* <TicketOffice cubes={[{ id: 1 }, { id: 2 }]} /> */}

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
