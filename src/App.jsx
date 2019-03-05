import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './views/HomeView';
import Login from './views/LoginView';
import Navigation from './views/NavigationView';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path ="/" component={Home}/>
            <Route path ="/login" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
