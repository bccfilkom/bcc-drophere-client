import React, { Component } from 'react';
import style from 'css/login.scss';
import Input from 'react-toolbox/lib/input';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    state = { username: '', password: '' };
    
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
                    <h1>Login</h1>
                </div>

                <div className={style.form}>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className={style.input}>
                        <Input 
                            type='email'
                            label='Username or email'
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
                        <button className="custom-button">Login</button>
                    </form>
                </div>

                <div className={style.footer}>
                    <p>Belum punya akun? <Link to="/register">DAFTAR SEKARANG</Link></p>
                </div>
            </div>
        );
    }
}