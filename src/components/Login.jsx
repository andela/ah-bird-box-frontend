import React from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';

// This code is a modification of the sample login page from Semantic UI
const LoginView = () => (
  // Create a login view of the application
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
          Log-in to Author's Haven
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="green" fluid size="medium">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? Sign Up
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export default LoginView;
