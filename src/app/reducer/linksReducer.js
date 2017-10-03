import { GET_LINKS, UPDATE_LINK } from '../action/types';

export default (state = [], action) => {
    if (action.type == GET_LINKS) {
        return action.links;
    } else if (action.type == UPDATE_LINK) {
        let links = [...state];
        links[action.index] = action.data;
        return links;
    } else {
        return state;
    }
};