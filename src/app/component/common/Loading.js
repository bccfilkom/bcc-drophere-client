import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import style from 'css/loading.scss';

export default ({cube, wrapped = true}) => {
    return(
        <div>
            <div className={!wrapped ? '' : style.container + ' ' + style.anim}>   
            <div className={!wrapped ? '' : style.wrapper}>
            { !cube ? 
            <ProgressBar type='circular' multicolor /> :
            <div id="cube-loading" className="sk-cube-grid">
                <div className="sk-cube sk-cube1"></div>
                <div className="sk-cube sk-cube2"></div>
                <div className="sk-cube sk-cube3"></div>
                <div className="sk-cube sk-cube4"></div>
                <div className="sk-cube sk-cube5"></div>
                <div className="sk-cube sk-cube6"></div>
                <div className="sk-cube sk-cube7"></div>
                <div className="sk-cube sk-cube8"></div>
                <div className="sk-cube sk-cube9"></div>
            </div>
            }
            </div>
            </div>
        </div>
    );
}