import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import DropFile from './DropFile';
import Password from './Password';
import Header from './Header';
import Menu from '../../common/Menu';
import style from 'css/drop-content.scss';

import * as actions from 'action';
import { MENU } from '../../../action/id';

class Content extends Component {
    render() {
        return (
            <div className={style.container + ' wrapper'}>
                <div className={style.content}>
                    
                    <Switch>
                        {/* <Redirect from="/drop" exact to="/drop/password" /> */}
                        <Route path="/drop/password" exact component={Password} />
                        <Route path="/drop/" exact component={DropFile} />
                    </Switch>
                    {/* <Password /> */}
                    {/* <DropFile /> */}
                </div>
            </div>
        );
    }
}


function mapStateToProps({ selected }, props) {
    return { selected: selected[MENU] };
}

export default connect(mapStateToProps, actions)(Content);