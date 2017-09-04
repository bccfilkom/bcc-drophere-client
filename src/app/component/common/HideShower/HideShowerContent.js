import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'action';

import style from './content.scss';

class HideShower extends Component { 
    static id = "id";

    componentDidMount() {
        HideShower.id = this.props.id;
    }

    renderContent = () => {
        return (
            <div className={style.container + ' ' + (this.props.selected == this.props.pageId ? style.open : style.close)}>
                {this.props.children}
            </div>
        );
    }
    
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ selected }, props) {
    return { selected: selected[HideShower.id] };
}

export default connect(mapStateToProps, actions)(HideShower);