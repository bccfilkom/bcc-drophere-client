import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import * as actions from 'action';
import axios from 'axios';
import Snackbar from 'react-toolbox/lib/snackbar';

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
                    email
                }
            }`
        }).then(res => {
            var data = res.data.data.me;

            if (!res.data.errors) {
                var { username, email } = data;
                this.setState({username, email});
            }

            this.props.updateLoading(GET_DATA, false);
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            this.props.updateLoading(GET_DATA, false);
        });
    }

    state = {
        username: '',
        password: '',
        email: '',
        retype: '',
        current: '',
        passwordErr: null,
        retypeErr: null,
        info: false,
        infoLabel: '',
        infoType: 'accept',
    }

    handleChange = (name, value) => {
        var pass = name == 'password' ? value : this.state.password;
        var retype = name == 'retype' ? value : this.state.retype;
        if (name == 'retype' || (name == 'password' && retype != '')) {
            if (retype != pass) {
                return this.setState({[name]: value, retypeErr: 'Password tidak cocok'});
            }
            return this.setState({[name]: value, retypeErr: null});
        }

        this.setState({[name]: value});
    };

    onSave = e => {
        e.preventDefault();
        this.props.updateLoading(UPDATE_PROFILE);
    }
    
    onUpdatePassword = e => {
        e.preventDefault();
        this.props.updateLoading(UPDATE_PASSWORD);
        let {password, retype, current} = this.state;
        let loc1 = {};
        var err = false;

        if (password === '') {
            if (password.length < 6) {
                loc1.passwordErr = "Panjang minimal password adalah 6";
                err = true;
            } else loc1.passwordErr = null;
        } else if (password != retype) {
            loc1.retypeErr = "Password tidak cocok";
            err = true
        } else loc1.retypeErr = null;
        console.log(err);

        if(err) {
            this.setState(loc1);
            this.props.updateLoading(UPDATE_PASSWORD, false);
            return;
        }

        axios.post(endpointURL, {
            query: `
            mutation {
                updatePassword (oldPassword:"${current}", newPassword:"${password}") {
                    msg
                }
            }`
        }).then(res => {
            var data = res.data.data.updatePassword;

            if (res.data.errors) {
                this.setState({infoLabel: res.data.errors[0].message, info: true, infoType: 'cancel'});
            } else {
                this.setState({infoLabel: data.msg, info: true, infoType: 'accept'});
            }

            this.props.updateLoading(UPDATE_PASSWORD, false);
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            return this.props.updateLoading(UPDATE_PASSWORD, false);
        });
    }
    
    handleSnackbarClick = (event, instance) => {
        this.setState({ info: false });
    };
    
    handleSnackbarTimeout = (event, instance) => {
        this.setState({ info: false });
    };

    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <form onSubmit={this.onSave} >
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
                    value={this.state.email} required
                    onChange={this.handleChange.bind(this, 'email')}
                />
                <div className={style['button-wrapper']}>
                    <Button type="submit" theme={theme1} icon="save" label="Save" raised primary />
                </div>
                {this.props.updateProfileLoading ? <Loading /> : '' }
                </form>

                <form onSubmit={this.onUpdatePassword}>
                <h1 style={{marginTop: 40}}>Change Password</h1>
                <Input
                    type="password"
                    label="Current Password"
                    name="password"
                    value={this.state.current} required
                    onChange={this.handleChange.bind(this, 'current')}
                />
                <Input
                    type="password"
                    label="New Password"
                    name="current_password"
                    value={this.state.password} required
                    onChange={this.handleChange.bind(this, 'password')}
                    error={this.state.passwordErr}
                />
                <Input
                    type="password"
                    label="Retype Password"
                    name="retype_password"
                    value={this.state.retype} required
                    onChange={this.handleChange.bind(this, 'retype')}
                    error={this.state.retypeErr}
                />

                <div className={style['button-wrapper']} style={{marginBottom: 40}}>
                    <Button type="submit" theme={theme1} icon="update" label="Update" raised primary />
                </div>

                {this.props.updatePasswordLoading ? <Loading /> : '' }
                </form>
                {this.props.getDataLoading ? <Loading cube /> : '' }
                <Snackbar
                    action='Dismiss'
                    active={this.state.info}
                    label={this.state.infoLabel}
                    timeout={2000}
                    onClick={this.handleSnackbarClick}
                    onTimeout={this.handleSnackbarTimeout}
                    type={this.state.infoType}
                />
            </div>
        );
    }
}

function mapStateToProps({ loading }, props) {
    return { updateProfileLoading: loading[UPDATE_PROFILE], updatePasswordLoading: loading[UPDATE_PASSWORD], getDataLoading: loading[GET_DATA]};
}

export default connect(mapStateToProps, actions)(Profile);