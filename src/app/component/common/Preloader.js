import React, { Component } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import style from 'css/loading.scss';

export default ({materialCircle}) => {
    return(
        <div>
            <div className="loader-container">
            <div className="loader"></div>
            <div className="loader2"></div>
            <div className="loader3"></div>
            </div>
        </div>
    );
}