import React, { Component } from 'react';
import style from 'css/account.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import DropFile from './DropFile';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Content from './Content';

export default class Drop extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <Header />
                </div>

                <div className={style['content-wrapper']}>
                    <Content  {...this.props}  />
                </div>

                <Footer/>
            </div>
        );
    }
}