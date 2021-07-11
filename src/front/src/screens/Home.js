import React from 'react';
import {Button, Card, Col, Layout, Rate, Row, Typography} from 'antd';
import {Link} from 'react-router-dom';
import Nav from './Nav';
import '../App.css';

const {Content, Footer} = Layout;
const {Title, Text} = Typography;


function Home() {

    return (
        <Layout className="layout">
            <Nav/>
            <Content style={{padding: '0 50px'}}>
                <div className="site-layout-content">
                    <Row>
                        <Col span={18}>

                            <Text>I'm looking for ... </Text>
                            <Button shape="round">
                                <Link to="/users">An awesome Game Master !</Link></Button>
                            <Button shape="round"><Link to="/games">An amazing game !</Link></Button>
                        </Col>
                        <Col span={6}>
                            <Title level={2}>Latest Review</Title>
                            <Card size="small" title="BobGM" extra={<a href="#">More</a>} style={{width: 200}}>
                                <p>Bob is a very talented GM !</p>
                                <p>By RandomPlayer38</p>
                                <Rate disabled defaultValue={5}/>
                            </Card>
                        </Col>

                    </Row>

                    <Row>
                        <Col span={18}>
                            <Title lvl={2}>Role Playing Game news :</Title>
                            <Card title="Default size card" extra={<a href="#">More</a>} style={{width: 300}}>
                                <p>Content</p>
                            </Card>
                            <Card title="Default size card" extra={<a href="#">More</a>} style={{width: 300}}>
                                <p>Content</p>
                            </Card>
                            <Card title="Default size card" extra={<a href="#">More</a>} style={{width: 300}}>
                                <p>Content</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>MJ ici ©2020 Created by Jérémy Potel</Footer>
        </Layout>
    )
}

export default Home