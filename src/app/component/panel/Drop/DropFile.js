import React, { Component } from 'react';
import style from 'css/drop-file.scss';
import FileItem from './FileItem';

export default class DropFile extends Component {
    state = {
        file: null
    }

    handleFile(file) {
        this.setState({ file });
        // console.log(e.dataTransfer.files.item(0));            
        // let fr = new FileReader();
        // fr.onload = ev => {
        //     console.log(ev.target.result);
        // }
        // fr.readAsText(e.dataTransfer.files.item(0));
    }

    render() {
        let fileList;
        if (this.state.file && typeof this.state.file === "object")
            fileList = <FileItem title={this.state.file.name} size={this.state.file.size} />;

        return (
            <div className={style.container}>
                <span className={style.title}>Kirim File ke Laporan Praktikum Bab 4</span>
                <span className={style.subtitle}>Tarik atau pilih file untuk diunggah</span>
                <span className={style['time-limit']}>Tautan akan ditutup pada : Minggu, 27 Agustus 2017 pukul 23:59 WIB</span>
                <div className={style['drop-file-container']} ref={el => this.dropArea = el}>
                    <span className={style['drop-title']}>TARIK FILE KE SINI</span>
                    <span className={style['drop-separator']}>- ATAU -</span>
                    <div className={style['upload-file-container']}>
                        <label for="uploadFile">
                            <span className={style['upload-file-button']}>PILIH FILE UNTUK DIUNGGAH</span>
                            <input type="file" ref={e => this.fileUploadElement = e} name="uploadFile" id="uploadFile" className={style['upload-file']} />
                        </label>
                    </div>
                </div>
                <div ref={e => this.fileListContainer = e} className={style['file-list-container']}>
                    {fileList}
                </div>
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