import React, { Component } from 'react';
import style from 'css/account.scss';
import style2 from 'css/drop-file.scss'
import { Route, Switch, Redirect } from 'react-router-dom';

import DropFile from './DropFile';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Content from './Content';

export default class Drop extends Component {
    componentDidMount() {
        this.props.updateParticle(true);
    }
    
    render() {
        return (
            <div className={style.container} style={{height: '100%'}}>
                <div className={style.header}>
                    <Header />
                </div>

                <div style={{height: '68%'}}>
                    <Content  {...this.props}  />
                </div>

                <div className={style2['sponsor-container']} style={{width: '81%', margin: '10px auto 0px auto'}}>
                    <div className={style2['sponsor-wrapper']}>Banner Iklan</div>
                    <div className={style2['sponsor-wrapper']}>Banner Iklan</div>
                    <div className={style2['sponsor-wrapper']}>Banner Iklan</div>
                </div>

                <Footer />
            </div>
        );
    }
}