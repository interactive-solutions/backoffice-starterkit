import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { ForgotPasswordForm } from 'components/forms';
import { SubmissionError } from 'redux-form';

export class ForgotPassword extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired
  };

  // replace as soon as auth is in place
  onSubmit = (values) => {
    return this.props.resetPassword(values.email)
      .then(() => this.props.push('login'))
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
