import React, {useEffect, useState} from 'react';
import {Layout, Space, Typography} from 'antd';
import '../../App.scss';

const {Content} = Layout;
const {Title, Text} = Typography;

function Details(props) {

    const [gameTitle, setGameTitle] = useState('');
    const [gameEdition, setGameEdition] = useState('');
    const [gameGenre, setGameGenre] = useState('');
    const [gameAuthor, setGameAuthor] = useState('');

    useEffect(() => {
        const findGame = async () => {
            const data = await fetch('/games/cardsgamesbyid/' + props.match.params.id)
            let body = await data.json();
            setGameTitle(body.title);
            setGameEdition(body.edition);
            setGameGenre(body.genre);
            setGameAuthor(body.author);
        }
        findGame();
    }, []);

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
