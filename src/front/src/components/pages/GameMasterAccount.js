import React from 'react';
import '../../App.scss';
import {Button} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";

function GameMasterAccount() {

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Game Master Account</Title>
            <Button><Link to="/signupGM">Modifier</Link></Button>
        </Content>)
}

export default GameMasterAccount
