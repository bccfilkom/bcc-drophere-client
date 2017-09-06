import { REGISTER } from '../action/types';

export default (state = null, action) => {
    if (action.type == REGISTER) {
        return action.logintoken;
    } else {
        return state;
    }
};