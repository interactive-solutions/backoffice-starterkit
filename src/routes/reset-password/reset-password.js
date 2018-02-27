import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { ResetPasswordForm } from 'components/forms';
import { userService } from 'api';
import { push } from 'react-router-redux';
import { openModal } from 'redux/modules/modal';
import { connect } from 'react-redux';
import './style/reset-password.scss';

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  openModal: (header, content) => dispatch(openModal(header, content))
});

@connect(null, mapDispatchToProps)
export class ResetPassword extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  };

  onSubmit = (values) =>
    userService.resetPassword(this.props.match.params.nonce, values.password)
      .then(() => this.props.push('login'))
      // note, handle error with modal
      .catch(() => {
        this.props.openModal({
          header: 'Reset password failed!',
          content: 'Password could not be updated'
        });
      });

  render() {
    return (
      <Grid
        textAlign='center'
        styleName='reset-password-container'
        verticalAlign='middle'
      >
        <Grid.Column styleName='center-grid'>
          <ResetPasswordForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
