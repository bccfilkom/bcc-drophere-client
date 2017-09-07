import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import SeparatedInput from '../../../common/SeparatedInput';

import EditPage from './EditPage';
import NewPage from './NewPage';

import style from 'css/pages.scss';

export default class Pages extends Component {
    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <h1>Halaman</h1>
                <Switch>
                <Route path="/account/pages" exact component={EditPage} />
                <Route path="/account/pages/new" exact component={NewPage} />
                </Switch>
            </div>
        );
    }
}