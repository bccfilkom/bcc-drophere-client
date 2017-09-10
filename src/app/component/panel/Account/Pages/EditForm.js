import React, { Component } from 'react';

import SeparatedInput from '../../../common/SeparatedInput';
import CustomButton from '../../../common/CustomButton';

import Input from '../../../common/WrappedInput';

import style from 'css/edit-page.scss';

export default class NewPage extends Component {
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

    onDelete = e => {
        e.preventDefault();
    }

    onSave = e => {
        e.preventDefault();

        
    }

    render() {
        return (
            <div>
            <form>
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

                <div className={style.btn}>
                    <CustomButton red onClick={this.onDelete} >Hapus Tautan</CustomButton>
                    <CustomButton onClick={this.onSave}>Simpan</CustomButton>
                </div>

            </form>
            </div>
        );
    }
}