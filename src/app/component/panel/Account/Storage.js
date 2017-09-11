import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';

import * as actions from 'action';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';
import style from 'css/storage.scss';

import Loading from '../../common/Loading';
import CustomButton from '../../common/CustomButton';
import path from 'path';

var DROPBOX_LOADING = "storageDropboxLoading";

class Storage extends Component {
    state = {
        dropboxemail: '',
        dropboxauth: false,
        dropboxavatar: '',
    }

    static DROPBOX_LOADING = "storageDropboxLoading";

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    updateToken = token => {
        this.props.updateLoading(DROPBOX_LOADING);
        axios.post('http://45.32.115.11:6321/graphql', {
            query: `
            query {
                me {
                    dropboxauth
                }
            }`
        }).then(res => {
            var data = res.data.data.me;
            console.log(data, res, 'finished')
            if (data) {
                var { dropboxemail, dropboxauth, dropboxavatar } = data;
                this.setState({dropboxauth});
                return this.props.updateLoading(DROPBOX_LOADING, false);
            }
        }).catch((res) => {
            console.log(res, 'ke sini malah')
            return this.props.updateLoading(DROPBOX_LOADING, false);
        });
    }

    onClick = () => {
        updateToken = this.updateToken;
        this.props.updateLoading(Storage.DROPBOX_LOADING);
        let win = window.open(
            'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=ojyhbt7ixgei5j9&redirect_uri=http://localhost:3000/dropauth',
            //'http://localhost:3000/dropauth#access_token=_6nPyBosMEYAAAAAAAAQGgGMtMkYvdej6T8p1pi_scWAxH57fZtH8rvmrvmxqCrv&token_type=bearer&uid=104613955&account_id=dbid%3AAABzjG2YLydqtZU9fEVJmM-oHmAcN6cLB_w',
            'Authorization',
            `height=400,width=800`
        );
        const { updateLoading } = this.props;
        function checkWinClose() {
          if (!win.closed) {
            setTimeout(checkWinClose, 500);
          } else {
            updateLoading(DROPBOX_LOADING, false);
          }
        }
        checkWinClose();
    }

    onUnlink = e => {
        
    }

    renderContent() {
        if (!this.state.dropboxauth) {
            return(
                <div className={style['button-wrapper'] + ' opening-transition'}>
                    <Button theme={theme1} onClick={this.onClick} icon="link" label="Authorize" raised primary />
                </div>
            );
        }

        return (
            <div className={style['list-container']}>
                <img src={this.state.dropboxavatar} alt="Dropbox Avatar"/>
                <div>
                <Input 
                    value={this.state.email}
                    label="Dropbox Email"
                />
                </div>
                <div className={style.btn}>
                    <CustomButton red onClick={this.onUnlink} >Unlink</CustomButton>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={style.container}>
                <h1>Koneksi </h1>
                {this.renderContent()}
                {this.props.loading ? <Loading /> : '' }
            </div>
        );
    }
}

function mapStateToProps({logintoken, loading}) {
    return {logintoken, loading: loading[DROPBOX_LOADING]};
};

export default connect(mapStateToProps, actions)(Storage);
