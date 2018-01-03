import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { LoginForm } from 'components/forms';
import { authenticationService } from 'api';
import { SubmissionError } from 'redux-form';

export class Login extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  };

  // replace as soon as auth is in place
  onSubmit = (values) => {
    return authenticationService.login({ username: values.username, password: values.password })
      .then((response) => this.props.push('/dashboard'))
      .catch((e) => { throw new SubmissionError({ _error: 'Login failed!' }); }
      );
  }

  render() {
    return (
      <Grid
        textAlign="center"
        className="login-container"
        verticalAlign="middle"
      >
        <Grid.Column className="center-grid">
          <LoginForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
