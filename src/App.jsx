import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './views/HomeView';
import LoginView from './components/login/Login';
import NavigationView from './components/Navigation';

import Register from './components/register/Register';
import verifyMail from './components/register/verifyEmail';
import verify from './components/register/verify';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationView />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/verifymail" component={verifyMail} />
            <Route exact path="/verify/:token" component={verify} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default connect()(App);
