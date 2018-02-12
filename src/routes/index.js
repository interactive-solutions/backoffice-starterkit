import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import L from 'react-loadable';
import { Loader, Dimmer } from 'semantic-ui-react';
import { Navbar } from 'components';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { requiresAuthentication } from './utils';

const Loadable = opts =>
  L({
    loading: () => (
      <Dimmer active inverted>
        <Loader inverted size='massive' content='Loading'/>
      </Dimmer>
    ),
    ...opts
  });
  /* eslint-disable */
const LoginContainer = Loadable({ loader: () => import(/* webpackChunkName: 'login' */ './login/login-container') });
const ForgotPassword = Loadable({ loader: () => import(/* webpackChunkName: 'forgot-password' */ './forgot-password/forgot-password-container') });
const ResetPassword = Loadable({ loader: () => import(/* webpackChunkName: 'reset-password' */ './reset-password/reset-password-container') });
const Dashboard = Loadable({ loader: () => import(/* webpackChunkName: 'dashboard' */ './dashboard/dashboard') });
const ResellersContainer = Loadable({ loader: () => import(/* webpackChunkName: 'resellers' */ './resellers/resellers-container') });
  /* eslint-enable */

const RoutingNavbar = requiresAuthentication(Navbar);

export const createRoutes = () => (
  <CoreLayout>
    <Switch>
      <Route exact path='/' component={LoginContainer}/>
      <Route exact path='/login' component={LoginContainer}/>
      <Route exact path='/forgot-password' component={ForgotPassword}/>
      <Route exact path='/reset-password/:nonce' component={ResetPassword}/>
      <RoutingNavbar>
        <Switch>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/resellers' component={ResellersContainer}/>
          <Redirect path='*' to='/dashboard'/>
        </Switch>
      </RoutingNavbar>
      <Redirect path='*' to='/'/>
    </Switch>
  </CoreLayout>
);

export default createRoutes;
