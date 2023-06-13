import React from 'react';
import '../../App.scss';
import {Select} from "antd";
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";

function GameMasterAccount() {

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Game Master account</Title>

            <Select
                showSearch
                style={{width: 200}}
                placeholder="Select a city"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Star Wars">Star Wars</Option>
            </Select>

        </Content>)
}

export default GameMasterAccount
