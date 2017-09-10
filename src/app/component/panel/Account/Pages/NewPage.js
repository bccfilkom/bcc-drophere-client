import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'action';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';
import axios from 'axios';
import DatePicker from 'react-toolbox/lib/date_picker';

import style from 'css/edit-page.scss';

import Input from '../../../common/WrappedInput';
import Loading from '../../../common/Loading';

const NEW_POST_LOADING = 'newPostLoading';

class NewPage extends Component {
    state = {
        page: '',
        password: '',
        title: '',
        description: '',
        deadline: null,
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    onSubmit = e => {
        e.preventDefault();
        var {title, deadline, password, description} = this.state;
        this.props.updateLoading(NEW_POST_LOADING);
        
        axios.post('http://45.32.115.11:6321/graphql', {
            query: `
            mutation {
                createlink(title: "${title}", deskripsi: "${description}", deadline: ${deadline.getTime()}, password: "${password}") {
                    id
                }
            }`
        }).then(res => {
            var createlink = res.data.data.createlink;
            if (createlink) {
                this.props.history.push('/account/pages');
                return this.props.updateLoading(NEW_POST_LOADING, false);
            }

            console.log(res.data.errors);
        }).catch((res) => {
            console.log(res, 'Error occurred');
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <SeparatedInput caption="http://bccdrophere.dev/">
                    <Input
                    hint="halaman"
                    type="text"
                    value={this.state.page}
                    onChange={this.handleChange.bind(this, 'page')}
                    />
                </SeparatedInput>
                
                <SeparatedInput caption="Password Unggah">
                    <Input
                    hint="password"
                    type="text"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this, 'password')}
                    />
                </SeparatedInput>
                
                <SeparatedInput caption="Judul">
                    <Input
                    hint="Kirim file kepada"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange.bind(this, 'title')}
                    />
                </SeparatedInput>
                
                <SeparatedInput caption="Deskripsi">
                    <Input
                    hint="Tarik atau pilih file untuk diunggah"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange.bind(this, 'description')}
                    />
                </SeparatedInput>
                
                <SeparatedInput caption="Deadline">
                    <DatePicker
                        hint="Tautan akan mati pada deadline yang ditentukan"
                        type="text"
                        value={this.state.deadline}
                        onChange={this.handleChange.bind(this, 'deadline')}
                    />
                </SeparatedInput>

                <div className={style.btn}><CustomButton>Buat Halaman</CustomButton></div>
                {this.props.loading ? <Loading /> : '' }
                </form>
            </div>
        );
    }
}

function mapStateToProps({ loading }, props) {
    return { loading: loading[NEW_POST_LOADING]};
}

export default connect(mapStateToProps, actions)(NewPage);