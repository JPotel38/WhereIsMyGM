import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Col,
    Form,
    Input,
    Layout,
    message,
    notification,
    Row,
    Typography,
    Upload,
    UploadFile,
    UploadProps
} from 'antd';
import {AntDesignOutlined} from '@ant-design/icons';
import '../App.scss';
import {RcFile, UploadChangeParam} from "antd/es/upload";
import useAccess from "../hooks/useAccessHook";

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

    const {access} = useAccess();
    const [api, contextHolder] = notification.useNotification();

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        const blob = new Blob([img]);
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(blob);
    };

    function beforeUpload(file: RcFile) {
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

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoadingAvatar(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoadingAvatar(false);
                setImageUrl(url);
            });
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
            {contextHolder}
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
                            required: true, message: 'Please enter an email',
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
                            required: true, message: 'Please enter a password',
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
                            required: true, message: 'Please confirm your password',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    setPasswordConfirm(value);
                                    setIsPasswordsMatch(true);
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords don\'t match'));
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
                    <Button type="primary" htmlType="submit" onClick={() => access(
                        '/access/signup',
                        {'Content-Type': 'application/json'},
                        JSON.stringify({
                            firstname: firstName,
                            lastname: lastName,
                            userpseudo: userPseudo,
                            profilePicture: imageUrl,
                            email: email,
                            password: password,
                            passwordConfirm: passwordConfirm
                        })
                    )}
                            disabled={!isPasswordsMatch}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default Signup
