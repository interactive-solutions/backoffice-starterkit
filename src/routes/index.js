import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';
import { ForgotPasswordContainer } from './forgot-password/forgot-password-container';
import { Dashboard } from './dashboard/dashboard';
import { requiresAuthentication } from './utils';
import { RoutingNavbar } from 'components';
import { ResellersContainer } from './resellers/resellers-container';
import { Logout } from './logout/logout';

export const createRoutes = () => {
  return (
    <CoreLayout>
      <Switch>
        <Route exact path='/' component={LoginContainer}/>
        <Route exact path='/login' component={LoginContainer}/>
        <Route exact path='/forgot-password' component={ForgotPasswordContainer}/>
        <RoutingNavbar>
          <Switch>
            <Route exact path='/dashboard' component={requiresAuthentication(Dashboard)}/>
            <Route exact path='/resellers' component={requiresAuthentication(ResellersContainer)}/>
            <Route exact path='/logout' component={requiresAuthentication(Logout)}/>
            <Redirect path='*' to='/dashboard'/>
          </Switch>
        </RoutingNavbar>
        <Redirect path='*' to='/'/>
      </Switch>
    </CoreLayout>
  );
};

export default createRoutes;
