/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './views/HomeView';
import LoginView from './components/login/Login';
import NavigationView from './components/Navigation';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavigationView />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
