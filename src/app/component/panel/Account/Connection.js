import React, { Component } from 'react';

import style from 'css/profile.scss';
import CustomInput from '../../common/CustomInput';

export default class Connection extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    render() {
        return (
            <div className={style.container}>
                <h1>Profil</h1>
                <CustomInput
                    type="text"
                    label="Username"
                    value={this.state.username}
                    onChange={this.handleChange.bind(this, 'username')}
                />

                <CustomInput
                    type="text"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange.bind(this, 'email')}
                />
                
                <CustomInput
                    type="text"
                    label="Password"
                    value={this.state.passowrd}
                    onChange={this.handleChange.bind(this, 'password')}
                />
            </div>
        );
    }
}