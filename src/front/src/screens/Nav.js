import React, {useContext} from 'react';
import {Button, Layout, Menu, Typography} from 'antd';
import {Link} from 'react-router-dom';
import '../App.css';
import {authContext} from "../AuthContext";

const {Header} = Layout;
const {Title} = Typography;

function Nav() {
    const items = [];
    const {auth, setAuthData} = useContext(authContext);

    const logout = () => {
        setAuthData(null);
    }

    if (auth.data) {
        let itemAccount =
            <Menu.Item key="account" style={{float: 'right'}}>
                <Link to='/account'>Hello</Link>
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
