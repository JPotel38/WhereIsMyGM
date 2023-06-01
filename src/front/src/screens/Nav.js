import React from 'react';
import {Button, Layout, Menu, Typography} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import '../App.css';

const {Header} = Layout;
const {Title} = Typography;

function Nav() {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'))
    const items = [];

    const logout = () => {
        localStorage.clear();
        }

    if (user != null) {

        let itemAccount =
            <Menu.Item key="account" style={{float: 'right'}}>
                <Link to='/account'>{user.userPseudo}</Link>
            </Menu.Item>

        let itemLogout =
            <Menu.Item key="logout" style={{float: 'right'}}>
                <Button
                    onClick={logout}
                > Logout
                </Button>
            </Menu.Item>

        items.push(itemAccount, itemLogout);
    } else {
        let itemConnexion =
            <Menu.Item key="login" style={{float: 'right'}}>
                <Link to='/login'>Log in</Link>
            </Menu.Item>
        let itemInscription =
            <Menu.Item key="signup" style={{float: 'right'}}>
                <Link to='/signup'>Sign up</Link>
            </Menu.Item>

        items.push(itemConnexion, itemInscription);
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
