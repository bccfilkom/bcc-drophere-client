import { combineReducers } from 'redux';
import selectedReducer from './selectedReducer';
import pageReducer from './pageReducer';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import particleReducer from './particleReducer';

export default combineReducers({
    selected: selectedReducer,
    page: pageReducer,
    logintoken: authReducer,
    loading: loadingReducer,
    particle: particleReducer,
});

//INI ADALAH STATE