import React, { Component } from 'react';
import style from 'css/footer.scss';

export default ({right}) => {
    return (
        <div className={style.footer}>
            <p>Copyright &copy; 2017 Basic Computing Community. All rights reserved</p>
        </div>
    );
}