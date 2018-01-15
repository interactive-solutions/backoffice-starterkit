import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { ForgotPasswordForm } from 'components/forms';
import { userService } from 'api';
import PropTypes from 'prop-types';

function getErrorMessage(response) {
  if (!response) {
    return 'Unknown error occured';
  }

  const { status } = response;
  switch (status) {
    case 404:
      return 'Page not found';
    default:
      return status;
  }
};

export class ForgotPassword extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  };

  // replace as soon as auth is in place
  onSubmit = (values) => {
    return userService.resetPassword(values.email)
      .then(() => this.props.push('login'))
      // note, handle error with modal
      .catch((e) => {
        this.props.openModal({
          header: 'Reset password failed!',
          content: getErrorMessage(e.response)
        });
      });
  }

  render() {
    return (
      <Grid
        textAlign='center'
        className='forgot-password-container'
        verticalAlign='middle'
      >
        <Grid.Column className='center-grid'>
          <ForgotPasswordForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
