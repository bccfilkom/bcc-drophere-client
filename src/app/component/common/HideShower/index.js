import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'action';

import HideShowerHeader from './HideShowerHeader';
import HideShowerContent from './HideShowerContent';

class HideShower extends Component { 
    static id = "id";

    componentDidMount() {
        HideShower.id = this.props.id;
    }

    render() {
        return (
            <div style={{marginBottom: 10, animationDelay: this.props.index * .1 + 's'}} className="list-anim">
            <HideShowerHeader {...this.props} />
            <HideShowerContent {...this.props} />
            </div>
        );
    }
}

function mapStateToProps({ selected }, props) {
    return { selected: selected[HideShower.id] };
}

export default connect(mapStateToProps, actions)(HideShower);