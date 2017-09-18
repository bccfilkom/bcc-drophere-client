import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';

import * as actions from 'action';

import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';
import style from 'css/storage.scss';
import Preloader from '../../common/Preloader';

import Loading from '../../common/Loading';
import CustomButton from '../../common/CustomButton';
import path from 'path';

import { endpointURL } from 'config';

var DROPBOX_LOADING = "storageDropboxLoading";
var GET_DATA_LOADING = "storageGetDataLoading";

class Storage extends Component {
    state = {
        dropboxemail: '',
        dropboxauth: false,
        dropboxavatar: '',
    }

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    componentDidMount() {
        this.updateData(GET_DATA_LOADING);
    }

    updateData = (loading = DROPBOX_LOADING) => {
        this.props.updateLoading(loading);
        axios.post(endpointURL, {
            query: `
            query {
                me {
                    dropboxemail
                    dropboxavatar
                }
            }`
        }).then(res => {
            var data = res.data.data.me;

            if (!res.data.errors) {
                var { dropboxemail, dropboxavatar } = data;
                this.setState({dropboxavatar, dropboxemail});
                //console.log(data);
            }

            this.props.updateLoading(loading, false);
        }).catch((res) => {
            this.props.updateInfo({label: res, active: true, type: 'cancel'});
            this.props.updateLoading(loading, false);
        });
    }

    updateToken = token => {
        this.props.updateLoading(DROPBOX_LOADING);
        axios.post(endpointURL, {
            query: `
            mutation {
                dropboxtoken (token: "${token}") {
                    msg
                }
            }`
        }).then(res => {
            var data = res.data.data.dropboxtoken;
            
            if (res.data.errors) {
                this.props.updateInfo({label: res.data.errors[0].message, active: true, type: 'cancel'});
            } else {
                this.props.updateInfo({label: data.msg, active: true, type: 'accept'});
            }
            
            this.updateData();
            //console.log(data.msg);
        }).catch((res) => {
            this.props.updateInfo({label: res, active: true, type: 'cancel'});
            return this.props.updateLoading(DROPBOX_LOADING, false);
        });
    }

    onClick = () => {
        updateToken = this.updateToken;
        this.props.updateLoading(DROPBOX_LOADING);
        let win = window.open(
            'https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=ojyhbt7ixgei5j9&redirect_uri=https://bccdrophere-filkom.ub.ac.id/dropauth',
            //'http://localhost:3000/dropauth#access_token=_1293819827319823y1823&token_type=bearer&uid=104613955&account_id=dbid%3AAABzjG2YLydqtZU9fEVJmM-oHmAcN6cLB_w',
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
        this.props.updateLoading(DROPBOX_LOADING);
        axios.post(endpointURL, {
            query: `
            mutation {
                dropboxunlink {
                    msg
                }
            }`
        }).then(res => {
            var data = res.data.data.dropboxunlink;
            
            if (res.data.errors) {
                this.setState({infoLabel: res.data.errors[0].message, info: true, infoType: 'cancel'});
            } else {
                this.setState({infoLabel: data.msg, info: true, infoType: 'accept'});
            }
            
            this.updateData();
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            return this.props.updateLoading(DROPBOX_LOADING, false);
        });
    }

    renderContent() {
        if (!this.state.dropboxemail) {
            return(
                <div className={style['button-wrapper'] + ' opening-transition'}>
                    <Button theme={theme1} onClick={this.onClick} icon="link" label="Authorize" raised primary />
                </div>
            );
        }

        return (
            <div className={style['list-container']}>
                <img src={this.state.dropboxavatar} alt="Dropbox Avatar"/>
                <div className={style.right}>
                <Input 
                    value={this.state.dropboxemail}
                    label="Dropbox Email"
                    disabled
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
                {this.props.getDateLoading ? <Preloader />
                :   <div>
                        {this.renderContent()}
                        {this.props.loading ? <Loading /> : '' }
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps({logintoken, loading}) {
    return {logintoken, loading: loading[DROPBOX_LOADING], getDateLoading: loading[GET_DATA_LOADING]};
};

export default connect(mapStateToProps, actions)(Storage);
