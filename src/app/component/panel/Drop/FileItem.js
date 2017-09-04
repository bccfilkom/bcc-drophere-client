import React, { Component } from 'react';
import style from 'css/drop-file.scss';

function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }

export default class FileItem extends Component {
    render() {
        return (
            <div className={style['file-list-item']}>
                <span>{this.props.title}</span>
                <span>{formatBytes(this.props.size)}</span>
            </div>
        );
    }
}