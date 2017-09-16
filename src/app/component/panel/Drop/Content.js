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
    }

    componentDidMount() {
        this.props.updateLoading(DROP_FILE_LOADING);
        axios.post(endpointURL, {
            query: `
            query {
                link (slug: "${this.props.match.params.id}") {
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

            this.props.updateLoading(DROP_FILE_LOADING, false);
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            this.props.updateLoading(DROP_FILE_LOADING, false);
        });
    }

    renderContent = () => {
        let { data, locked } = this.state;
        if (!data) return (
            <div>
                <span>404 NOT FOUND</span>
            </div>
        ); else if (data.isProtected || locked) return <Password data={data} {...this.props} />;
        else return <DropFile data={this.data} {...this.props} />;
    }

    render() {
        return (
            <div className={style.container + ' wrapper'}>
                <div className={style.content}>
                    {this.renderContent()}
                    {this.props.loading ? <Loading /> : '' }
                </div>
            </div>
        );
    }
}


function mapStateToProps({ loading }, props) {
    return { loading: loading[DROP_FILE_LOADING] };
}

export default connect(mapStateToProps, actions)(Content);