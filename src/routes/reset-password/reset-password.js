import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { ResetPasswordForm } from 'components/forms';
import { userService } from 'api';

export class ResetPassword extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  };

  onSubmit = (values) => {
    return userService.resetPassword(this.props.match.params.nounce, values.password)
      .then(() => this.props.push('login'))
      // note, handle error with modal
      .catch((e) => {
        this.props.openModal({
          header: 'Reset password failed!',
          content: 'Password could not be updated'
        });
      });
  }

  render() {
    return (
      <Grid
        textAlign='center'
        className='reset-password-container'
        verticalAlign='middle'
      >
        <Grid.Column className='center-grid'>
          <ResetPasswordForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
