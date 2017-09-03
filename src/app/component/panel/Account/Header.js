import React, { Component } from 'react';
import style from 'css/account-header.scss';

export default class Profile extends Component {
    render() {
        return (
            <div className={style.container + ' container'}>
                <img src="/img/bcc-logo-vertical-fit.png" alt="BCC LOGO" />
                <h1>DROP HERE</h1>
            </div>
        );
    }
}