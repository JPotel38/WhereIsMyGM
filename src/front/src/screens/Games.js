import React, {useEffect, useState} from 'react';
import {Button, Card, Layout, List, Select, Typography} from 'antd';
import {FaDiceD20, FaInfoCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import '../App.css';

const {Content} = Layout;
const {Title} = Typography;
const {Option} = Select;

function Games(props) {
    const [listGames, setListGames] = useState([]);
    const [random, setRandom] = useState([]);
    const [gameIsSelected, setGameIsSelected] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    let listGamesTitles = [];

    useEffect(() => {
        const findGames = async () => {
            const uri = '/listgames';
            await fetchGameList(uri);
        }
        findGames();
    }, []);

    listGames.forEach(game => {
        if (listGamesTitles.indexOf(game.title) === -1) {
            listGamesTitles.push(game.title);
        }
    })

    const fetchGameList = async uri => {
        let data = await fetch(uri);
        let body = await data.json();
        setListGames(body.sort((a, b) => {
            const x = a.title.toLowerCase();
            const y = b.title.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        }))
    }

    const onChangeJeu = async value => {
        setGameIsSelected(true);
        const uri = `/cardsgamesbytitle?title=${value}`;
        await fetchGameList(uri);
    }

    const onChangeGenre = async value => {
        const uri = `/cardsgamesbygenre?genre=${value}`;
        await fetchGameList(uri);
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
        const uri = '/listgames';
        await fetchGameList(uri);
    }

    const onChangePaginationSize = () => {
        props.pageSizeOptions = null;
    }

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Games</Title>
            <Select
                showSearch
                style={{width: 400}}
                placeholder="Select a game"
                optionFilterProp="children"
                onChange={onChangeJeu}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {listGamesTitles.map(items =>
                    <Option value={items}>{items}</Option>)}
            </Select>
            <Select
                showSearch
                style={{width: 200}}
                placeholder="Select a type"
                optionFilterProp="children"
                onChange={onChangeGenre}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Fantasy">Fantasy</Option>
                <Option value="Fantastique">Fantastic</Option>
                <Option value="Historique">Historical</Option>
                <Option value="Horreur">Horror</Option>
                <Option value="Science-Fiction">Science-Fiction</Option>
                <Option value="Space-Opera">Space-Opera</Option>
            </Select>
            <Button onClick={randomGame}><FaDiceD20/> Random game</Button>
            {
                random.length === 1 ? <Button onClick={clearButton}> Clear</Button>
                    : gameIsSelected ? <Button onClick={clearButton}> Clear</Button>
                        : null
            }
            <div className="site-card-wrapper">
                <List
                    grid={{
                        gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 4
                    }}
                    itemLayout="vertical"
                    size="large"
                    onChange={onChangePaginationSize}
                    loading={listGames.length === 0}
                    pagination={{
                        pageSize: 15,
                        pageSizeOptions: random.length ? false :
                            listGames.length < 11 ? false : [10, 20, 50, 100]
                    }}
                    dataSource={isRandom ? random : listGames}
                    renderItem={item => (
                        <List.Item key={item.title}>
                            <Card title={item.title}>
                                <Link to={`/details/${item._id}`}>
                                    <FaInfoCircle/>
                                </Link>
                                <p>Edition : {item.edition}</p>
                                <p>Genre : {item.genre}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </Content>
    )
}

export default Games;
