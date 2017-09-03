import { combineReducers } from 'redux';
import selectedReducer from './selectedReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    selected: selectedReducer,
    page: pageReducer,
});

//INI ADALAH STATE