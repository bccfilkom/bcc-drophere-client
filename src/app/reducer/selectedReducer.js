import { UPDATE_SELECTED } from '../action/types';

export default (state = {}, action) => {
    if (action.type == UPDATE_SELECTED) {
        return { ...state, [action.id]: action.selected };
    } else {
        return state;
    }
};