import React, { Component } from 'react';
import style from 'css/account.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import {endpointURL} from 'config';

import Profile from './Profile';
import Header from '../../common/Header';
import Content from './Content';
import Footer from '../../common/Footer';

export default class Home extends Component {
    componentDidMount() {
        this.props.updateParticle(false);
        axios.post(endpointURL, {
            query: `
            query {
                me {
                    username
                    email
                }
            }`
        }).then(res => {
            var data = res.data.data.me;

            if (res.data.errors) {
                window.localStorage.removeItem('bccdrophere_token');
                this.props.history.push('/home');
            }
        }).catch((res) => {
            window.localStorage.removeItem('bccdrophere_token');
            this.props.history.push('/home');
        });
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