import axios from 'axios';
import { 
    UPDATE_SELECTED,
    UPDATE_PAGE,
    REGISTER,
    UPDATE_LOADING
} from './types';

export const updateSelected = (id, selected) => ({ type: UPDATE_SELECTED, id, selected });

export const updateLoading = (id, loading = true) => ({ type: UPDATE_LOADING, id, loading });

export const updatePage = (id, page) => ({ type: UPDATE_PAGE, id, page });

export const register = (username, email, password) => axios.post('http://45.32.115.11:6321/graphql', {
    query: `
    mutation register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            logintoken
        }
    }`, 
    variables: {
        username, email, password
    },
    operationName: 'register'
}).then(res => {
    var logintoken = res.data.data.register.logintoken;
    window.localStorage.setItem('bccdrophere_token', logintoken);
    return { type: REGISTER, logintoken};
}).catch(err => console.log(err, 'error nih!'));

//TEMPAT MENGUBAH STATE