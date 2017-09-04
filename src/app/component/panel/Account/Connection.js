import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';

import style from 'css/connection.scss';

export default class Connection extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onClick = () => {
        window.open(
            'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=ojyhbt7ixgei5j9&redirect_uri=http://localhost:3000/dropauth',
            'Authorization',
            `height=400,width=800`
        );
    }

    renderContent() {
        if (true) {
            return(
                <div className={style['button-wrapper']}>
                    <Button theme={theme1} onClick={this.onClick} icon="link" label="Authorize" raised primary />
                </div>
            );
        }

        return <Input
            type="text"
            label="Username"
            value={this.state.username}
            onChange={this.handleChange.bind(this, 'username')}
        />;
    }

    render() {
        return (
            <div className={style.container}>
                <h1>Koneksi Dropbox</h1>
                {this.renderContent()}
            </div>
        );
    }
}