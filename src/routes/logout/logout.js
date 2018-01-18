import React from 'react';
import PropTypes from 'prop-types';
import {
  authenticationService,
  userService
} from 'api';

/**
 * This is actually not used as a component at all,
 * but more like a glorified function that
 * simply logs out the user.
 */
export class Logout extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    userService.logout();
    authenticationService.clear();
    this.props.history.push('login');
  }

  render() {
    return null;
  }
}
