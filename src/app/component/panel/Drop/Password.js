import React, { Component } from 'react';
import style from 'css/drop-file.scss';
import PasswordInput from './PasswordInput'
export default class Password extends Component {
    render() {
        console.log('tahe');
        return (
            <div className={style.container}>
                <span className={style.title}>Kirim File ke Laporan Praktikum Bab 4</span>
                <span className={style.subtitle}>Tarik atau pilih file untuk diunggah</span>
                <span className={style['time-limit']}>Tautan akan ditutup pada : Minggu, 27 Agustus 2017 pukul 23:59 WIB</span>
                <div className={style['drop-file-container']}>
                    
                    <PasswordInput />
                </div>
            </div>
        );
    }
}
