import React, { Component } from 'react';
import style from 'css/example.scss';

export default class ExamplePage extends Component {
    render() {
        return (
            <div className={style.container}>
                <h1>Hello React!</h1>
            </div>
        );
    }
}