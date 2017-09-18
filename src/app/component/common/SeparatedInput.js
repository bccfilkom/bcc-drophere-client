import React, { Component } from 'react';

import style from 'css/separated-input.scss';

export default class SeparatedInput extends Component {
    render() {
        return(
            <div className={style.container} style={{alignItems: this.props.password ? 'flex-start' : 'center'}}>
                <p style={{marginTop: this.props.password ? 14 : 5}}>{this.props.caption}</p>
                <div className={style.input}>{this.props.children}</div>
            </div>
        );
    }
}