import { REGISTER, LOGIN } from '../action/types';

export default (state = null, action) => {
    if (action.type == REGISTER || action.type == LOGIN) {
        if (!action.logintoken) {
            return null;
            window.localStorage.setItem('bccdrophere_token', undefined);   
        }
        return action.logintoken;
    } else {
        return state;
    }
};