import React from 'react';
import {Card, Col, Layout, Rate, Row, Typography} from 'antd';
import '../App.scss';

const {Content} = Layout;
const {Title} = Typography;

function Home() {

    return (
        <Content style={{padding: '0 50px'}}>
            <div className="site-layout-content">
                <Row>
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
                        <Title level={2}>Role Playing Game news :</Title>
                        <Card title="Article 1" extra={<a href="#">More</a>} style={{width: 300}}>
                            <p>Content</p>
                        </Card>
                        <Card title="Article 2" extra={<a href="#">More</a>} style={{width: 300}}>
                            <p>Content</p>
                        </Card>
                        <Card title="Article 3" extra={<a href="#">More</a>} style={{width: 300}}>
                            <p>Content</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    )
}

export default Home
