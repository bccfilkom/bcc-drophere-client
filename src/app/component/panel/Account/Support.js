import React, { Component } from 'react';
import style from 'css/account-support';
import CustomInput from '../../common/CustomInput';

export default class Support extends Component {
    state = {
        message:'',
    }

    handleChange = (message, value) => {   
        this.setState({[message]: value})
    }

    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <h1>Support</h1>
                <CustomInput
                type="text"
                label="Masukkan pesan anda"
                value={this.state.message}
                onChange={this.handleChange.bind(this, "message")}
                />
            </div>
        );
    }
}