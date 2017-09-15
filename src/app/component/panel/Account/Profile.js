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


var UPDATE_DATA = 'updateProfileData';
var GET_DATA = 'getProfileData';

class Profile extends Component {
    componentWillMount() {
        this.props.updateLoading(GET_DATA, false);
        this.props.updateLoading(UPDATE_DATA, false);
    }

    componentDidMount() {
        this.props.updateLoading(GET_DATA);
        axios.post('http://45.32.115.11:6321/graphql', {
            query: `
            query {
                me {
                    username
                    email
                }
            }`
        }).then(res => {
            var data = res.data.data.me;
            if (data) {
                var { username, email } = data;
                this.setState({username, email});
                return this.props.updateLoading(GET_DATA, false);
            }
        }).catch((res) => {
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
        this.props.updateLoading(UPDATE_DATA);
    }
    
    onUpdatePassword = e => {
        e.preventDefault();
        this.props.updateLoading(UPDATE_DATA);

        if(this.state.password !== this.state.retype) {
            console.log('Password does not match');
            this.props.updateLoading(UPDATE_DATA, false);
            return;
        }
    }

    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <form onSubmit={this.onSubmit}>
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
                    <Button theme={theme1} onClick={this.onSave} icon="save" label="Save" raised primary />
                </div>

                <h1 style={{marginTop: 40}}>Change Password</h1>
                <Input
                    type="password"
                    label="Current Password"
                    value={this.state.current}
                    onChange={this.handleChange.bind(this, 'current')}
                />
                <Input
                    type="password"
                    label="New Password"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this, 'password')}
                />
                <Input
                    type="password"
                    label="Retype Password"
                    value={this.state.retype}
                    onChange={this.handleChange.bind(this, 'retype')}
                />

                <div className={style['button-wrapper']} style={{marginBottom: 40}}>
                    <Button theme={theme1} onClick={this.onUpdatePassword} icon="update" label="Update" raised primary />
                </div>

                {this.props.updateDataLoading ? <Loading /> : '' }
                {this.props.getDataLoading ? <Loading cube /> : '' }
                </form>
            </div>
        );
    }
}

function mapStateToProps({ loading }, props) {
    return { updateDataLoading: loading[UPDATE_DATA], getDataLoading: loading[GET_DATA]};
}

export default connect(mapStateToProps, actions)(Profile);