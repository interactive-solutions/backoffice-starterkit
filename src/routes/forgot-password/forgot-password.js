import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { ForgotPasswordForm } from 'components/forms';
import { userService } from 'api';
import PropTypes from 'prop-types';
import { getDefaultErrorMessage } from 'utils/errorMessages';

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
          content: getDefaultErrorMessage(e)
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
