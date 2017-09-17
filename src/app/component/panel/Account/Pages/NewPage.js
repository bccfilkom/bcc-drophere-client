import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'action';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';
import axios from 'axios';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';

import style from 'css/edit-page.scss';

import Input from '../../../common/WrappedInput';
import Loading from '../../../common/Loading';

import { endpointURL } from 'config';

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
        var {title, page , deadline, password, description} = this.state;
        this.props.updateLoading(NEW_POST_LOADING);
        
        axios.post(endpointURL, {
            query: `
            mutation {
                createlink(title: "${title}", slug: "${page}", description: "${description}"${deadline ? `, deadline: ${deadline.getTime()}` : ''}, password: "${password}") {
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
        let initialTime = new Date();
        initialTime.setHours(23, 59);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <SeparatedInput caption="bccdrophere/">
                    <Input
                    hint="Halaman"
                    type="text"
                    value={this.state.page}
                    onChange={this.handleChange.bind(this, 'page')}
                    required
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
                    required
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
                
                <SeparatedInput caption="Deadline Tanggal">
                    <DatePicker
                        hint="Tautan akan mati pada deadline yang ditentukan"
                        type="text"
                        minDate={new Date() - 86400000}
                        value={this.state.deadline}
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

                <div className={style.btn}><CustomButton type="submit">Buat Halaman</CustomButton></div>
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