import React, { Component } from 'react';
import { LoginForm } from 'components/forms';

export class Login extends Component { //eslint-disable-line
  constructor(props, context) {
    super(props);

    this.state = {
      username: 'woopi goldberg',
      password: ''
    };
  }

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  // replace as soon as auth is in place
  onSubmit = () => { this.props.router.push('/dashboard'); };

  render() {
    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onSubmit={this.onSubmit}
        resetPassword={null}
        errorMessage={null}
      />
    );
  }
}
