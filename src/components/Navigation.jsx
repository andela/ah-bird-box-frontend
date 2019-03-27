import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Button, Dropdown } from 'semantic-ui-react';
import loginUser from '../actions/loginUser';
import './Navigation.scss';

class NavigationView extends Component {
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.assign('/');
  };

  signUp = () => {
    window.location.assign('/register');
  }

  createArticle = () => {
    window.location.assign('/article');
  }

  headHome = (event) => {
    event.preventDefault();
    window.location.assign('/');
  }

  handleProfile = (event) => {
    event.preventDefault();
    window.location.assign('/getprofile');
  }

  render() {
    const loggedinUser = window.localStorage.getItem('token');
    return (
      <React.Fragment>
        <Menu pointing secondary fixed="top" className="top-menu">
          <NavLink to="/" onClick={this.headHome}>
            <Menu.Item
              name="Author's Haven"
              className="brand"
            />
          </NavLink>

          <Menu.Menu position="right">
            {loggedinUser ? (
              <React.Fragment>
                <Menu.Item className="create-article">
                  <Button primary onClick={this.createArticle}>Create Article</Button>
                </Menu.Item>
                <Dropdown item text={window.localStorage.getItem('username')}>
                  <Dropdown.Menu>
                    <NavLink to="/getprofile" onClick={this.handleProfile}>
                      <Menu.Item name="Profile" />
                    </NavLink>
                    <NavLink to="/profiles">
                      <Menu.Item name="View authors" />
                    </NavLink>
                    <NavLink to="/">
                      <Menu.Item onClick={this.logout} name="Logout" />
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink to="/login">
                  <Menu.Item name="Login" />
                </NavLink>
                <Menu.Item>
                  <Button primary onClick={this.signUp}>Sign Up</Button>
                </Menu.Item>
              </React.Fragment>

            )}
          </Menu.Menu>
        </Menu>
        <br />
        <br />
        <br />
      </React.Fragment>
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
