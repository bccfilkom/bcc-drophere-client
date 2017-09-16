import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'action';
import axios from 'axios';
import Snackbar from 'react-toolbox/lib/snackbar';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';
import Input from '../../../common/WrappedInput';
import Loading from '../../../common/Loading';

import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';

import style from 'css/edit-page.scss';

import { endpointURL } from 'config';

const EDIT_FORM_LOADING = 'editFormLoading';

class EditForm extends Component {
    state = {
        slug: '',
        password: '',
        title: '',
        description: '',
        deadline: null,
        id: '',
        info: false,
        infoLabel: '',
        infoType: 'accept'
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    onDelete = e => {
        e.preventDefault();
        let { title, slug, description, password, deadline, id } = this.state;
        this.props.updateLoading(EDIT_FORM_LOADING);
        axios.post(endpointURL, {
            query: `
            mutation {
                deletelink (linkId: ${id}) {
                    msg
                }
            }`
        }).then(res => {
            var data = res.data.data.deletelink;
            
            if (res.data.errors) {
                this.setState({infoLabel: res.data.errors[0].message, info: true, infoType: 'cancel'});
            } else {
                this.setState({infoLabel: data.msg, info: true, infoType: 'accept'});
            }
            //console.log(data.msg);
            this.props.updateLoading(EDIT_FORM_LOADING, false);
            this.props.onRefresh();
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            this.props.updateLoading(EDIT_FORM_LOADING, false);
        });
    }

    onSave = e => {
        e.preventDefault();
        let { title, slug, description, password, deadline, id } = this.state;
        this.props.updateLoading(EDIT_FORM_LOADING);
        axios.post(endpointURL, {
            query: `
            mutation {
                updatelink (
                    linkId: ${id}
                    title: "${title}"
                    slug: "${slug}"
                    description: "${description}"
                    deadline: ${deadline.getTime()}
                    ${password == '' || !password ? '' : `password: "${password}"`}
                ) {
                    msg
                }
            }`
        }).then(res => {
            var data = res.data.data.updatelink;
            
            if (res.data.errors) {
                this.setState({infoLabel: res.data.errors[0].message, info: true, infoType: 'cancel'});
            } else {
                this.setState({infoLabel: data.msg, info: true, infoType: 'accept'});
            }
            //console.log(data.msg);
            this.props.updateLoading(EDIT_FORM_LOADING, false);
            //this.props.onRefresh();
        }).catch((res) => {
            this.setState({infoLabel: res, info: true, infoType: 'cancel'});
            this.props.updateLoading(EDIT_FORM_LOADING, false);
        });
    }

    componentDidMount() {
        let { id, title, slug, description, password, deadline } = this.props.data;
        this.setState({id, title, slug, description, password, deadline: new Date(deadline)});
    }
    
    handleSnackbarClick = (event, instance) => {
        this.setState({ info: false });
    };
    
    handleSnackbarTimeout = (event, instance) => {
        this.setState({ info: false });
    };

    render() {
        return (
            <div>
            <form onSubmit={this.onSave}>
            <SeparatedInput caption="http://bccdrophere.dev/">
                <Input
                hint="halaman*"
                type="text"
                value={this.state.slug || this.props.data.slug}
                onChange={this.handleChange.bind(this, 'slug')}
                required
                />
            </SeparatedInput>
            
            <SeparatedInput caption="Password Unggah">
                <Input
                hint="password"
                type="password"
                name={this.state.slug}
                value={this.state.password}
                onChange={this.handleChange.bind(this, 'password')}
                />
            </SeparatedInput>
            
            <SeparatedInput caption="Judul">
                <Input
                hint="Kirim file kepada*"
                type="text"
                value={this.state.title || this.props.data.title}
                onChange={this.handleChange.bind(this, 'title')}
                required
                />
            </SeparatedInput>
            
            <SeparatedInput caption="Deskripsi">
                <Input
                hint="Tarik atau pilih file untuk diunggah"
                type="text"
                value={this.state.description || this.props.data.description || this.props.data.deskripsi}
                onChange={this.handleChange.bind(this, 'description')}
                />
            </SeparatedInput>
            
            <SeparatedInput caption="Deadline">
                <DatePicker
                    hint="Tautan akan mati pada deadline yang ditentukan"
                    type="text"
                    minDate={new Date() - 86400000}
                    value={this.state.deadline || new Date(this.props.data.deadline)}
                    onChange={this.handleChange.bind(this, 'deadline')}
                />
            </SeparatedInput>

            { this.state.deadline ? 
            <SeparatedInput caption="Deadline Waktu">
                <TimePicker
                    hint="Waktu penutupan"
                    value={this.state.deadline}
                    onChange={this.handleChange.bind(this, 'deadline')}
                />
            </SeparatedInput> : ''
            }

            <div className={style.btn}>
                <CustomButton type="button" red onClick={this.onDelete} >Hapus Tautan</CustomButton>
                <CustomButton type="submit" onClick={this.onSave}>Simpan</CustomButton>
            </div>
            {this.props.loading ? <Loading /> : '' }
            <Snackbar
                action='Dismiss'
                active={this.state.info}
                label={this.state.infoLabel}
                timeout={2000}
                onClick={this.handleSnackbarClick}
                onTimeout={this.handleSnackbarTimeout}
                type={this.state.infoType}
            />
            </form>
            </div>
        );
    }
}

function mapStateToProps({ loading }, props) {
    return { loading: loading[EDIT_FORM_LOADING]};
}

export default connect(mapStateToProps, actions)(EditForm);