import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './component/panel/Home';
import Account from './component/panel/Account';
import Drop from './component/panel/Drop';

export default class AppRouter extends Component {
    componentDidMount() {
        particlesJS.load('particles-js', '/json/particles.json', function() {
            console.log('callback - particles.js config loaded');
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div id="particles-js"></div>
                    <Switch>
                    <Redirect from="/" to="/home" exact />
                    <Redirect from="/login" to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="/register" component={Home} />
                    <Route path="/account" component={Account} />
                    <Route path="/drop" component={Drop} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
