import React, { Component } from 'react';
import style from 'css/drop-file.scss';
import PasswordInput from './PasswordInput'
export default class Password extends Component {
    render() {
        const data = this.props.data;
        let hari, tanggal, bulan, tahun, deadline, date, jam, menit;
        if (data) if (data.deadline) {
            deadline = new Date(data.deadline);
            hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][deadline.getDay()];
            tanggal = deadline.getDate();
            bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][deadline.getMonth()];
            tahun = deadline.getFullYear();
            date = `${hari}, ${tanggal} ${bulan} ${tahun}`;
            jam = deadline.getHours() < 10 ? '0' + deadline.getHours() : deadline.getHours();
            menit = deadline.getMinutes() < 10 ? '0' + deadline.getMinutes() : deadline.getMinutes();
        }
        return (
            <div className={style.container}>
                {data ? <span className={style.title}>{data.title}</span> : ''}
                {data ? <span className={style.subtitle}>{data.description}</span> : ''}
                {data ? (data.deadline ? <span className={style['time-limit']}>Tautan akan ditutup pada : {date} pukul {`${jam}:${menit}`} WIB</span> : '') : '' }
                <div className={style['drop-file-container']}>
                    <PasswordInput {...this.props} />
                </div>
            </div>
        );
    }
}
