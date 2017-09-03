import { UPDATE_PAGE } from '../action/types';

export default (state = {}, action) => {
    if (action.type == UPDATE_PAGE) {
        return { ...state, [action.id]: action.page };
    } else {
        return state;
    }
};