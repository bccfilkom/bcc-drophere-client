import React, { Component } from 'react';
import style from 'css/profile.scss';

export default class Profile extends Component {
    render() {
        console.log('aa')
        return (
            <div className={style.container}>
                <h1>Profil</h1>
            </div>
        );
    }
}