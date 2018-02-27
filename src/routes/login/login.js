import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { LoginForm } from 'components/forms';
import {
  authenticationService,
  userService
} from 'api';
import { push } from 'react-router-redux';
import { resolveUser } from 'redux/modules/user';
import { openModal } from 'redux/modules/modal';
import { connect } from 'react-redux';
import './style/login.scss';

function getErrorMessage(exception) {
  const { response } = exception;
  if (response) {
    const { status } = response;
    switch (status) {
      case 400: // Bad request
        return response.data.error_description;
      default:
        return 'User could not be logged in';
    }
  }
  return 'User could not be logged in';
}

export class Login extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    resolveUser: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  };

  onSubmit = (values) => authenticationService.login({ username: values.username, password: values.password })
    .then(this.props.resolveUser)
    .then(() => {
      if (!userService.currentUser) {
        this.props.openModal({
          header: 'Login failed!',
          content: getErrorMessage(userService.exception)
        });
      }
      this.props.push('dashboard');
    })
    // note, handle error with modal
    .catch((e) => {
      this.props.openModal({
        header: 'Login failed!',
        content: getErrorMessage(e)
      });
    })

  render() {
    return (
      <Grid
        textAlign='center'
        styleName='login-container'
        verticalAlign='middle'
      >
        <Grid.Column styleName='center-grid'>
          <LoginForm
            onSubmit={this.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  resolveUser: () => dispatch(resolveUser()),
  openModal: (header, content) => dispatch(openModal(header, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
