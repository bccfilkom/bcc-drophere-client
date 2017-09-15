import React, { Component } from 'react';
import style from 'css/drop-file.scss';
import FileItem from './FileItem';
import axios from 'axios';
import Loading from '../../common/Loading';
import Snackbar from 'react-toolbox/lib/snackbar';
import { uploadURL } from 'config';

export default class DropFile extends Component {
    state = {
        file: null,
        uploadProgress: 0,
        uploading: false,
        uploadFailed: false,
        message: {
            stillUploading: false,
            fileSizeLimitExceeds: false
        }
    }

    handleFile(file) {
        if (this.state.uploading) {
            this.setState({
                message: {
                    ...this.state.message,
                    stillUploading: true 
                }
            });
            return;
        }
        // max 10 mb (10 * 1024 * 1024)
        if(file.size > 10485760){
            this.setState({
                message: {
                    ...this.state.message,
                    fileSizeLimitExceeds: true
                }
            })
            return;
        }

        this.setState({
            file,
            uploadProgress: 0,
            uploading: true,
            uploadFailed: false
        });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('linkid', this.props.match.params.id)
        axios.post(uploadURL, formData, {
            // config
            onUploadProgress: (progressEvent) => {
                let percentCompleted = (progressEvent.loaded / progressEvent.total);
                // console.log(`Progress: ${percentCompleted} %`)
                this.setState({
                    uploadProgress: percentCompleted
                })
            }
        })
            .then(res => {
                this.setState({ uploading: false });
                // console.log(`Upload File Completed:`, res)
            })
            .catch(error => {
                this.setState({ uploading: false, uploadFailed: true });
                // console.log(`Error Uploading file: ${error}`)
            });
    }

    stillUploadingWarningHandler() {
        this.setState({ message: { ...this.state.message, stillUploading: false } });
    }
    fileSizeLimitExceedsWarningHandler = () => {
        this.setState({ message: { ...this.state.message, fileSizeLimitExceeds: false } });
    }

    render() {
        let fileList;
        if (this.state.file && typeof this.state.file === "object")
            fileList = <FileItem
                title={this.state.file.name}
                size={this.state.file.size}
                percentage={this.state.uploadProgress}
                uploading={this.state.uploading}
                failed={this.state.uploadFailed} />;

        return (
            <div className={style.container}>
                <span className={style.title}>Kirim File ke Laporan Praktikum Bab 4</span>
                <span className={style.subtitle}>Tarik atau pilih file untuk diunggah</span>
                <span className={style['time-limit']}>Tautan akan ditutup pada : Minggu, 27 Agustus 2017 pukul 23:59 WIB</span>

                <div
                    className={style['drop-file-container']}
                    ref={el => this.dropArea = el}>
                    <span className={style['drop-title']}>TARIK FILE KE SINI</span>
                    <span className={style['drop-separator']}>- ATAU -</span>
                    <div className={style['upload-file-container']}>
                        <label for="uploadFile">
                            <span className={style['upload-file-button']}>PILIH FILE UNTUK DIUNGGAH</span>
                            <input
                                type="file"
                                ref={e => this.fileUploadElement = e}
                                name="uploadFile"
                                id="uploadFile"
                                className={style['upload-file']}
                                disabled={this.state.uploading}
                            />
                        </label>
                    </div>
                    {this.state.uploading ? <Loading /> : ''}
                </div>
                <div
                    ref={e => this.fileListContainer = e}
                    className={style['file-list-container']}>
                    {fileList}
                </div>

                <Snackbar
                    action="Dismiss"
                    active={this.state.message.stillUploading}
                    label="Harap tunggu, sedang mengunggah file."
                    timeout={3000}
                    onTimeout={this.stillUploadingWarningHandler.bind(this)}
                    onClick={this.stillUploadingWarningHandler.bind(this)}
                    type="warning"
                />
                <Snackbar
                    action="Dismiss"
                    active={this.state.message.fileSizeLimitExceeds}
                    label="Ukuran file melebihi batas (10 MB)"
                    timeout={3000}
                    onTimeout={this.fileSizeLimitExceedsWarningHandler}
                    onClick={this.fileSizeLimitExceedsWarningHandler}
                    type="warning"
                />
            </div>
        );
    }
    componentDidMount() {
        this.dropArea.ondragenter = (e, event) => {
            e.preventDefault();
            this.dropArea.classList.add(style['drop-file-container-ondrag']);

        };
        this.dropArea.ondragover = (e) => {
            e.preventDefault();
            if (!this.dropArea.classList.contains(style['drop-file-container-ondrag']))
                this.dropArea.classList.add(style['drop-file-container-ondrag']);
        }
        this.dropArea.ondragleave = (e) => {
            e.preventDefault();
            this.dropArea.classList.remove(style['drop-file-container-ondrag']);
        }
        this.dropArea.ondrop = (e) => {
            e.preventDefault();
            this.dropArea.classList.remove(style['drop-file-container-ondrag']);
            // console.log(typeof e.dataTransfer.files.item(0) === "object");
            // console.log(e.dataTransfer.files.item(0));
            // this.selectedFile = e.dataTransfer.files.item(0);
            this.handleFile(e.dataTransfer.files.item(0));
        }
        this.fileUploadElement.onchange = e => {
            e.preventDefault();
            this.handleFile(e.target.files[0]);
            // console.log(e.target.files);
            // console.log(e.dataTransfer.files);
        }
    }
}
