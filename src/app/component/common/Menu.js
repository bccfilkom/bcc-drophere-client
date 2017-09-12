import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import map from 'lodash/map';

import * as actions from 'action';
import { MENU } from 'action/id';

import style from 'css/menu.scss';

class Menu extends Component {
    renderList = () => {
        var { data, selected, match, history } = this.props;
        
        return map(data, (listData, i) => {
            var loc = '';

            if (match) {
                if (listData.url) {
                    loc = match.path + listData.url;
                }
            }

            return (
                <ListItem
                    key={i}
                    caption={listData.caption}
                    leftIcon={listData.leftIcon}
                    rightIcon={listData.rightIcon}
                    className={selected !== null && selected == i ? style.selected : style.normal}
                    to={loc}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.props.onClick(i);
                        
                        if (loc) {
                            if (history) {
                                history.push(loc);
                            }
                        }
                    }}
                />
            );
        });
    }

    render() {
        return (
            <div className={style.container + ' wrapper'}>
                <List selectable ripple>
                    {this.renderList()}
                </List>
            </div>
        );
    }
}


function mapStateToProps({ selected }, props) {
    return { selected: selected[MENU] };
}

export default connect(mapStateToProps, actions)(Menu);