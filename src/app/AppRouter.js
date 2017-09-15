import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './component/panel/Home';
import Account from './component/panel/Account';
import Drop from './component/panel/Drop';

export default class AppRouter extends Component {
    state = { particle: false }

    componentWillMount() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('bccdrophere_token');
    }

    updateParticle = arg => {
        if (window.location.pathname.search('account') == -1 && arg != this.state.particle)
        particlesJS.load('particles-js', '/json/particles.json', function() {
            console.log('callback - particles.js config loaded');
        });

        this.setState({particle: arg});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {this.state.particle ? <div id="particles-js" /> : ''}
                    <Switch>
                    <Redirect from="/" to="/home" exact />
                    <Redirect from="/login" to="/home" />
                    <Route path="/home" render={props => {
                        //if (!localStorage.getItem('bccdrophere_token'))
                        return <Home {...props} updateParticle={this.updateParticle} />;
                        //return <Redirect to="/account" />
                    }} />
                    <Route path="/register" render={props => {
                        //if (!localStorage.getItem('bccdrophere_token'))
                        return <Home {...props} updateParticle={this.updateParticle} />;
                        //return <Redirect to="/account" /> 
                    }} />
                    <Route path="/account" render={props => {
                        if (localStorage.getItem('bccdrophere_token'))
                        return <Account {...props} updateParticle={this.updateParticle} />;
                        return <Redirect to="/home" />
                    }} />
                    <Route path="/:id" render={props => <Drop updateParticle={this.updateParticle} {...props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
