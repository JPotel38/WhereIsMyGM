import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Checkbox, Form, Input, Layout, Modal, Typography} from 'antd';
import '../App.css';
import Nav from './Nav';

const {Content, Footer} = Layout;
const {Title} = Typography;

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let response;

    const history = useHistory()

    function errorTab(error) {
        for (let i = 0; i < error.length; i++) {
            Modal.error({
                content: error[i]
            });
        }
    }

    let validInfos = async () => {
        let data = await fetch('/users/connexion', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        });
        response = await data.json();
        let error = response.error
        if (error) {
            errorTab(error)
        }
        if (response) {
            localStorage.setItem("user", JSON.stringify(response.user));
            history.goBack()
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
        <Layout className="layout">
            <Nav/>
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
                        label="email"
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
            <Footer style={{textAlign: 'center'}}>MJ ici ??2020 Created by J??r??my Potel</Footer>
        </Layout>
    )
}

export default Login