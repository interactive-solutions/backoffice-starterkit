import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { LoginForm } from 'components/forms';
import { authenticationService } from 'api';
import { getDefaultErrorMessage } from 'utils/errorMessages';

function getErrorMessage(exception) {
  const { response } = exception;
  if (response) {
    const { status } = response;
    switch (status) {
      case 400: // Bad request
        return response.data.error_description;
    }
  }
  return getDefaultErrorMessage(exception);
};

export class Login extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    resolveUser: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  };

  // replace as soon as auth is in place
  onSubmit = (values) => {
    return authenticationService.login({ username: values.username, password: values.password })
      .then((response) => {
        this.props.resolveUser()
          .then(() => this.props.push('dashboard'));
      })
      // note, handle error with modal
      .catch((e) => {
        this.props.openModal({
          header: 'Login failed!',
          content: getErrorMessage(e)
        });
      });
  }

  render() {
    return (
      <Grid
        textAlign='center'
        className='login-container'
        verticalAlign='middle'
      >
        <Grid.Column className='center-grid'>
          <LoginForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
