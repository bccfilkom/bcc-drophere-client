import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import * as actions from 'action';
import axios from 'axios';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';
import Loading from '../../common/Loading';

import style from 'css/account-profile.scss';
import { endpointURL } from 'config';

var GET_DATA = 'getProfileData';
var UPDATE_PROFILE = 'udpateProfileData'
var UPDATE_PASSWORD = 'updatePassword';

class Profile extends Component {
    componentWillMount() {
        this.props.updateLoading(GET_DATA, false);
        this.props.updateLoading(UPDATE_PASSWORD, false);
        this.props.updateLoading(UPDATE_PROFILE, false);
    }

    componentDidMount() {
        this.props.updateLoading(GET_DATA);
        axios.post(endpointURL, {
            query: `
            query {
                me {
                    username
                    emai
                }
            }`
        }).then(res => {
            var data = res.data.data.me;
            console.log('coba', res);
            if (data) {
                var { username, email } = data;
                this.setState({username, email});
                return this.props.updateLoading(GET_DATA, false);
            }
        }).catch((res) => {
            console.log('coba', typeof res)
            return this.props.updateLoading(GET_DATA, false);
        });
    }

    state = {
        username: '',
        password: '',
        email: '',
        retype: '',
        current: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onSave = e => {
        e.preventDefault();
        this.props.updateLoading(UPDATE_PROFILE);
    }
    
    onUpdatePassword = e => {
        e.preventDefault();
        this.props.updateLoading(UPDATE_PASSWORD);

        if(this.state.password !== this.state.retype) {
            console.log('Password does not match');
            this.props.updateLoading(UPDATE_PASSWORD, false);
            return;
        }
    }

    onProfileSubmit = e => {
        console.log('aa')
    }

    onPasswordSubmit = e => {

    }

    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <form onSubmit={this.onProfileSubmit} >
                <h1>Profil</h1>
                <Input
                    type="text"
                    label="Username"
                    value={this.state.username}
                    onChange={this.handleChange.bind(this, 'username')}
                    disabled
                />

                <Input
                    type="text"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange.bind(this, 'email')}
                />
                <div className={style['button-wrapper']}>
                    <Button type="submit" theme={theme1} onClick={this.onSave} icon="save" label="Save" raised primary />
                </div>
                {this.props.updateProfileLoading ? <Loading /> : '' }
                </form>

                <form onSubmit={this.onPasswordSubmit}>
                <h1 style={{marginTop: 40}}>Change Password</h1>
                <Input
                    type="password"
                    label="Current Password"
                    name="password"
                    value={this.state.current}
                    onChange={this.handleChange.bind(this, 'current')}
                />
                <Input
                    type="password"
                    label="New Password"
                    name="current_password"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this, 'password')}
                />
                <Input
                    type="password"
                    label="Retype Password"
                    name="retype_password"
                    value={this.state.retype}
                    onChange={this.handleChange.bind(this, 'retype')}
                />

                <div className={style['button-wrapper']} style={{marginBottom: 40}}>
                    <Button type="submit" theme={theme1} onClick={this.onUpdatePassword} icon="update" label="Update" raised primary />
                </div>

                {this.props.updatePasswordLoading ? <Loading /> : '' }
                </form>
                {this.props.getDataLoading ? <Loading cube /> : '' }
            </div>
        );
    }
}

function mapStateToProps({ loading }, props) {
    return { updateProfileLoading: loading[UPDATE_PROFILE], updatePasswordLoading: loading[UPDATE_PASSWORD], getDataLoading: loading[GET_DATA]};
}

export default connect(mapStateToProps, actions)(Profile);