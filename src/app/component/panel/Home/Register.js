import React, { Component } from 'react';
import style from 'css/login.scss';
import Input from '../../common/WrappedInput';
import { Link } from 'react-router-dom';

export default class Register extends Component {
    state = { username: '', password: '', email: '' };
    
    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    onSubmitHandler = e => {
        e.preventDefault();
    }

    render() {
        return(
            <div className={style.container}>
                <div className={style.header}>
                <h1>Kumpulkan Filemu di Sini!</h1>
                <p>Dapatkan kemudahan dalam menerima filemu di sini</p>
                </div>

                <div className={style.form}>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className={style.input}>
                        <Input 
                            type='text'
                            label='Username'
                            icon='account_circle' 
                            value={this.state.email} 
                            onChange={this.handleChange.bind(this, 'email')} 
                        />
                        <Input 
                            type='email'
                            label='Email'
                            icon='email' 
                            value={this.state.email} 
                            onChange={this.handleChange.bind(this, 'email')} 
                        />
                        <Input 
                            type='password'
                            label='Password'
                            icon='lock' 
                            value={this.state.password} 
                            onChange={this.handleChange.bind(this, 'password')}
                        />
                        </div>
                        <button className="custom-button">Daftar</button>
                    </form>
                </div>

                <div className={style.footer}>
                    <p>Sudah memiliki akun? <Link to="/login">Masuk</Link></p>
                </div>
            </div>
        );
    }
}