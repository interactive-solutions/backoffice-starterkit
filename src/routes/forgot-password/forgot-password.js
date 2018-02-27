import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { ForgotPasswordForm } from 'components/forms';
import { userService } from 'api';
import PropTypes from 'prop-types';
import { openModal } from 'redux/modules/modal';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import './style/forgot-password.scss';

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  openModal: (header, content) => dispatch(openModal(header, content))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ForgotPassword extends Component {
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
