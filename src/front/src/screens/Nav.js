import React, {useContext} from 'react';
import {Button, Dropdown, Image, Layout, Menu, Typography} from 'antd';
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

    if (auth.data.user) {

        const accountMenu = (
            <Menu>
                <Menu.Item key='0'>
                    <Link to='/account'>Account</Link>
                </Menu.Item>
                <Menu.Item key='1'>
                    <Button onClick={logout}>Logout</Button>
                </Menu.Item>
            </Menu>
        );

        let itemAccount =
            <Dropdown overlay={accountMenu}
                      trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Image className='accountProfilePicture'
                           width={35}
                           src={auth.data.user.profilePicture}
                    />
                </a>
            </Dropdown>
        items.push(itemAccount);
    } else {
        let itemConnexion =
            <Menu.Item key="login">
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
                <Menu.Item key="1">
                    <Title>
                        <Link to="/">WhereIsMyGM?</Link>
                    </Title>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to='/gm'>Game Masters</Link>
                </Menu.Item>
                <Menu.Item key="11">
                    <Link to='/games'>Games</Link>
                </Menu.Item>
                {items}
            </Menu>
        </Header>
    )
}

export default Nav
