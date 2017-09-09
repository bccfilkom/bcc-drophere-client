import { UPDATE_LOADING } from '../action/types';

export default (state = {}, action) => {
    if (action.type == UPDATE_LOADING) {
        console.log(action.id, action.loading, state);
        return { ...state, [action.id]: action.loading };
    } else {
        return state;
    }
};