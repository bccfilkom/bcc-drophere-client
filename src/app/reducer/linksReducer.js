import { GET_LINKS } from '../action/types';

export default (state = [], action) => {
    if (action.type == GET_LINKS) {
        return action.links;
    } else {
        return state;
    }
};