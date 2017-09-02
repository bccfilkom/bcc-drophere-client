import React, { Component } from 'react';
import style from 'css/home.scss';
import Header from './Header';
import Login from './Login';

export default class Home extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.content}>
                <div className={style.header}>
                    <Header />
                </div>
                <div className={style.auth}>
                    <Login />
                </div>
                </div>

                <div className={style.footer}>
                    <p>Copyright &copy; 2017 Basic Computing Community. All rights reserved</p>
                </div>
            </div>
        );
    }
}