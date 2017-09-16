import React, { Component } from 'react';

export default ({progress}) => {
    var style = {
        container: {
            width: (progress * 100).toString() + '%',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#a6dcf0',
            zIndex: 0,
            transition: "width .5s",

        }
    }

    return <div style={style.container} />
};