import React, { Component } from 'react';

export default ({progress}) => {
    var style = {
        container: {
            width: Math.floor(this.props.progress * 100).toString() + '%',
            height: 'auto',
            backgroundColor: '#blue',
        }
    }

    return <div style={style.container} />
};