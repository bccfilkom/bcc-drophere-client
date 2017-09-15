import React, { Component } from 'react';

import style from 'css/custom-button-primary.scss';

export default (props) => {
    var {small, children, onClick, red, type} = props;

    return (
        <div className={style}>   
            <button onClick={onClick} {...props} className={style.btn + ' ' + (small ? style.sm : '') + (red ? style.red : '')}>
                {children}
            </button>
        </div>
    );
}