import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from 'action';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';
import style from 'css/connection.scss';

import Loading from '../../common/Loading';

class Storage extends Component {
    state = {
        email: '',
        password: '',
    }

    static DROPBOX_LOADING = "storageDropboxLoading";

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    updateToken = dropboxtoken => {
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

    onClick = () => {
        updateToken = this.updateToken;
        this.props.updateLoading(Storage.DROPBOX_LOADING);
        window.open(
            'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=ojyhbt7ixgei5j9&redirect_uri=http://localhost:3000/dropauth',
            //'http://localhost:3000/dropauth#access_token=_6nPyBosMEYAAAAAAAAQGgGMtMkYvdej6T8p1pi_scWAxH57fZtH8rvmrvmxqCrv&token_type=bearer&uid=104613955&account_id=dbid%3AAABzjG2YLydqtZU9fEVJmM-oHmAcN6cLB_w',
            'Authorization',
            `height=400,width=800`
        );
    }

    renderContent() {
        if (true) {
            return(
                <div className={style['button-wrapper'] + ' opening-transition'}>
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
                {this.props.loading ? <Loading /> : '' }
            </div>
        );
    }
}

function mapStateToProps({logintoken, loading}) {
    return {logintoken, loading: loading[Storage.DROPBOX_LOADING]};
};

export default connect(mapStateToProps, actions)(Storage);