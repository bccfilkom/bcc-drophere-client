import axios from 'axios';
import { 
    UPDATE_SELECTED,
    UPDATE_PAGE,
    REGISTER,
    UPDATE_LOADING,
    LOGIN,
    UPDATE_PARTICLE,
    GET_LINKS
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
    var register = res.data.data.register;
    if (register) {
        var logintoken = register.logintoken;
        window.localStorage.setItem('bccdrophere_token', logintoken);
        
        return { type: LOGIN, logintoken};
    }
    
    return {type: LOGIN, errors: res.data.errors, error: res.data.errors[0].message};
}).catch((res) => {
    console.log(res, 'fck');
});

export const login = (username, password) => axios.post('http://45.32.115.11:6321/graphql', {
    query: `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            logintoken
        }
    }`, 
    variables: {
        username, password
    },
    operationName: 'login'
}).then(res => {
    var login = res.data.data.login;
    if (login) {
        var logintoken = login.logintoken;
        window.localStorage.setItem('bccdrophere_token', logintoken);
        
        return { type: LOGIN, logintoken};
    }
    
    return {type: LOGIN, errors: res.data.errors, error: res.data.errors[0].message};
}).catch((res) => {
    console.log(res, 'fck');
});

export const updateParticle = payload => ({type: UPDATE_PARTICLE, payload});

export const getLinks = () => axios.post('http://45.32.115.11:6321/graphql', {
    query: `
    query {
        links {
            id
            title
            url
            deskripsi
            isProtected
            deadline
            password
        }
    }`
}).then(res => {
    var links = res.data.data.links;
    if (links) {
        return { type: GET_LINKS, links};
    }
    
    return {type: GET_LINKS, errors: res.data.errors, error: res.data.errors[0].message};
}).catch((res) => {
    console.log(res, 'fck');
});

//TEMPAT MENGUBAH STATE