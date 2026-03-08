import React, {useEffect, useState} from 'react';
import '../App.scss';
import {Link} from "react-router-dom";
import {IGame} from "../interfaces/GameInterface";
import useGamesByUserHook from "../hooks/useGamesByUserHook";

function GameMasterAccount() {
    const [listGames, setListGames] = useState([])
    const bodyGames = useGamesByUserHook('/users/gamesbyuser/')

    useEffect(() => {
        const fetchGames = async () => {
            setListGames(await bodyGames);
        };
        fetchGames();
    }, []);

    // return (<Content style={{padding: '0 50px'}}>
    //     <Title>Vos annonces</Title>
    //     <List
    //         header={<Title level={3}>Jeux</Title>}
    //         bordered
    //         dataSource={listGames}
    //         renderItem={(item: IGame) => (
    //             <List.Item>
    //                 {item.title} {item.edition}
    //             </List.Item>
    //         )}
    //     />
    //     <Button><Link to="/updategmaccount">Modifier</Link></Button>
    // </Content>)
}

export default GameMasterAccount
