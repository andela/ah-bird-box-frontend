import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import loginUser from '../actions/loginUser';


class NavigationView extends Component {
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.assign('/');
  };

  render() {
    const loggedinUser = window.localStorage.getItem('token');
    return (
      <div>
        <Menu text>
          <NavLink to="/">
            <Menu.Item name="Home" />
          </NavLink>
          <NavLink to="/register">
            <Menu.Item name="Register" />
          </NavLink>
          {loggedinUser ? (
                <div>
                <NavLink to="/getprofile">
                    <Menu.Item name="Profile" />
                  </NavLink>
                  
                  <NavLink to="/">
                    <Menu.Item onClick={this.logout} name="Logout" />
                  </NavLink>

              </div>
            ) : (
            <NavLink to="/login">
              <Menu.Item name="Login" />
            </NavLink>
          )}
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
