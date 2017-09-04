import React, { Component } from 'react';
import style from 'css/home.scss';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Footer from '../../common/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class Home extends Component {
    componentDidMount() {
        particlesJS.load('particles-js', '/json/particles.json', function() {
            console.log('callback - particles.js config loaded');
        });
    }

    render() {
        return (
            <div className={style.container}>
                <div id="particles-js"></div>
                <div className={style.content}>
                <div className={style.header}>
                    <Header />
                </div>
                <div className={style.auth}>
                    <Switch>
                    <Route path="/home" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    </Switch>
                </div>
                </div>
                <Footer />
            </div>
        );
    }
}