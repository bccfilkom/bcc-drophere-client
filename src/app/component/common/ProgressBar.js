import React, { Component } from 'react';

export default ({progress}) => {
    var style = {
        container: {
            width: Math.floor(progress * 100).toString() + '%',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#a6dcf0',
            zIndex: 0,
            transition: '.5s'
        }
    }

    return <div style={style.container} />
};