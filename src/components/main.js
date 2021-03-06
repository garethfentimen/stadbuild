import React, { Component } from 'react';
import PropTypes from 'prop-types';
import threeEntryPoint from '../three/threeEntryPoint';
import './main.scss';
import { connect } from 'react-redux';
import { toggleMode } from '../actions/stadiumBuilder';

class Main extends Component {
    componentDidMount() {
        console.log('mounted', this.props.offsets);
        threeEntryPoint(this.threeRootElement, this.props.store, this.props.offsets);
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

Main.propTypes = {
    offsets: PropTypes.object.isRequired,
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
)(Main);