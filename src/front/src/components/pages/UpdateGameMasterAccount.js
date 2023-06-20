import React, {useContext, useEffect, useState} from 'react';
import '../../App.scss';
import {Button, Form, Input, List, Popconfirm, Select, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {authContext} from "../../AuthContext";
import {DeleteOutlined} from "@ant-design/icons";

const {Text} = Typography;

function UpdateGameMasterAccount() {
    const [search, setSearch] = useState('');
    const [citiesList, setCitiesList] = useState([]);
    const [city, setCity] = useState(null);
    const [departement, setDepartement] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('France');
    const [listGames, setListGames] = useState([])
    const {auth, setAuthData} = useContext(authContext);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/users/gamesbyuser/' + auth.data.user._id);
            const bodyGames = await response.json();
            setListGames(bodyGames.listGames)
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
        const selectedCity = citiesList.find((c) => c.nom === city);
        setDepartement(selectedCity?.departement.nom);
        setRegion(selectedCity?.region.nom);
        setPostalCode(selectedCity?.code);
    }, [city]);

    useEffect(() => {
        form.setFieldsValue({departement: departement});
        form.setFieldsValue({region: region});
    }, [departement, region]);

    function handleSearchCity(value) {
        setSearch(value);
    }

    function handleSelectCity(selectedCity) {
        setCity(selectedCity);
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

        const response = await fetch('/users/adress/' + auth.data.user._id, options);
        const adressResp = await response.json();
    }

    const confirm = async (value) => {
        const response = await fetch('/users/deletegame/' + auth.data.user._id + '/' + value._id,
            {method: 'DELETE'});
        const bodyGames = await response.json();
        setListGames(bodyGames);
    };

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
                        value={city}
                        onSearch={(e) => handleSearchCity(e)}
                        onChange={(e) => handleSelectCity(e)}
                    >
                        {citiesList.map((item, index) => (
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


                <Form.Item
                    label="Games management"
                    name="games"
                >
                    <List
                        bordered
                        dataSource={listGames}
                        renderItem={(item) => (
                            <List.Item>
                                <Text strong>{item.title}</Text> {item.edition}
                                <Popconfirm
                                    placement="right"
                                    title={'Do you want to delete this game ?'}
                                    onConfirm={() => confirm(item)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button> <DeleteOutlined/>
                                    </Button>
                                </Popconfirm>
                            </List.Item>
                        )}
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => validInfos()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>)
}

export default UpdateGameMasterAccount
