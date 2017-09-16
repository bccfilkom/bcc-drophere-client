import React, { Component } from 'react';
import { Input, FontIcon } from 'react-toolbox';
import style from 'css/drop-password-input.scss';
import { connect } from 'react-redux';
import * as actions from 'action';

class PasswordInput extends Component {
    onSubmit = e => {
        e.preventDefault();
        this.props.updateLoading('dropFileContentLoading');
        this.props.unlockPassword(this.props.data.slug, this).then(res => {
            if (res.errors) this.props.updateInfo({active: true, label: 'Incorrect Passsword or Connection Issue', type: 'cancel'});
            this.props.updateLoading('dropFileContentLoading', false);
        }).catch(err => {
            this.props.updateLoading('dropFileContentLoading');
        });
    }

    state = {
        password: '',
    }

    handleChange = ({target: {value: password}}) => {
        this.setState({password})
    }

    render() {
        return (
            <div className={style.container}>
                <form onSubmit={this.onSubmit}>
                <div className={style['container-icon']}>
                    <FontIcon value="lock" className={style['icon']} />
                    <input
                        type="password"
                        placeholder="Masukkan password untuk membuka tautan"
                        className={style['password-input']}
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <button type="submit"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                        }}
                    ><FontIcon value="keyboard_return" className={style['icon']} /></button>
                </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ loading, unlocked }, props) {
    return { unlocked };
}

export default connect(mapStateToProps, actions)(PasswordInput);