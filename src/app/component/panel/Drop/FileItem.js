import React, { Component } from 'react';
import { FontIcon } from 'react-toolbox';
import style from 'css/drop-file.scss';
import ProgressBar from '../../common/ProgressBar';

function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
export default class FileItem extends Component {
    formatPercentage() {
        let {
            percentage: percent,
            uploading,
            failed
        } = this.props;
        if (isNaN(percent))
            percent = 0;
        if (failed)
            return (<div style={{ color: "red", fontSize: 16, display: "flex", alignItems: "center" }}>
                <span style={{ paddingRight: 5 }}>Upload failed</span>
                <FontIcon value="error" className={style['icon-small']} />
            </div>);
        if (percent == 1) {
            if (uploading)
                return <span>Syncing...</span>;
            return <span>&#10004;</span>;
        } else
            return <span>{(percent * 100).toFixed(2)}%</span>;
    }
    render() {
        return (
            <div className={style['file-list-item']}>
                {this.props.percentage != 1 ? <ProgressBar progress={this.props.percentage} /> : ''}
                <span>{this.props.title}</span>
                <span className={style['percentage-and-size']}>
                    <span className={style['percentage']}>
                        {this.formatPercentage()}
                    </span>
                    {formatBytes(this.props.size)}
                </span>
            </div>
        );
    }
}
