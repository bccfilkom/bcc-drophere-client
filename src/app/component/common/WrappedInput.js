import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import PasswordInput from './PasswordInput'

export default props => {
    return(
        <div style={{marginTop: -20}}>
            {
                props.password ? <PasswordInput {...props} />
                : <Input {...props} />
            }
        </div>
    );
}