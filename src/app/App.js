import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducer from './reducer';
import AppRouter from './AppRouter';


class App extends Component {
    componentDidMount() {
        $('#cube-loading-container').css('display', 'none');
    }

    render() {
        return (
            <Provider store={ applyMiddleware(ReduxPromise)(createStore)(reducer) }>
                <AppRouter />
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
