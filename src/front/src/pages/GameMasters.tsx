import React, {useEffect, useState} from 'react';
import {Avatar, Card, Col, Layout, Row, Select, Typography} from 'antd';
import '../App.scss';
import useLocalisationHook from '../hooks/useLocalisationHook.js';
import useGamesList from "../hooks/useGamesListHook";
import {IUser} from "../interfaces/UserInterface";
import {IGame} from "../interfaces/GameInterface";

const {Content} = Layout;
const {Title} = Typography;
const {Meta} = Card;
const { Option } = Select;

function GameMasters() {
    const [gamemastersList, setGamemastersList] = useState([]);
    const [localisation, setLocalisation] = useState('');
    const [gameId, setGameId] = useState('');
    const localisationList = useLocalisationHook();
    const listGames = useGamesList('/games/listgames');
    const listGamesTitles: IGame[] = [];

    listGames.map(game => {
        if (listGamesTitles.indexOf(game) === -1) {
            listGamesTitles.push(game);
        }
    })

    useEffect(() => {
        const fetchGameMasters = async () => {
            const response = await fetch('/users/listusers');
            const bodyUsers = await response.json();
            setGamemastersList(bodyUsers.filter((user: IUser) => user.isGameMaster));
        };
        fetchGameMasters();
    }, []);

    useEffect(() => {
        const fetchUserByGame = async () => {
            if (gameId) {
                const response = await fetch('/users/listusersbygame/' + gameId);
                const bodyUsers = await response.json();
                setGamemastersList(bodyUsers.filter((user: IUser) => user.isGameMaster));
            }
        };

        fetchUserByGame();
    }, [gameId]);

    useEffect(() => {
        const fetchGameMasters = async () => {
            const response = await fetch('/users/listusers');
            const bodyGameMasters = await response.json();

            const filteredGamemasters = bodyGameMasters.filter((user: IUser) => {
                if (localisation && user.address) {
                    const {region, departement} = user.address;
                    return (user.isGameMaster && (region === localisation || departement === localisation));
                } else {
                    return user.isGameMaster;
                }
            });

            setGamemastersList(filteredGamemasters);
        };

        fetchGameMasters();
    }, [localisation]);

    const onChangeJeu = (gameId: string) => {
        setGameId(gameId)
    }

    function onChangeCity(localisation: string) {
        setLocalisation(localisation);
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
                filterOption={(input: string, option: any) =>
                    option?.children?.filter((op: any) => op.toLowerCase() === input.toLowerCase())
                }

            >
                {listGamesTitles.map((items: IGame, k: number) => <Option key={k}
                                                           value={items._id}><b>{items.title}</b> {items.edition}
                </Option>)}
            </Select>

            <Select
                showSearch
                style={{width: 250}}
                placeholder="Select a region"
                onChange={onChangeCity}
            >
                {localisationList.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <Option key={index} value={item}>
                                <span style={{fontWeight: 'bold'}}>{item}</span>
                            </Option>
                        );
                    } else if (
                        typeof item === 'object' &&
                        item.hasOwnProperty('nom')
                    ) {
                        return (
                            <Option key={index} value={item.nom}>
                                <span>{item.nom}</span>
                            </Option>
                        );
                    } else {
                        return null;
                    }
                })}
            </Select>

            <div className="site-card-wrapper">
                {gamemastersList.map((item: IUser, k) => (
                    <Row key={k} gutter={[16, 24]}>
                        <Col span={20}>
                            <Card>
                                <Meta
                                    avatar={<Avatar src={item.profilePicture}/>}
                                    title={item.userPseudo}
                                    description={item.smallDescription}
                                />
                            </Card>
                        </Col>
                    </Row>
                ))}
            </div>
        </Content>
    );
}

export default GameMasters;
