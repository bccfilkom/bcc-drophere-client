import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from 'css/account-header.scss';

export default class Profile extends Component {
    render() {
        return (
            <div className={style.container + ' wrapper'}>
                <Link to="/">
                <img src="/img/bcc-logo-vertical-fit.png" alt="BCC LOGO" />
                <h1>DROP HERE</h1>
                </Link>
            </div>
        );
    }
}