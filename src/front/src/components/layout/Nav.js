import React, {useContext} from 'react';
import {Button, Dropdown, Layout, Menu, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {UserOutlined} from '@ant-design/icons';
import {authContext} from '../../AuthContext';
import './Nav.scss';

const {Header} = Layout;
const {Title} = Typography;

function Nav() {
    const {auth, setAuthData} = useContext(authContext);

    const logout = () => {
        setAuthData(null);
    };

    const menu = (<Menu>
        <Menu.Item key="1"><Link to="/account">Account</Link></Menu.Item>
        <Menu.Item key="2"> <Button onClick={logout}>Logout</Button></Menu.Item>
    </Menu>);

    return (<Header>
        <Menu mode="horizontal" style={{width: '100%'}}>
            <Menu.Item key="0">
                <Title>
                    <Link to="/">WhereIsMyGM?</Link>
                </Title>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to="/gm">Game Masters</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/games">Games</Link>
            </Menu.Item>
            {auth.data?.user?.isGameMaster ? <>
                <Menu.Item key="4" className="nav-link">
                    <Button><Link to="/gmaccount">GM account</Link></Button>
                </Menu.Item>
            </> : (<>
                <Menu.Item key="4" className="nav-link">
                    <Button><Link to="/signupGM">Becoming a GM</Link></Button>
                </Menu.Item>
            </>)}
            {auth.data.user ? (<Menu.Item key="3" className="account-dropdown" style={{float: 'right'}}>
                <Dropdown overlay={menu} trigger={['click']}>
              <span>
                <UserOutlined/>
              </span>
                </Dropdown>
            </Menu.Item>) : (<>
                <Menu.Item key="5" className="nav-link" style={{float: 'right'}}>
                    <Link to="/login">Log in</Link>
                </Menu.Item>
                <Menu.Item key="6" className="nav-link" style={{float: 'right'}}>
                    <Link to="/signup">Sign up</Link>
                </Menu.Item>
            </>)}
        </Menu>
    </Header>);
}

export default Nav;
