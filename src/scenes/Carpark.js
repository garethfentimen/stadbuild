import React, { Component } from 'react';
import PropTypes from 'prop-types';
import threeEntryPoint from './threeEntryPoint';
import './carpark.scss';
import { connect } from 'react-redux';
import { toggleMode } from '../actions/stadiumBuilder';

class Carpark extends Component {
    constructor(props) { 
        super(); 
        this.yOffset = props.yOffset;
        this.xOffset = props.xOffset;
    }

    componentDidMount() {
        console.log('mounted', this.yOffset);
        threeEntryPoint(this.threeRootElement, this.xOffset, this.yOffset, this.props.store);
    }
    
    render() {
        return (
            <div className="info">
                <div ref={element => this.threeRootElement = element} />
                <div>
                    <button onClick={this.props.toggleMode}>
                        {!this.props.deleteMode ? 'destroy building' : 'create building'}
                    </button>
                </div>
            </div>
        )
    }
}

Carpark.propTypes = {
    yOffset: PropTypes.number.isRequired,
    xOffset: PropTypes.number.isRequired,
    deleteMode: PropTypes.bool.isRequired,
    store: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    console.log('mapping', state);
    return {
        deleteMode: state.stadiumBuilder.deleteMode
    };
};

const mapDispatchToProps = dispatch => ({
    toggleMode: () => dispatch(toggleMode())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Carpark);