import axios from 'axios';
import types from './types';

export const updateSelected = (id, selected) => ({ type: types.UPDATE_SELECTED, id, selected });

export const updatePage = (id, page) => ({ type: types.UPDATE_PAGE, id, page });

//TEMPAT MENGUBAH STATE