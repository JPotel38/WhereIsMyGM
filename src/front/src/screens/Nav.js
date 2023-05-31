import React from 'react';
import {Button, Layout, Menu, Typography} from 'antd';
import {Link} from 'react-router-dom';
import '../App.css';

const {Header} = Layout;
const {Title} = Typography;

function Nav() {
    let user = JSON.parse(localStorage.getItem('user'))
    let items;

    if (user != null) {

        let itemCompte =
            <Menu.Item key="7" style={{float: 'right'}}>
                <Link to='/account'>{user.username}</Link>
            </Menu.Item>

        let itemLogout =
            <Menu.Item key="12" style={{float: 'right'}}>
                <Button
                    onClick={() => localStorage.clear()}
                > Logout
                </Button>
            </Menu.Item>
        items = [itemLogout, itemCompte];
    } else {
        let itemConnexion =
            <Menu.Item key="5" style={{float: 'right'}}>
                <Link to='/login'>Log in</Link>
            </Menu.Item>
        let itemInscription =
            <Menu.Item key="6" style={{float: 'right'}}>
                <Link to='/signup'>Sign up</Link>
            </Menu.Item>

        items = [itemConnexion, itemInscription]
    }

    return (
        <Header>
            <Menu mode="horizontal" style={{width: "100%"}}>
                <Menu.Item key="1"><Title><Link to="/">WhereIsMyGM?</Link></Title></Menu.Item>
                <Menu.Item key="10"><Link to='/gm'>Game Masters</Link></Menu.Item>
                <Menu.Item key="11"><Link to='/games'>Games</Link></Menu.Item>
                {items}
            </Menu>
        </Header>
    )
}

export default Nav
