import axios from 'axios';
import { 
    UPDATE_SELECTED,
    UPDATE_PAGE,
} from './types';

export const updateSelected = (id, selected) => ({ type: UPDATE_SELECTED, id, selected });

export const updatePage = (id, page) => ({ type: UPDATE_PAGE, id, page });

//TEMPAT MENGUBAH STATE