import React, { Component } from 'react';
import { Input, FontIcon } from 'react-toolbox';
import style from 'css/drop-password-input.scss';

export default class PasswordInput extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style['container-icon']}>
                    <FontIcon value="lock" className={style['icon']} />
                    <input
                        type="password"
                        placeholder="Masukkan password untuk membuka tautan"
                        className={style['password-input']}
                    />
                    <FontIcon value="keyboard_return" className={style['icon']} />
                </div>
            </div>
        );
    }
}