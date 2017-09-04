import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';

export default props => {
    return(
        <div style={{marginTop: -20}}>
            <Input {...props} />
        </div>
    );
}