import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import * as actions from 'action';
import axios from 'axios';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';

import style from 'css/account-profile.scss';

import Loading from '../../common/Loading';

var UPDATE_DATA = 'updateProfileData';
var GET_DATA = 'getProfileData';

class Profile extends Component {
    componentDidMount() {
        return;
        this.props.updateLoading(Profile.GET_DATA);
        axios.post('http://45.32.115.11:6321/graphql', {
            query: `
            mutation dropboxtoken($dropboxtoken: String!) {
                dropboxtoken(dropboxtoken: $dropboxtoken) {
                    msg
                }
            }`, 
            variables: {
                dropboxtoken
            },
            operationName: 'dropboxtoken'
        }).then(res => {
            var dropboxtoken = res.data.data.dropboxtoken;
            if (dropboxtoken) {
                console.log(dropboxtoken.msg)
                return this.props.updateLoading(Storage.DROPBOX_LOADING, false);
            }
            
            console.log(res.data.errors);
        }).catch((res) => {
            console.log(res, 'fck');
        });
    }

    state = {
        username: '',
        password: '',
        email: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.updateLoading(UPDATE_DATA);
    }

    componentWillAppear() {
        
    }

    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <h1>Profil</h1>
                <form onSubmit={this.onSubmit}>
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
                    <Button theme={theme1} onClick={this.onSubmit} icon="save" label="Save" raised primary />
                </div>

                {this.props.loading ? <Loading /> : '' }
                </form>
            </div>
        );
    }
}

function mapStateToProps({ loading }, props) {
    return { loading: loading[UPDATE_DATA] || loading[GET_DATA]};
}

export default connect(mapStateToProps, actions)(Profile);