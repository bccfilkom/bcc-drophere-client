import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from 'action';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';
import HideShower from '../../../common/HideShower';
import Loading from '../../../common/Loading';
import Preloader from '../../../common/Preloader';

import style from 'css/edit-page.scss';

import EditForm from './EditForm';

var GET_LINKS = 'getLinksLoadingEditPage';

class EditPage extends Component {
    componentWillMount() {
        this.refresh();
    }

    refresh = () => {
        this.props.updateLoading(GET_LINKS);
        this.props.getLinks().then(res => {
            this.props.updateLoading(GET_LINKS, false);
            this.setState({isFetching: false});
            if (res.error) {
                return this.setState({error: res.error}); // what is this for?
            }
        }).catch(err => {
            this.props.updateLoading(GET_LINKS, false);
            console.log(err, 'err nih');
        });
    }

    state = {
        data: [],
        isFetching: true
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    renderContent = () => {
        if (this.props.links && !this.state.isFetching)
        return this.props.links.map((data, i) => {
            return <HideShower 
                id="editPage"
                label={`https://bccdrophere-filkom.ub.ac.id/${data.slug}`}
                key={data.id + Date.now() + ''}
                pageId={data.id}
                data={data}
                index={i}
            ><EditForm onRefresh={this.refresh} data={data} /></HideShower>
        });
        else return <Preloader />
    }

    handleClick = e => {
        this.props.history.push('/account/pages/new');
    }

    render() {
        return (
            <div>
                <div className="btn-container-right">
                    <CustomButton onClick={this.handleClick} style={{marginTop: -60, marginRight: 0}}>Buat Halaman Baru</CustomButton>
                </div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ loading, links }, props) {
    return { loading: loading[GET_LINKS], links };
}

export default connect(mapStateToProps, actions)(EditPage);