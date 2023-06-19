import React, {useContext, useEffect, useState} from 'react';
import '../../App.scss';
import {Button, List} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {authContext} from "../../AuthContext";

function GameMasterAccount() {
    const {auth, setAuthData} = useContext(authContext);
    const [listGames, setListGames] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
            if (auth.data.user) {
                const response = await fetch('/users/gamesbyuser/' + auth.data.user._id);
                const bodyGames = await response.json();
                setListGames(bodyGames.listGames)
            }
        };
        fetchGames();
    }, []);

    return (<Content style={{padding: '0 50px'}}>
        <Title>Game Master Account</Title>
        <List
            header={<div>Your Games</div>}
            bordered
            dataSource={listGames}
            renderItem={(item) => (
                <List.Item>
                    {item.title} {item.edition}
                </List.Item>
            )}
        />
        <Button><Link to="/updategmaccount">Modifier</Link></Button>
    </Content>)
}

export default GameMasterAccount
