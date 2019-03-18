import React, { Component } from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import loginUser from '../../actions/loginUser';
import SocialAuthView from '../../views/SocialAuthView';


// This code is a modification of the sample login page from Semantic UI
class LoginView extends Component {
  // Create a login view of the application
  componentDidUpdate() {
    const { user } = this.props;
    if (user.user) {
      if (user.user.success) {
        localStorage.setItem('username', user.user.username);
        localStorage.setItem('token', user.user.token);
        window.location.assign('/');
      }
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const loginCredentials = {
      email,
      password,
    };
    const { loginUser } = this.props;
    loginUser(loginCredentials);
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div className="login-form">
        <style>
          {`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 550 }}>
            <Header as="h2" color="green" textAlign="center">
              Log-in to Author&apos;s Haven
            </Header>
            <Form>
              <Segment>
                <Header textAlign="center" as="h3">
                  <br />
                Login here
                </Header>
                <br />
                <Form.Input icon="user" iconPosition="left" name="email" placeholder="Email" type="email" onChange={this.onChange} />
                <Form.Input icon="lock" iconPosition="left" type="password" name="password" placeholder="Password" onChange={this.onChange} />

                <Button fluid content="Login" type="submit" className="ui green button" onClick={this.onSubmit} />
                <br />
              </Segment>
            </Form>
            <br />
            <p>or login with</p>
            <SocialAuthView />
            <Message>
                New to us?
              {' '}
              <a href="/register">Sign up</a>
            </Message>
          </Grid.Column>
        </Grid>
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
)(LoginView);
