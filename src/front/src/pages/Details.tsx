import React, {useEffect, useState} from 'react';
import {Layout, Space, Typography} from 'antd';
import '../App.scss';
import {useParams} from "react-router-dom";
import useGameDetailsHook from "../hooks/useGameDetailsHook";

const {Content} = Layout;
const {Title, Text} = Typography;

function Details() {

    const {id} = useParams<{ id: string }>();
    const [gameTitle, setGameTitle] = useState('');
    const [gameEdition, setGameEdition] = useState('');
    const [gameGenre, setGameGenre] = useState('');
    const [gameAuthor, setGameAuthor] = useState('');
    const gameDetails = useGameDetailsHook(id)

    useEffect(() => {
        const findGame = async () => {
            const {title, edition, genre, author} = await gameDetails;
            setGameTitle(title);
            setGameEdition(edition);
            setGameGenre(genre);
            setGameAuthor(author);
        }
        findGame();
    }, [id]);

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>{gameTitle}</Title>
            <Space direction="vertical">
                <Text strong>Genre:</Text><Text>{gameEdition}</Text>
                <Text strong>Edition:</Text><Text> {gameGenre}</Text>
                <Text strong>Author:</Text><Text> {gameAuthor}</Text>
            </Space>
            <Title level={3}>Why is it fun ?</Title>
        </Content>
    )
}

export default Details;
