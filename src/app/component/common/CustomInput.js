import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';

import style from 'css/custom-input.scss';
import CustomButton from './CustomButton';

export default class CustomInput extends Component {
    state = {
        disabled: true,
    }

    handleClick = e => {
        // this.element.focus();
        if (this.state.disabled) {
            this.setState({disabled: false});
            // if (this.element) {
            //     this.element.focus();
            //     this.element.focus();
            // }
        }

        if (this.props.onSave) this.props.onSave();
    }
    componentDidUpdate() {
        if(!this.state.disabled)
            this.element.focus();
    }
    render() {
        return (
            <div className={style.container}>
                <Input 
                    {...this.props}
                    disabled={this.state.disabled}
                    innerRef={el => this.element = el}
                    
                />
                
                <CustomButton onClick={this.handleClick} small>{this.state.disabled ? 'Ganti' : 'Simpan'}</CustomButton>
            </div>
        );
    }
}