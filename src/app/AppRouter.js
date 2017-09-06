import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './component/panel/Home';
import Account from './component/panel/Account';
import Drop from './component/panel/Drop';

export default class AppRouter extends Component {
    componentWillMount() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('bccdrophere_token');

    }

    componentDidMount() {
        if (window.location.pathname.search('account') == -1)
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
                    <Route path="/home" render={props => {
                        if (!localStorage.getItem('bccdrophere_token'))
                        return <Home {...props} />;
                        return <Redirect to="/account" />
                    }} />
                    <Route path="/register" render={props => {
                        if (!localStorage.getItem('bccdrophere_token'))
                        return <Home {...props} />;
                        return <Redirect to="/account" />
                    }} />
                    <Route path="/account" render={props => {
                        if (localStorage.getItem('bccdrophere_token'))
                        return <Account {...props} />;
                        return <Redirect to="/home" />
                    }} />
                    <Route path="/:id" component={Drop} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
