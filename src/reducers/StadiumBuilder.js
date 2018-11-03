import { actions } from '../actions/stadiumBuilder';

const stadiumBuilderReducer = (state = [
    {
        deleteMode: false
    }
], action) => {
    switch (action.type) {
      case actions.TOGGLE_MODE:
        const updatedModeState = [
          ...state,
          { deleteMode: !state.deleteMode }
        ];
        console.log(updatedModeState);
        return updatedModeState.pop();
      default:
        console.log(state);
        return state.pop();
    }
};

export default stadiumBuilderReducer;