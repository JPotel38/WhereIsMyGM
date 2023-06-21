import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Layout, List, Select, Typography} from 'antd';
import {FaDiceD20} from "react-icons/fa";
import {Link} from "react-router-dom";
import '../../App.scss';
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {authContext} from "../../AuthContext";
import useGamesList from "../../hooks/useGamesHook";

const {Content} = Layout;
const {Title} = Typography;
const {Option} = Select;

function Games(props) {
    const [random, setRandom] = useState([]);
    const [gameIsSelected, setGameIsSelected] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const {auth, setAuthData} = useContext(authContext);
    const [url, setUrl] = useState('')
    const listGames = useGamesList('/games/listgames');
    const filteredListGames = useGamesList(url);
    const listGamesTitles = [];

    useEffect(() => {
        setUrl('/games/listgames')
    }, []);

    listGames.map(game => {
        if (listGamesTitles.indexOf(game.title) === -1) {
            listGamesTitles.push(game.title);
        }
    })


    const onChangeJeu = (value) => {
        setGameIsSelected(true);
        setUrl(`/games/cardsgamesbytitle?title=${value}`);
    }

    const onChangeGenre = (value) => {
        setGameIsSelected(true);
        setUrl(`/games/cardsgamesbygenre?genre=${value}`)
    }

    const randomGame = () => {
        let number = Math.floor(Math.random() * listGames.length);
        setRandom([listGames[number]]);
        setIsRandom(true)
    }

    const clearButton = async () => {
        setRandom([]);
        setIsRandom(false);
        setGameIsSelected(false);
        setUrl('/games/listgames')
    }

    const onChangePaginationSize = () => {
        props.pageSizeOptions = null;
    }

    async function addGame(gameId) {
        await fetch(`/users/addgame/${auth.data.user._id}/${gameId}`, {
            method: 'POST',
        });
    }

    return (<Content style={{padding: '0 50px'}}>
        <Title>Games</Title>
        <Select
            showSearch
            style={{width: 400}}
            placeholder="Select a game"
            optionFilterProp="children"
            onChange={onChangeJeu}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {listGamesTitles.map((items, k) => <Option key={k} value={items}>{items}</Option>)}
        </Select>
        <Select
            showSearch
            style={{width: 200}}
            placeholder="Select a type"
            optionFilterProp="children"
            onChange={onChangeGenre}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
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
                onChange={onChangePaginationSize}
                loading={filteredListGames.length === 0}
                pagination={{
                    pageSize: 9
                }}
                dataSource={isRandom ? random : filteredListGames}
                renderItem={item => (<List.Item key={item.title}>
                    <Card title={item.title}>
                        <p>Edition : {item.edition}</p>
                        <p>Genre : {item.genre}</p>
                        <Button> <Link to={`/games/details/${item._id}`}>
                            <SearchOutlined/>Details</Link></Button>
                        {auth?.data?.user?.isGameMaster ? <Button
                            onClick={() => addGame(item._id)}><Link><PlusOutlined/></Link></Button> : null}
                    </Card>
                </List.Item>)}
            />
        </div>
    </Content>)
}

export default Games;
