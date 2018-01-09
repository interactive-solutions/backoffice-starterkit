import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { ForgotPasswordForm } from 'components/forms';
import { SubmissionError } from 'redux-form';
import { userService } from 'api';
import PropTypes from 'prop-types';

export class ForgotPassword extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  // replace as soon as auth is in place
  onSubmit = (values) => {
    return userService.resetPassword(values.email)
      .then(() => this.props.history.push('login'))
      // note, handle error with modal
      .catch((e) => { throw new SubmissionError({ _error: 'Reset password failed!' }); });
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
