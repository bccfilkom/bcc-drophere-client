import { UNLOCK_PASSWORD } from '../action/types';

export default (state = {}, action) => {
    if (action.type == UNLOCK_PASSWORD) {
        if (!action.error) return {...state, [action.slug]: true};
        else return {...state, [action.slug]: false};
    } else {
        return state;
    }
};