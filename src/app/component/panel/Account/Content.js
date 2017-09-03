import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './Profile';
import Header from '../../common/Header';
import Menu from '../../common/Menu';
import style from 'css/account-content.scss';

import * as actions from 'action';
import { MENU } from '../../../action/id';

class Content extends Component {
    componentWillReceiveProps(next) {
        this.matchSelected();
    }
    
    componentWillMount() {
        this.matchSelected();
    }

    matchSelected = () => {
        var { pathname } = location;
        
        if (pathname.search('/account/profile') != -1) {
            this.props.updateSelected(MENU, 0);
        } else if (pathname.search('/account/connection') != -1) {
            this.props.updateSelected(MENU, 1);
        } else if (pathname.search('/account/pages') != -1) {
            this.props.updateSelected(MENU, 2);
        } else if (pathname.search('/account/support') != -1) {
            this.props.updateSelected(MENU, 3);
        }
    }

    data = [
        { caption: 'Profil', leftIcon: 'account_circle', url: '/profile' },
        { caption: 'Koneksi', leftIcon: 'timeline', url: '/connection' },
        { caption: 'Halaman', leftIcon: 'pages', url: '/pages' },
        { caption: 'Dukungan', leftIcon: 'assignment_ind', url: '/support' },
    ];

    onClick = i => {
        this.props.updateSelected(MENU, i);
    }

    componentDidMount() {
        if (!this.props.alwaysActive) document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = e => {
        var scrollTop = win.scrollTop();
        var firstPosition = this.element.offsetTop || 360;
        
        if (!this.menu) return;

        if (this.props.firstPosition) firstPosition = this.props.firstPosition;
        
        if (scrollTop > firstPosition) {
            this.menu.addClass(style['menu-fly']);
        } else {
            this.menu.removeClass(style['menu-fly']);
        }

    }

    render() {
        var menuStyle = {

        }

        return (
            <div ref={el => this.element = el} className={style.container + ' wrapper'}>
                <div ref={el => this.menu = $(el)} className={style.menu}>
                    <Menu  {...this.props} data={this.data} onClick={this.onClick} />
                </div> 

                <div className={style.content}>
                    <Switch>
                    <Redirect from="/account" exact to="/account/profile" />
                    <Route path="/account/profile" component={Profile} />
                    </Switch>
                </div>
            </div>
        );
    }
}


function mapStateToProps({ selected }, props) {
    return { selected: selected[MENU] };
}

export default connect(mapStateToProps, actions)(Content);