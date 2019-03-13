import React, { Component } from 'react';
import './Register.scss';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Redirect } from 'react-router-dom';
import { signUpUser } from '../../actions/registerAction';

class RegisterView extends Component {
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    if (this.state.password !== this.state.confirmPassword) {
      toastr.error('Password', 'Passwords do not match');
    } else {
      this.props.signUpUser(userData);
    }
  };

  render() {
    if (this.props.register.isSignedUp === true) {
      return <Redirect to="/verifymail" />;
    }

    return (
      <div className="card w-50 signup-div">
        <div className="card-header">
          <h2 className="text-center">Sign Up</h2>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="floatLabel">
                Username
              </label>
              <input
                onChange={this.handleChange}
                id="username"
                className="form-control"
                name="username"
                type="text"
                required
              />

              <label htmlFor="Email" className="floatLabel">
                Email
              </label>
              <input
                onChange={this.handleChange}
                id="Email"
                className="form-control"
                name="email"
                type="email"
                required
              />

              <label htmlFor="password" className="floatLabel">
                Password
              </label>
              <input
                onChange={this.handleChange}
                id="password"
                className="form-control"
                name="password"
                type="password"
                required
              />

              <label htmlFor="confirm_password" className="floatLabel">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                onChange={this.handleChange}
                className="form-control"
                name="confirmPassword"
                type="password"
                required
              />

              <input
                type="submit"
                value="Sign Up"
                className="btn btn-primary btn-lg"
                id="submit"
              />
            </div>
            <span>
              Already have an account?
              {' '}
              <a href="/login">Login</a>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  register: state.register,
});

export default connect(
  mapStateToProps,
  { signUpUser },
)(RegisterView);
