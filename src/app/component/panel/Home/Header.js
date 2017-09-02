import React, { Component } from 'react';
import style from 'css/home-header.scss';

export default class Header extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.top}>
                    <img src="/img/bcc-logo-vertical-fit.png" alt="BCC LOGO" />
                    <div className={style.title}>
                        <h1>Drop</h1>
                        <h1 style={{marginTop: 30}}>Here</h1>
                    </div>
                </div>
                <div className={style.middle}>
                    <p>Sebuah fasilitas untuk mengunggah file yang terintegrasi dengan cloud storage Dropbox dan Google Drive</p>
                </div>
                <div className={style.bottom}>
                    <img src="/img/dropbox-logo-sm.png" alt="BCC LOGO" />
                    <img src="/img/google-drive-logo-sm.png" alt="BCC LOGO" />
                </div>
            </div>
        );
    }
}