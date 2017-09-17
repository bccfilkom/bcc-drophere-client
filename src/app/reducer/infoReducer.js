import { UPDATE_INFO } from '../action/types';

export default (state = {active: false, action: 'DISMISS', label: '', type: 'accept', timeout: 2000}, action) => {
    if (action.type == UPDATE_INFO) {
        console.log(action.payload);
        return {...state, ...action.payload};
    } else {
        return state;
    }
};