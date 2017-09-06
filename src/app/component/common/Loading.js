import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import style from 'css/loading.scss';

export default class Loading extends Component { 
    render() {
        return (
            <div className={style.container + ' ' + style.anim}>   
            <div className={style.wrapper}>
            <ProgressBar type='circular' multicolor />
            </div>
            </div>
        );
    }
}