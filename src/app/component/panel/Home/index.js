import React, { Component } from 'react';
import style from 'css/home.scss';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Footer from '../../common/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class Home extends Component {
    componentDidMount() {
        this.props.updateParticle(true);
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.header}>
                        <Header />
                    </div>
                    <div className={style.auth}>
                        <Switch>
                            <Route path="/home" exact component={Login} />
                            <Route path="/register" exact component={Register} />
                        </Switch>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}