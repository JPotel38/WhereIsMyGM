import React from 'react';
import {Button, Form, Typography} from 'antd';

const {Title} = Typography;

function AddGames() {

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };

    function onFinishFailed() {

    }

    function onFinish() {

    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            <Title level={2}>Here you will be able to add a game to the database !</Title>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddGames
