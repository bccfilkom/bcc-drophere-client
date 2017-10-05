import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class PasswordInput extends Component {
    state = { showPassword: false };
    
    handleChange = (field, value) => {
        this.setState({...this.state, [field]: value});
    };
      
    render() {
        return (
            <div>
                <Input
                    {...this.props}
                    type={this.state.showPassword ? 'text' : 'password'}
                />

                <Checkbox
                    checked={this.state.showPassword}
                    label="Show password"
                    onChange={this.handleChange.bind(this, 'showPassword')}
                />
            </div>
        );
    }
}