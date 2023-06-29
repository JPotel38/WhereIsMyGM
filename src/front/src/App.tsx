import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import GameMasters from './pages/GameMasters'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddGames from './pages/AddGames'
import Details from './pages/Details'
import Games from './pages/Games'
import Nav from "./components/Nav/Nav";
import GameMasterAccount from "./pages/GameMasterAccount";
import UpdateGameMasterAccount from "./pages/UpdateGameMasterAccount";
import FooterComp from "./components/Footer/Footer";

import {Layout} from "antd";

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
                <FooterComp/>
            </Router>
        </Layout>
    );
}


