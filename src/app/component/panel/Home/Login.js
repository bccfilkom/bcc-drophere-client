import React, { Component } from 'react';
import style from 'css/login.scss';
import Input from '../../common/WrappedInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'action';

import Loading from '../../common/Loading';

class Login extends Component {
    state = { username: '', password: '' };
    
    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    static id = "loginLoading"

    onSubmitHandler = e => {
        e.preventDefault();
        var {username, password} = this.state;
        
        this.props.updateLoading(Login.id);
        this.props.login(username, password).then(res => {
            this.props.updateLoading(Login.id, false);
            if (res.error) {
                return this.setState({error: res.error});
            }

            this.props.history.push('/account');
        }).catch(err => {
            this.props.updateLoading(Login.id, false);
            console.log(err, 'err nih');
        });
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
                        <div className={style['form-container']}>
                        <div className={style.input}>
                        <Input 
                            type='text'
                            label='Username or email'
                            icon='email' 
                            value={this.state.username} 
                            onChange={this.handleChange.bind(this, 'username')} 
                        />
                        <Input 
                            type='password'
                            label='Password'
                            icon='lock' 
                            value={this.state.password} 
                            onChange={this.handleChange.bind(this, 'password')} 
                        />
                        </div>
                        {this.state.error ? <div className="error">{this.state.error}</div> : ''}
                        <button className="custom-button">Masuk</button>
                        </div>
                        {this.props.loading ? <Loading /> : '' }
                    </form>
                </div>

                <div className={style.footer}>
                    <p>Belum punya akun? <Link to="/register">Daftar</Link></p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({logintoken, loading}) {
    return {logintoken, loading: loading[Login.id]};
};

export default connect(mapStateToProps, actions)(Login);