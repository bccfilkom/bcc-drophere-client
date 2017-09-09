import React, { Component } from 'react';
import { FontIcon } from 'react-toolbox';
import style from 'css/drop-file.scss';
import ProgressBar from '../../common/ProgressBar';

function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
function formatPercentage(percent) {
  if (isNaN(percent))
    percent = 0;
    if(percent == 100)
      return <FontIcon value="check" className={style['icon-small']} />;
    else
      return <span>{(percent * 100).toFixed()}%</span>;
}
export default class FileItem extends Component {
    render() {
        var finished = this.props.percentage == 1;
        return (
            <div className={style['file-list-item']}>
                {this.props.percentage != 1 ? <ProgressBar progress={this.props.percentage} /> : ''}
                <span>{this.props.title}</span>
                <span className={style['percentage-and-size']}>
                    <span className={style['percentage']}>
                      {finished ? <span>&#10004;</span> : formatPercentage(this.props.percentage)}
                    </span>
                    {formatBytes(this.props.size)}
                </span>
            </div>
        );
    }
}
