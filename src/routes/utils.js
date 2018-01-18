import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticationStorage } from 'api/authentication/index';
import {
  authenticationService,
  userService
} from 'api';

export const requiresAuthentication = (ComposedComponent) => {
  /* eslint-disable */
  class Restricted extends Component {
    static propTypes = {
      location: PropTypes.object,
      history: PropTypes.object
    };

    componentWillMount() {
      this.checkAuthentication(this.props);
    }

    componentDidMount() {
      window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    checkAuthentication(params) {
      const { history } = params;
      if (!authenticationStorage.read()) {
        history.replace({ pathname: '/login' });
      }
    }

    logout = () => {
      userService.logout();
      authenticationService.clear();
      this.props.history.push('login');
    }

    render() {
      return <ComposedComponent {...this.props} logout={this.logout}/>;
    }
  }

  return withRouter(Restricted);
};
