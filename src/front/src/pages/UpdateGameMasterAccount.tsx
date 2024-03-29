import React, {useContext, useEffect, useState} from 'react';
import '../App.scss';
import {Button, Form, Input, List, Popconfirm, Select, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {authContext} from "../AuthContext";
import {DeleteOutlined} from "@ant-design/icons";
import {ICity} from "../interfaces/CityInterface";
import {IGame} from "../interfaces/GameInterface";
import useGamesByUserHook from "../hooks/useGamesByUserHook";

const {Text} = Typography;

function UpdateGameMasterAccount() {
    const [search, setSearch] = useState('');
    const [citiesList, setCitiesList] = useState<ICity[]>([]);
    const [city, setCity] = useState('');
    const [departement, setDepartement] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('France');
    const [listGames, setListGames] = useState([])
    const {auth, setAuthData} = useContext(authContext);
    const [form] = Form.useForm();
    const bodyGames = useGamesByUserHook('/users/gamesbyuser/');

    useEffect(() => {
        const fetchGames = async () => {
            setListGames(await bodyGames)
        };
        fetchGames();
    }, []);

    useEffect(() => {
        if (!!search) {
            const fetchCity = async () => {
                const response = await fetch(`/geolocalisation/communes?param=${search}`);
                const bodyCity = await response.json();
                setCitiesList(bodyCity);
            };
            fetchCity();
        }
    }, [search]);

    useEffect(() => {
        const selectedCity = citiesList.find((c: ICity) => c.nom === city) as ICity;

        if (selectedCity) {
            setDepartement(selectedCity.departement.nom);
            setRegion(selectedCity.region.nom);
            setPostalCode(selectedCity.code);
        }
    }, [city]);

    useEffect(() => {
        form.setFieldsValue({departement: departement});
        form.setFieldsValue({region: region});
    }, [departement, region]);

    function handleSearchCity(searchedCity: string) {
        setSearch(searchedCity);
    }

    function handleSelectCity(selectedCity: string) {
        setCity(selectedCity);
    }

    async function updatedGameList(userId: string, gameId: string) {
        await fetch('/users/deletegame/' + userId + '/' + gameId,
            {method: 'DELETE'}).then(response => {
            if (response.ok) {
                setListGames(listGames.filter((game: IGame) => game._id !== gameId));
            }
        })
    }

    async function validInfos() {
        const params = {city, departement, postalCode, region, country}
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }

        await fetch('/users/adress/' + auth.data.user._id, options);
    }

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Game Master account</Title>
            <Form
                form={form}
                name="basic"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    label="Commune"
                    name="city"
                >
                    <Select
                        showSearch
                        placeholder="Select a city"
                        optionFilterProp="children"
                        onSearch={(e) => handleSearchCity(e)}
                        onChange={(e) => handleSelectCity(e)}
                    >
                        {citiesList.map((item: ICity, index) => (
                            <Select.Option key={index} value={item.nom}>
                                {item.nom}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Département"
                    name="departement"
                >
                    <Input disabled value={departement}/>
                </Form.Item>
                <Form.Item
                    label="Région"
                    name="region"
                >
                    <Input disabled value={region}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => validInfos()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <List
                bordered
                dataSource={listGames}
                renderItem={(game: IGame) => (
                    <List.Item>
                        <Text strong>{game.title}</Text> {game.edition}
                        <Popconfirm
                            placement="right"
                            title={'Do you want to delete this game ?'}
                            onConfirm={() => {
                                updatedGameList(auth.data.user._id, game._id)
                            }
                            }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button> <DeleteOutlined/>
                            </Button>
                        </Popconfirm>
                    </List.Item>
                )}
            />
        </Content>)
}

export default UpdateGameMasterAccount
