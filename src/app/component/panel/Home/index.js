import React, { Component } from 'react';
import style from 'css/home.scss';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div className={style.container}>
            <div className=
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

                <div className={style.footer}>
                    <p>Copyright &copy; 2017 Basic Computing Community. All rights reserved</p>
                </div>
            </div>
        );
    }
}