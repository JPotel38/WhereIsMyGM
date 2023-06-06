import React, {useState} from 'react';
import {Avatar, Button, Col, Form, Input, Layout, message, Row, Typography, Upload} from 'antd';
import {AntDesignOutlined} from '@ant-design/icons';
import '../../App.css';

const {Content} = Layout;
const {Title} = Typography;

function Signup() {

    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [userPseudo, setUserPseudo] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);

    let validInfos = async () => {
        await fetch('/access/inscription', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                userpseudo: userPseudo,
                profilePicture: imageUrl,
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
        });
    }

    function getBase64(img) {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        }
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoadingAvatar(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoadingAvatar(false);
            getBase64(info.file.originFileObj);
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24
            },
            sm: {
                span: 16
            },
            md: {
                span: 8
            },
            lg: {
                span: 4
            },
        },
    };

    const tailLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 4,
                offset: 10,
            },
        },
    };

    return (
        <Content style={{padding: '0 50px'}}>
            <Title>Sign Up</Title>
            <Row>
                <Col span={4} offset={10}>
                    <Avatar src={imageUrl} size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                    }}
                            icon={<AntDesignOutlined/>}/>
                </Col>
            </Row>
            <Form {...formItemLayout} >
                <Row>
                    <Col span={4} offset={10}>
                        <Upload
                            {...formItemLayout}
                            name="imageUrl"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="/access/viewpicture"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            <Button style={{marginTop: 8, marginBottom: 8}}>Upload</Button>
                        </Upload>
                    </Col>
                </Row>
                <Form.Item
                    label="Pseudo"
                    labelCol={{span: 4}}
                    name="username"
                    rules={[
                        {
                            required: true, message: 'Please enter a pseudo',
                        },
                        {
                            whitespace: true
                        }
                    ]}
                >
                    <Input onChange={(e) => setUserPseudo(e.target.value)}
                           value={userPseudo}/>
                </Form.Item>
                <Form.Item
                    label="Firstname"
                    labelCol={{span: 4}}
                    name="firstname"
                    rules={[
                        {
                            required: true, message: 'Please enter a firstname',
                        },
                        {
                            whitespace: true
                        }
                    ]}
                >
                    <Input
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstName}
                    />
                </Form.Item>
                <Form.Item
                    label="Lastname"
                    labelCol={{span: 4}}
                    name="lastname"
                    rules={[
                        {
                            required: true, message: 'Please enter a last name',
                        },
                        {
                            whitespace: true
                        }
                    ]}
                >
                    <Input onChange={(e) => setLastname(e.target.value)}
                           value={lastName}/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    labelCol={{span: 4}}
                    name="email"
                    rules={[
                        {
                            required: true, message: 'Please enter a last name',
                        },
                        {
                            whitespace: true
                        }
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)}
                           value={email}/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    labelCol={{span: 4}}
                    name="password"
                    rules={[
                        {
                            required: true, message: 'Please enter a last name',
                        },
                        {
                            whitespace: true
                        }
                    ]}
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)}
                                    value={password}/>
                </Form.Item>
                <Form.Item
                    label="PasswordConfirm"
                    labelCol={{span: 4}}
                    name="passwordConfirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true, message: 'Please enter your password',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    setPasswordConfirm(true);
                                    setIsPasswordsMatch(true);
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passord don\'t match'));
                            },
                        }),
                        {
                            whitespace: true
                        }
                    ]}
                >
                    <Input.Password onChange={(e) => setPasswordConfirm(e.target.value)}
                                    value={passwordConfirm}/>
                </Form.Item>
                <Form.Item {...tailLayout} >
                    <Button type="primary" htmlType="submit" onClick={() => validInfos()}
                            disabled={!isPasswordsMatch}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default Signup
