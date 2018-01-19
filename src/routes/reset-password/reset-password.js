import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { ResetPasswordForm } from 'components/forms';
import { userService } from 'api';

function getErrorMessage(response) {
  if (!response) {
    return 'Unknown error occured';
  }

  const { status } = response;
  switch (status) {
    case 400:
      return response.data.error_description;
    case 404:
      return 'Page not found';
    default:
      return status;
  }
};

export class ResetPassword extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: {
        nounce: PropTypes.string.isRequired
      }
    })
  };

  // replace as soon as auth is in place
  onSubmit = (values) => {
    return userService.resetPassword(this.props.match.params.nounce, values.password)
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
