import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducer from './reducer';
import AppRouter from './AppRouter';
import { ThemeProvider } from 'react-css-themr';
import theme from 'css/theme.scss';

const contextTheme = {
    RTInput: theme
};

class App extends Component {
    componentDidMount() {
        $('#cube-loading-container').css('display', 'none');
    }

    render() {
        return (
            <Provider store={ applyMiddleware(ReduxPromise)(createStore)(reducer) }>
                <ThemeProvider theme={contextTheme}>
                <AppRouter /> 
                </ThemeProvider>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
