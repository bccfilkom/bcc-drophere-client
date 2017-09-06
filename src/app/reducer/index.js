import { combineReducers } from 'redux';
import selectedReducer from './selectedReducer';
import pageReducer from './pageReducer';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    selected: selectedReducer,
    page: pageReducer,
    logintoken: authReducer,
    loading: loadingReducer,
});

//INI ADALAH STATE