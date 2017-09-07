import React, { Component } from 'react';
import style from 'css/login.scss';
import Input from '../../common/WrappedInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../common/Loading';
import * as actions from 'action';

class Register extends Component {
    state = { username: '', password: '', email: '' };
    
    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    static id = "registerLoading";

    onSubmitHandler = e => {
        e.preventDefault();

        var { username, email, password } = this.state;
        
        this.props.updateLoading(Register.id);
        this.props.register(username, email, password).then(res => {
            this.props.updateLoading(Register.id, false);
            
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
                            label='Username'
                            icon='account_circle' 
                            value={this.state.username} 
                            onChange={this.handleChange.bind(this, 'username')} 
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
                        {this.state.error ? <div className="error">{this.state.error}</div> : ''}
                        <button className="custom-button">Daftar</button>
                        </div>
                        {this.props.loading ? <Loading /> : ''}
                    </form>
                </div>

                <div className={style.footer}>
                    <p>Sudah memiliki akun? <Link to="/login">Masuk</Link></p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({logintoken, loading}) {
    return {logintoken, loading: loading[Register.id]};
};

export default connect(mapStateToProps, actions)(Register);