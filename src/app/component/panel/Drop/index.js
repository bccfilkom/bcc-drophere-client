import React, { Component } from 'react';
import axios from 'axios';

import style from 'css/account.scss';
import style2 from 'css/drop-file.scss'
import { Route, Switch, Redirect } from 'react-router-dom';

import DropFile from './DropFile';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Content from './Content';

export default class Drop extends Component {
    state = {
        data: [],
    }
    componentDidMount() {
        this.props.updateParticle(true);
        this.loadSponsor();
    }

    loadSponsor = () => {
        axios.get('/json/sponsor.json').then(({data}) => {
            let res = [], remain = 0;
            for (let i = 0; i < data.length; i++) if (data[i].special) {
                res.push(data[i]);
                data.splice(i, 1);
            }
            remain = res.length;
            for (let i = 0; i < 3 - remain; i++) {
                let random = Math.floor(Math.random() * data.length);
                res.push(data[random]);
                data.splice(random, 1);
            }

            console.log(res);
            
            this.setState({data: res});
        }).catch(err => {
            console.log(err);
        });
    }

    renderSponsor() {
        let data = this.state.data;

        return data.map(obj => {
            return (
                <div className={style2['sponsor-wrapper']}><a href={obj.link} target="_blank"><img src={obj.img}/></a></div>
            );
        });
    }
    
    render() {
        return (
            <div className={style.container} style={{height: '100%'}}>
                <div className={style.header}>
                    <Header />
                </div>

                <div style={{height: '67%'}}>
                    <Content  {...this.props}  />
                </div>

                <div className={style2['sponsor-container']} style={{width: '81%', margin: '10px auto 0px auto'}}>
                    {this.renderSponsor()}
                </div>

                <Footer />
            </div>
        );
    }
}