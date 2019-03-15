import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import loginUser from '../actions/loginUser';

// This code is a modification of the sample login page from Semantic UI
// eslint-disable-next-line react/prefer-stateless-function
class NavigationView extends Component {
  // Create a Navigation view of the application
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.assign('/');
  }

  render() {
    const loggedinUser = window.localStorage.getItem('token');
    return (
      <div>
        <Menu text>
          <NavLink to="/">
            <Menu.Item name="Home" />
          </NavLink>
          {loggedinUser
            ? (
              <NavLink to="/">
                <Menu.Item onClick={this.logout} name="Logout" />
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Menu.Item name="Login" />
              </NavLink>
            )}
          <NavLink to="/register">
            <Menu.Item name="Register" />
          </NavLink>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
});
export default connect(
  mapStateToProps,
  { loginUser },
)(NavigationView);
