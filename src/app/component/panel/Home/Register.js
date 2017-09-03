import React, { Component } from 'react';
import style from 'css/login.scss';
import Input from 'react-toolbox/lib/input';
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
                    <h1>Register</h1>
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
                        <button className="custom-button">Sign Up</button>
                    </form>
                </div>

                <div className={style.footer}>
                    <p>Sudah memiliki akun? <Link to="/login">LOGIN</Link></p>
                </div>
            </div>
        );
    }
}