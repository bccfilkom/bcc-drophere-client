import React, { Component } from 'react';

import style from 'css/separated-input.scss';

export default class SeparatedInput extends Component {
    render() {
        return(
            <div className={style.container}>
                <p>{this.props.caption}</p>
                <div className={style.input}>{this.props.children}</div>
            </div>
        );
    }
}