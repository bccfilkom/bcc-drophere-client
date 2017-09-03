import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './component/panel/Home';
import Account from './component/panel/Account';

export default class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                    <Redirect from="/" to="/home" exact />
                    <Redirect from="/login" to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="/register" component={Home} />
                    
                    <Route path="/account" component={Account} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
