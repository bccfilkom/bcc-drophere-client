import React, { Component } from 'react';
import style from 'css/account.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import Profile from './Profile';
import Header from '../../common/Header';
import Content from './Content';
import Footer from '../../common/Footer';

export default class Home extends Component {
    componentDidMount() {
        this.props.updateParticle(false);
    }

    render() {
        return (
            <div className={style.container}>
                <Header /> 

                <div className={style['content-wrapper']}>
                    <Content  {...this.props}  />
                </div>

                <Footer />
            </div>
        );
    }
}