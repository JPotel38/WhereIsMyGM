import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Layout, Row, Select, Typography} from 'antd';
import '../App.scss';
import useLocalisationHook from '../hooks/useLocalisationHook.js';
import useGamesListHook from "../hooks/useGamesListHook";
import {IUser} from "../interfaces/UserInterface";
import {IGame} from "../interfaces/GameInterface";
import useGameMastersListHook from "../hooks/useGameMastersListHook.";
import useListUsersByGameHook from "../hooks/useListUsersByGameHook";

const {Content} = Layout;
const {Title} = Typography;
const {Meta} = Card;
const {Option} = Select;

function GameMasters() {
    const [gamemastersList, setGamemastersList] = useState([]);
    const [isGameSelected, setIsGameSelected] = useState(false);
    const [localisation, setLocalisation] = useState('');
    const [gameId, setGameId] = useState('');
    const localisationList = useLocalisationHook();
    const gmList = useGameMastersListHook('/users/listusers');
    const listGames = useGamesListHook('/games/listgames');
    const listUsersByGame = useListUsersByGameHook(gameId);
    const listGamesTitles: IGame[] = [];

    listGames.map(game => {
        if (listGamesTitles.indexOf(game) === -1) {
            listGamesTitles.push(game);
        }
    })

    useEffect(() => {
        const fetchGameMasters = async () => {
            setGamemastersList(await gmList);
        };
        fetchGameMasters();
    }, []);

    useEffect(() => {
        const fetchUserByGame = async () => {
            if (gameId) {
                setGamemastersList(await listUsersByGame);
            }
        };
        fetchUserByGame();
    }, [gameId]);

    useEffect(() => {
        const fetchGameMasters = async () => {
            setGamemastersList(await listUsersByGame);
            const filteredGamemasters = gamemastersList.filter((user: IUser) => {
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
        setGameId(gameId);
        if (gameId) {
            setIsGameSelected(true)
        }
    }

    function onChangeCity(localisation: string) {
        setLocalisation(localisation);
    }

    async function clearButton() {
        setIsGameSelected(false);
        setGamemastersList(await gmList);
        setGameId('');
    }

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Game Masters</Title>

            <Select
                showSearch
                style={{width: 600}}
                placeholder="Sélectionnez un jeu"
                optionFilterProp="children"
                onChange={onChangeJeu}
                filterOption={true}
            >
                {listGamesTitles.map((item: IGame, index: number) => (
                    <Option key={index} value={item._id}>
                        <b>{item.title}</b> {item.edition}
                    </Option>
                ))}
            </Select>

            <Select
                showSearch
                style={{width: 250}}
                placeholder="Select a localisation"
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
            {isGameSelected ? <Button onClick={clearButton}>Clear</Button> : null}

            <div className="site-card-wrapper">
                <Row gutter={16}>
                    {gamemastersList.map((item: IUser) => (
                        <Col span={7}>
                            <Card>
                                <Meta
                                    avatar={<Avatar src={item.profilePicture}/>}
                                    title={item.userPseudo + " de " + item.address.city + " en " + item.address.departement + " (" + item.address.region + ")"}
                                    description={item.smallDescription}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Content>
    );
}

export default GameMasters;
