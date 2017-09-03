import React, { Component } from 'react';
import style from 'css/account.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import Profile from './Profile';
import Header from './Header';
import Content from './Content';

export default class Home extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <Header />
                </div>

                <div className={style['content-wrapper']}>
                    <Content  {...this.props}  />
                </div>

                <div className={style.footer}>
                    <p>Copyright &copy; 2017 Basic Computing Community. All rights reserved</p>
                </div>
            </div>
        );
    }
}