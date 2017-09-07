import React, { Component } from 'react';
import style from 'css/account.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import DropFile from './DropFile';
import Header from '../../common/Header';
import Content from './Content';
import Footer from '../../common/Footer';

export default class Drop extends Component {
    componentDidMount() {
        this.props.updateParticle(true);
    }
    
    render() {
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <Header />
                </div>

                <div style={{height: '70%'}}>
                    <Content  {...this.props}  />
                </div>

                <Footer />
            </div>
        );
    }
}