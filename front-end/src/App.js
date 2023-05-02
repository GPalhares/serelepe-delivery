import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/login" component={ LoginPage } />
    </Switch>
  );
}

export default App;
