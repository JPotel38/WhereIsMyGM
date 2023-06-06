import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './screens/Home'
import GameMasters from './screens/GameMasters'
import Signup from './screens/signup/Signup'
import Login from './screens/Login'
import AddGames from './screens/AddGames'
import Details from './screens/Details'
import Games from './screens/Games'
import Nav from "./screens/Nav";
import {Layout} from "antd";

const {Footer} = Layout;

export default function App() {
    return (
        <Layout className="layout">
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/gm" exact component={GameMasters}/>
                    <Route path="/games" exact component={Games}/>
                    <Route path="/details/:id" exact component={Details}/>
                    <Route path="/signup" exact component={Signup}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/addgames" exact component={AddGames}/>
                </Switch>
                <Footer style={{textAlign: 'center'}}>
                    MJ ici ©2023 Created by Jérémy Potel</Footer>
            </Router>
        </Layout>
    );
}


