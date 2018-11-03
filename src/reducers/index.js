import stadiumBuilderReducer from './StadiumBuilder';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	stadiumBuilder: stadiumBuilderReducer
});

export default rootReducer;