import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ExamplePage from './component/panel/ExamplePage';

export default class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={ExamplePage} />
                </div>
            </BrowserRouter>
        );
    }
}
