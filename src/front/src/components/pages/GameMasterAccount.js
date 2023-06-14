import React, {useEffect, useState} from 'react';
import '../../App.scss';
import {Form, Input, Select} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

function GameMasterAccount() {
    const [search, setSearch] = useState('');
    const [communesList, setCommunesList] = useState([]);
    const [commune, setCommune] = useState('');
    const [departement, setDepartement] = useState('');
    const [region, setRegion] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchCommune = async () => {
            const response = await fetch(`/geolocalisation/communes?param=${search}`);
            const bodyCommune = await response.json();
            setCommunesList(bodyCommune);
            console.log(communesList)
        };

console.log(search)
        fetchCommune();
    }, [search]);


    useEffect(() => {
        const selectedCommune = communesList.find((c) => c.nom === commune);
        if (selectedCommune) {
            setDepartement(selectedCommune.departement.nom);
            setRegion(selectedCommune.region.nom);
        }
        setDeptAndRegInForm()
    }, [commune]);

    function setDeptAndRegInForm() {
        form.setFieldsValue({departement: departement});
        form.setFieldsValue({region: region});
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    function handleSearchCommune(value) {
        if (value) {
            setSearch(value);
        }
    }

    function handleSelectCommune(selectedCommune) {
        setCommune(selectedCommune);
    }

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Game Master account</Title>
            <Form
                {...layout}
                form={form}
                name="basic"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    label="Commune"
                    name="commune"
                >
                    <Select
                        showSearch
                        placeholder="Select a city"
                        optionFilterProp="children"
                        value={commune}
                        onSearch={(e) => handleSearchCommune(e)}
                        onChange={(e) => handleSelectCommune(e)}
                    >
                        {communesList.map((item, index) =>
                            <Select.Option key={index} value={item.nom}>
                                <span>{item.nom}</span>
                            </Select.Option>
                        )}
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
            </Form>
        </Content>)
}

export default GameMasterAccount
