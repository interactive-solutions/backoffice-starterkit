import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { ForgotPasswordForm } from 'components/forms';
import { userService } from 'api';
import PropTypes from 'prop-types';
import './style/forgot-password.scss';

export class ForgotPassword extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  };

  onSubmit = (values) =>
    userService.forgotPassword(values.email)
      .then(() => this.props.push('login'))
      // note, handle error with modal
      .catch(() => {
        this.props.openModal({
          header: 'Request failed!',
          content: 'Failed to request new password.'
        });
      });

  render() {
    return (
      <Grid
        textAlign='center'
        styleName='forgot-password-container'
        verticalAlign='middle'
      >
        <Grid.Column styleName='center-grid'>
          <ForgotPasswordForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
