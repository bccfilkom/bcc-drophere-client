import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducer from './reducer';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

import AppRouter from './AppRouter';

const networkInterface = createNetworkInterface({
    uri: '45.32.115.11:6321/graphq',
});

const client = new ApolloClient({
    networkInterface
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }
        
        const token = localStorage.getItem('token');
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
    }
}]);

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client} store={ applyMiddleware(ReduxPromise)(createStore)(reducer) }>
                <AppRouter />
            </ApolloProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
