import { UPDATE_PARTICLE } from '../action/types';

export default (state = false, action) => {
    if (action.type == UPDATE_PARTICLE) {
        return action.payload;
    } else {
        return state;
    }
};