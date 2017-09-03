import React, { Component } from 'react';
import style from 'css/drop-file.scss';

export default class DropFile extends Component {
    render() {
        return (
            <div className={style.container}>
                <span className={style.title}>Kirim File ke Laporan Praktikum Bab 4</span>
                <span className={style.subtitle}>Tarik atau pilih file untuk diunggah</span>
                <span className={style['time-limit']}>Tautan akan ditutup pada : Minggu, 27 Agustus 2017 pukul 23:59 WIB</span>
                <div className={style['drop-file-container']}>
                    <span className={style['drop-title']}>TARIK FILE KE SINI</span>
                    <span className={style['drop-separator']}>- ATAU -</span>
                    <div className={style['upload-file-container']}>
                        <label for="uploadFile">
                            <span className={style['upload-file-button']}>PILIH FILE UNTUK DIUNGGAH</span>
                            <input type="file" name="uploadFile" id="uploadFile" className={style['upload-file']} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}