import React, { Component } from 'react';
import style from 'css/account-support';
import Input from 'react-toolbox/lib/input';
import { Button, IconButton } from 'react-toolbox/lib/button';
import theme1 from 'css/common-button.scss';
import theme2 from 'css/rtb-danger-button.scss';

export default class Support extends Component {
    state = {
        message:'',
    }

    handleChange = (message, value) => {   
        this.setState({[message]: value})
    }

    render() {
        return (
            <div className={style.container + ' opening-transition'}>
                <h1>Support</h1>
                <Input
                    type="text"
                    label="Message"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this, 'message')}
                    multiline
                    maxLength={500}
                    rows={5}
                />
                <div className={style['button-wrapper']} style={{marginBottom: 40}}>
                    <Button type="submit" theme={theme1} icon="send" label="Send" raised primary />
                </div>
            </div>
        );
    }
}