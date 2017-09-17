import axios from 'axios';
import { 
    UPDATE_SELECTED,
    UPDATE_PAGE,
    REGISTER,
    UPDATE_LOADING,
    LOGIN,
    UPDATE_PARTICLE,
    GET_LINKS,
    UPDATE_INFO,
    UNLOCK_PASSWORD
} from './types';
import { endpointURL } from 'config';

export const updateSelected = (id, selected) => ({ type: UPDATE_SELECTED, id, selected });

export const updateLoading = (id, loading = true) => ({ type: UPDATE_LOADING, id, loading });

export const updatePage = (id, page) => ({ type: UPDATE_PAGE, id, page });

export const register = (username, email, password) => axios.post(endpointURL, {
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
        axios.defaults.headers.common['Authorization'] = logintoken;
        
        return { type: LOGIN, logintoken};
    }
    
    return {type: LOGIN, errors: res.data.errors, error: res.data.errors[0].message};
}).catch((res) => {
    console.log(res, 'fck');
});

export const login = (username, password) => axios.post(endpointURL, {
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
        axios.defaults.headers.common['Authorization'] = logintoken;
        
        return { type: LOGIN, logintoken};
    }
    
    return {type: LOGIN, errors: res.data.errors, error: res.data.errors[0].message};
}).catch((res) => {
    console.log(res, 'fck');
});

export const updateParticle = payload => ({type: UPDATE_PARTICLE, payload});

export const getLinks = () => axios.post(endpointURL, {
    query: `
    query {
        links {
            id
            title
            description
            isProtected
            deadline
            slug
        }
    }`
}).then(res => {
    // check for error first
    if (res.data.errors){
        const error = res.data.errors[0].message;
        return { type: GET_LINKS, errors: res.data.errors, error, links: null };
    } else {
        const links = res.data.data.links || null;
        return { type: GET_LINKS, links };
    }
    
}).catch((res) => {
    console.log(res, 'fck');
});

export const updateInfo = payload => ({ type: UPDATE_INFO, payload });

export const unlockPassword = (id, password) => axios.post(endpointURL, {
    query: `
    mutation {
        checklinkpassword (linkId: ${id}, password: "${password}") {
            msg
        }
    }`
}).then(res => {
    // check for error first
    if (res.data.errors) {
        const error = res.data.errors[0].message;
        return { type: UNLOCK_PASSWORD, errors: res.data.errors, error, links: null, id };
    } else {
        return { type: UNLOCK_PASSWORD, id };
    }
}).catch((res) => {
    return { type: UNLOCK_PASSWORD, errors: res, error: '', links: null };
});

//TEMPAT MENGUBAH STATE