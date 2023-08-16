import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Layout, Typography} from 'antd';
import '../App.scss';
import useAccess from "../hooks/useAccessHook";

const {Content} = Layout;
const {Title} = Typography;

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {access} = useAccess();

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
            <Title>Login</Title>
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

                    <Button type="primary" htmlType="submit" onClick={() => access(
                        '/access/login',
                        {'Content-Type': 'application/x-www-form-urlencoded'},
                        `email=${email}&password=${password}`
                    )}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default Login
