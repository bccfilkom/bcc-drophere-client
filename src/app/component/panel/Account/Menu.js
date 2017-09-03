import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from 'css/account-menu.scss';
import * as actions from 'action';

class Menu extends Component {
    static id = "menu";

    render() {
        return (
            <div className={style.container + ' wrapper'}>

            </div>
        );
    }
}


function mapStateToProps({ selected }, props) {
    return { selected: selected[Menu.id] };
}

export default connect(mapStateToProps, actions)(Menu);