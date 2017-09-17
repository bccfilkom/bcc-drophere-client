import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { endpointURL } from 'config';

import DropFile from './DropFile';
import Password from './Password';
import Header from './Header';
import Menu from '../../common/Menu';
import Loading from '../../common/Loading';
import style from 'css/drop-content.scss';

import * as actions from 'action';
import { MENU } from '../../../action/id';

const DROP_FILE_LOADING = 'dropFileContentLoading'

class Content extends Component {
    state = {
        data: null,
        locked: true,
        loading: true,
    }

    componentDidMount() {
        this.props.updateLoading(DROP_FILE_LOADING);
        axios.post(endpointURL, {
            query: `
            query {
                link (slug: "${this.props.match.params.slug}") {
                    id
                    title
                    isProtected
                    slug
                    description
                    deadline
                }
            }`
        }).then(res => {
            var data = res.data.data.link;

            if (!res.data.errors) {
                this.setState({data});
            }

            this.setState({loading: false});
            this.props.updateLoading(DROP_FILE_LOADING, false);
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            this.setState({loading: false});
            this.props.updateLoading(DROP_FILE_LOADING, false);
        });
    }

    renderContent = () => {
        let { data, loading } = this.state;
        let unlocked = data ? this.props.unlocked[data.id] : false;
        
        if (!data) return (
            <div style={{marginTop: 60}}>
                <span style={{textAlign: 'center', fontSize: '20pt', fontWeight: 100}}>{loading ? '' : '- 404 NOT FOUND -'}</span>
            </div>
        ); else if (data.deadline) {
            console.log(data.deadline, data.deadline > Date.now());
            if (data.deadline < Date.now()) {
                return (
                    <div style={{marginTop: 60}}>
                        <span style={{textAlign: 'center', fontSize: '20pt', fontWeight: 100}}>LINK EXPIRED</span>
                    </div>
                );
            } else if (data.isProtected && !unlocked) return <Password data={data} {...this.props} />;
            else return <DropFile data={data} {...this.props} password={unlocked} />;
        } else if (data.isProtected && !unlocked) return <Password data={data} {...this.props} />;
        else return <DropFile data={data} {...this.props} password={unlocked} />;
    }

    render() {
        return (
            <div className={style.container + ' wrapper'}>
                <div className={style.content}>
                    {this.renderContent()}
                    {this.props.loading ? <Loading cube /> : '' }
                </div>
            </div>
        );
    }
}


function mapStateToProps({ loading, unlocked }, props) {
    return { loading: loading[DROP_FILE_LOADING], unlocked };
}

export default connect(mapStateToProps, actions)(Content);