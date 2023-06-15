import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import GameMasters from './components/pages/GameMasters'
import Signup from './components/pages/Signup'
import Login from './components/pages/Login'
import AddGames from './components/pages/AddGames'
import Details from './components/pages/Details'
import Games from './components/pages/Games'
import Nav from "./components/layout/Nav";
import GameMasterAccount from "./components/pages/GameMasterAccount";
import UpdateGameMasterAccount from "./components/pages/UpdateGameMasterAccount";

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
                    <Route path="/gmaccount" exact component={GameMasterAccount}/>
                    <Route path="/updategmaccount" exact component={UpdateGameMasterAccount}/>
                </Switch>
                <Footer style={{textAlign: 'center'}}>
                    MJ ici ©2023 Created by Jérémy Potel</Footer>
            </Router>
        </Layout>
    );
}


