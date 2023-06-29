import React, {useEffect, useState} from 'react';
import '../App.scss';
import {Button, List} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {IGame} from "../interfaces/GameInterface";
import useGamesByUserHook from "../hooks/useGamesByUser";

function GameMasterAccount() {
    const [listGames, setListGames] = useState([])
    const bodyGames = useGamesByUserHook('/users/gamesbyuser/')

    useEffect(() => {
        const fetchGames = async () => {
            setListGames(await bodyGames)
        };
        fetchGames();
    }, []);

    return (<Content style={{padding: '0 50px'}}>
        <Title>Game Master Account</Title>
        <List
            header={<div>Your Games</div>}
            bordered
            dataSource={listGames}
            renderItem={(item: IGame) => (
                <List.Item>
                    {item.title} {item.edition}
                </List.Item>
            )}
        />
        <Button><Link to="/updategmaccount">Modifier</Link></Button>
    </Content>)
}

export default GameMasterAccount
