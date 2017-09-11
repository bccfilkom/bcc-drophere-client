import React, { Component } from 'react';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';
import Input from '../../../common/WrappedInput';

import DatePicker from 'react-toolbox/lib/date_picker';

import style from 'css/edit-page.scss';

export default class NewPage extends Component {
    state = {
        slug: '',
        password: '',
        title: '',
        description: '',
        deadline: null,
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    onDelete = e => {
        e.preventDefault();
    }

    onSave = e => {
        e.preventDefault();

        
    }

    render() {
        console.log(this.props.data);
        return (
            <div>
            <form>
            <SeparatedInput caption="http://bccdrophere.dev/">
                <Input
                hint="halaman"
                type="text"
                value={this.state.slug || this.props.data.slug}
                onChange={this.handleChange.bind(this, 'slug')}
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
                value={this.state.title || this.props.data.title}
                onChange={this.handleChange.bind(this, 'title')}
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
                    value={this.state.deadline || new Date(this.props.data.deadline)}
                    onChange={this.handleChange.bind(this, 'deadline')}
                />
            </SeparatedInput>

                <div className={style.btn}>
                    <CustomButton red onClick={this.onDelete} >Hapus Tautan</CustomButton>
                    <CustomButton onClick={this.onSave}>Simpan</CustomButton>
                </div>
            </form>
            </div>
        );
    }
}