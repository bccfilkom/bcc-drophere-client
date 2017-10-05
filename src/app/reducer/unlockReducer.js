import { UNLOCK_PASSWORD } from '../action/types';

export default (state = {}, action) => {
    if (action.type == UNLOCK_PASSWORD) {
        if (!action.error) return {...state, [action.id]: action.password};
        else return {...state, [action.id]: false};
    } else {
        return state;
    }
};