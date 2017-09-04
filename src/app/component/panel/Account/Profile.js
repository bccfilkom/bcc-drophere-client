import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button, IconButton } from 'react-toolbox/lib/button';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';

import style from 'css/account-profile.scss';

export default class Profile extends Component {
    state = {
        username: '',
        password: '',
        email: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    render() {
        return (
            <div className={style.container}>
                <h1>Profil</h1>
                <Input
                    type="text"
                    label="Username"
                    value={this.state.username}
                    onChange={this.handleChange.bind(this, 'username')}
                />

                <Input
                    type="text"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange.bind(this, 'email')}
                />
                
                <Input
                    type="text"
                    label="Password"
                    value={this.state.passowrd}
                    onChange={this.handleChange.bind(this, 'password')}
                />

                <div className={style['button-wrapper']}>
                    <Button theme={theme1} onClick={this.onClick} icon="save" label="Save" raised primary />
                </div>
            </div>
        );
    }
}