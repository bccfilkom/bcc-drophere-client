import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'action';

import style from './header.scss';

class HideShower extends Component { 
    static id = "id";

    componentDidMount() {
        HideShower.id = this.props.id;
    }

    handleClick = e => {
        this.props.updateSelected(HideShower.id,
            this.props.selected == this.props.pageId ? -1 : this.props.pageId)
    }
    
    render() {
        return (
            <div className={style.container} onClick={this.handleClick}>
                <p>{this.props.label} {this.props.data.isProtected ? <i className="material-icons">locked</i> : ''}</p>

                <i className="material-icons">mode_edit</i>
            </div>
        );
    }
}

function mapStateToProps({ selected }, props) {
    return { selected: selected[HideShower.id] };
}

export default connect(mapStateToProps, actions)(HideShower);