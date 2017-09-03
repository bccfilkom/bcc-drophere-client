import React, { Component } from 'react';

import style from 'css/custom-button-primary.scss';

export default ({small, children, onClick}) => {
    return (
        <div className={style}>   
            <button onClick={onClick} className={style.btn + (small ? ' ' + style.sm : '')}>
                {children}
            </button>
        </div>
    );
}