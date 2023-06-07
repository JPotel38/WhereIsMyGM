import React, {useEffect, useState} from 'react';
import {Avatar, Card, Col, Layout, Row, Select, Typography} from 'antd';
import '../../App.css';

const {Content} = Layout;
const {Title} = Typography;
const {Option} = Select;
const { Meta } = Card;

function GameMasters() {

    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/users/listusers');
            const bodyUsers = await response.json();
            setUsersList(bodyUsers.filter(user => user.isGameMaster === true));
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
                <Option value="Chroniques Oubliées">Chroniques Oubliées</Option>
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
                {usersList.map((item, k) =>
                    <Row key={k} gutter={[16, 24]}>
                        <Col span={20}>
                            <Card>
                                <Meta
                                    avatar={<Avatar src={item.profilePicture} />}
                                    title={item.userPseudo}
                                    description={item.smallDescription}
                                />
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>
        </Content>
    )
}

export default GameMasters
