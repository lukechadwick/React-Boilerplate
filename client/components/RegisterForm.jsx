import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser, registerError } from '../actions/register';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const creds = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim()
    };
    this.props.registerUser(creds);
  };

  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <form name="SignUp" action="/api/v1/auth/register" method="POST">
        <h3>Sign up below</h3>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter username"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleClick} className="btn btn-primary">
          Sign Up
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: creds => {
      return dispatch(registerUser(creds));
    },
    registerError: message => {
      dispatch(registerError(message));
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
