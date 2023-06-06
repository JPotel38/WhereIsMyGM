import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Checkbox, Form, Input, Layout, Modal, Typography} from 'antd';
import '../App.css';
import {authContext} from "../AuthContext";

const {Content} = Layout;
const {Title} = Typography;

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory()
    const {setAuthData} = useContext(authContext)

    function errorTab(error) {
        for (let i = 0; i < error.length; i++) {
            Modal.error({
                content: error[i]
            });
        }
    }

    async function validInfos() {
        const response = await fetch('/access/connexion', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        });
        const res = await response.json();
        console.log(res)
        let error = res.error
        if (error) {
            errorTab(error)
        }
        if (res.token[0]) {
            setAuthData(res.token[0]);
            history.replace('/');
        }
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Connexion</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)}
                           value={email}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)}
                                    value={password}/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>

                    <Button type="primary" htmlType="submit" onClick={() => validInfos()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default Login
