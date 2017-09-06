import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import * as actions from 'action';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';

import style from 'css/account-profile.scss';

import Loading from '../../common/Loading';

class Profile extends Component {
    state = {
        username: '',
        password: '',
        email: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    static id = "profileLoading";

    onSubmit = e => {
        console.log('aoaooas')
        e.preventDefault();
        
        this.props.updateLoading(Profile.id);
    }

    render() {
        return (
            <div className={style.container}>
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
    return { loading: loading[Profile.id] };
}

export default connect(mapStateToProps, actions)(Profile);