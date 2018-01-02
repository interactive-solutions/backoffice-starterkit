import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { LoginForm } from 'components/forms';
import { authenticationService } from 'api';

export class Login extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  };

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
  onSubmit = () => {
    authenticationService.login({ username: this.state.username, password:this.state.password })
      .then((response) => this.props.push('/dashboard'))
      .catch((e) => console.warn(e));
  };
  // this.props.router.push('/dashboard'); };

  render() {
    return (
      <Grid
        textAlign="center"
        className="login-container"
        verticalAlign="middle"
      >
        <Grid.Column className="center-grid">
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            onSubmit={this.onSubmit}
            resetPassword={null}
            errorMessage={null}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
