import React, { Component } from 'react';
import axios from 'axios';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';
import HideShower from '../../../common/HideShower';

import style from 'css/edit-page.scss';

import EditForm from './EditForm';

export default class EditPage extends Component {
    componentWillMount() {
        axios.get('/json/pages.json').then(res => {
            this.setState({data: res.data});
        });
    }

    state = {
        data: []
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    renderContent = () => {
        return this.state.data.map(data => {
            return <HideShower 
                id="editPage"
                label={`http://bccdrophere.dev/${data.page}`}
                key={data.id}
                pageId={data.id}
            ><EditForm data={data} /></HideShower>
        });
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