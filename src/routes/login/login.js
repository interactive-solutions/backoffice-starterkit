import React, { Component } from 'react';
import _ from 'lodash';
import { LoginForm } from 'components/forms';

export class Login extends Component { //eslint-disable-line
  constructor(props) {
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

  onSubmit = () => {};
  //  this.props.onSubmit(this.state.username, this.state.password)

  render() {
    return (
      <LoginForm
        {...this.state}
        {...(_.omit(this.props, 'onSubmit'))}
        {...this.handlers}
      />
    );
  }
}
