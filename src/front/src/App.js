import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './screens/Home'
import GameMasters from './screens/GameMasters'
import Inscription from './screens/inscription/Inscription'
import Login from './screens/Login'
import addGames from './screens/AddGames'
import Details from './screens/Details'
import Games from './screens/Games'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Home}  />
          <Route path="/gm" exact component={GameMasters}  />
          <Route path="/games" exact component={Games}  />
          <Route path="/details/:id" exact component={Details}  />
          <Route path="/signup" exact component={Inscription}  />
          <Route path="/login" exact component={Login}  />
          <Route path="/addgames" exact component={addGames}  />
        </Switch>
      </Router>
  );
}


