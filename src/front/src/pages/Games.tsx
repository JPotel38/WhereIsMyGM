import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Layout, List, Select, Typography} from 'antd';
import {FaDiceD20} from "react-icons/fa";
import {Link} from "react-router-dom";
import '../App.scss';
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {authContext} from "../AuthContext";
import useGamesList from "../hooks/useGamesListHook";
import {IGame} from "../interfaces/GameInterface";
import {IUser} from "../interfaces/UserInterface";
import useAddGameByIdByUser from "../hooks/useAddGameByIdByUserHook";

const {Content} = Layout;
const {Title} = Typography;
const {Option} = Select;

function Games() {
    const [random, setRandom] = useState([]);
    const [gameIsSelected, setGameIsSelected] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const {auth, setAuthData} = useContext(authContext);
    const [url, setUrl] = useState('/games/listgames/');
    const [user, setUser] = useState<IUser>({} as IUser);
    const [gameId, setGameId] = useState('');
    const [gameToAdd, setGameToAdd] = useState('')
    const filteredListGames = useGamesList(url);
    useAddGameByIdByUser(gameToAdd);
    const listGamesTitles: any[] = [];

    useEffect(() => {
        if (auth.data) {
            setUser(auth.data.user);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (gameId) {
                setGameToAdd(`/users/addgame/${user._id}/${gameId}`)
            }
        };
        fetchData();
    }, [gameId]);


    filteredListGames.map((game: IGame) => {
        if (listGamesTitles.indexOf(game.title) === -1) {
            listGamesTitles.push(game.title);
        }
    })

    const onChangeJeu = (value: string) => {
        setGameIsSelected(true);
        setUrl(`/games/cardsgamesbytitle?title=${value}`);
    }

    const onChangeGenre = (value: string) => {
        setGameIsSelected(true);
        setUrl(`/games/cardsgamesbygenre?genre=${value}`)
    }

    const randomGame = () => {
        let number = Math.floor(Math.random() * filteredListGames.length);
        setRandom([filteredListGames[number]]);
        setIsRandom(true)
    }

    const clearButton = async () => {
        setRandom([]);
        setIsRandom(false);
        setGameIsSelected(false);
        setUrl('/games/listgames')
    }

    async function addGame(gameId: string) {
        setGameId(gameId)
    }

    return (<Content style={{padding: '0 50px'}}>
        <Title>Games</Title>
        <Select
            showSearch
            style={{width: 400}}
            placeholder="Select a game"
            onChange={onChangeJeu}
            filterOption={(input: string, option: any) =>
                option?.children?.includes(input.toLowerCase())
            }>
            {listGamesTitles.map((items, k) => <Option key={k} value={items}>{items}</Option>)}
        </Select>
        <Select
            showSearch
            style={{width: 200}}
            placeholder="Select a genre"
            optionFilterProp="children"
            onChange={onChangeGenre}
            filterOption={(input: string, option: any) =>
                option?.children?.filter((op: any) => op.toLowerCase() === input.toLowerCase())
            }>
            <Option value="Fantasy">Fantasy</Option>
            <Option value="Fantastique">Fantastic</Option>
            <Option value="Historique">Historical</Option>
            <Option value="Horreur">Horror</Option>
            <Option value="Science-Fiction">Science-Fiction</Option>
            <Option value="Space-Opera">Space-Opera</Option>
        </Select>
        <Button onClick={randomGame}><FaDiceD20/> Random game</Button>
        {random.length === 1 || gameIsSelected ? <Button onClick={clearButton}>Clear</Button> : null}
        <div className="site-card-wrapper">
            <List
                grid={{
                    gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 4
                }}
                itemLayout="vertical"
                size="large"
                loading={filteredListGames.length === 0}
                pagination={{
                    pageSize: 12
                }}
                dataSource={isRandom ? random : filteredListGames}
                renderItem={(item: IGame) => (<List.Item key={item.title}>
                    <Card title={item.title}>
                        <p>Edition : {item.edition}</p>
                        <p>Genre : {item.genre}</p>
                        <Button> <Link to={`/details/${item._id}`}>
                            <SearchOutlined/>Details</Link></Button>
                        {auth?.data?.user?.isGameMaster ? <Button
                            onClick={() => addGame(item._id)}><PlusOutlined/></Button> : null}
                    </Card>
                </List.Item>)}
            />
        </div>
    </Content>)
}

export default Games;
