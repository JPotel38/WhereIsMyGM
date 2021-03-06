import React, {useEffect, useState} from 'react';
import {Card, Col, Layout, Row, Select, Typography} from 'antd';
import '../App.css';
import Nav from './Nav';

const {Content, Footer} = Layout;
const {Title} = Typography;
const {Option} = Select;

function GameMasters() {

    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/users/listusers');
            const bodyUsers = await response.json();
            setUsersList(bodyUsers);
        }
        fetchUsers()
    }, [])


    function onChangeJeu(value) {
        console.log(`selected ${value}`);
    }

    function onBlurJeu() {
        console.log('blur');
    }

    function onFocusJeu() {
        console.log('focus');
    }

    function onSearchJeu(val) {
        console.log('search:', val);
    }

    function onChangeVille(value) {
        console.log(`selected ${value}`);
    }

    function onBlurVille() {
        console.log('blur');
    }

    function onFocusVille() {
        console.log('focus');
    }

    function onSearchVille(val) {
        console.log('search:', val);
    }

    return (
        <Layout className="layout">
            <Nav/>
            <Content style={{padding: '0 50px'}}>
                <Title>Game Masters</Title>

                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a game"
                    optionFilterProp="children"
                    onChange={onChangeJeu}
                    onFocus={onFocusJeu}
                    onBlur={onBlurJeu}
                    onSearch={onSearchJeu}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Star Wars">Star Wars</Option>
                    <Option value="Pathfinder">Pathfinder</Option>
                    <Option value="Chroniques Oubli??es">Chroniques Oubli??es</Option>
                </Select>

                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a city"
                    optionFilterProp="children"
                    onChange={onChangeVille}
                    onFocus={onFocusVille}
                    onBlur={onBlurVille}
                    onSearch={onSearchVille}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="Paris">Paris</Option>
                    <Option value="Lyon">Lyon</Option>
                    <Option value="Lille">Lille</Option>
                </Select>
                <div className="site-card-wrapper">
                    {usersList.map(item =>
                        <Row gutter={[16, 24]}>
                            <Col span={20}>
                                <Card title={item.username}>
                                    <p>Games I propose :</p>
                                    {item.games.map((game) =>
                                        <p>{game.title}</p>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>MJ ici ??2020 Created by J??r??my Potel</Footer>
        </Layout>
    )
}

export default GameMasters