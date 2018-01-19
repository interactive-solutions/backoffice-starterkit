import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';
import { ForgotPasswordContainer } from './forgot-password/forgot-password-container';
import { Dashboard } from './dashboard/dashboard';
import { requiresAuthentication } from './utils';
import { NavbarContainer } from 'components';
import { ResellersContainer } from './resellers/resellers-container';

export const createRoutes = () => {
  return (
    <CoreLayout>
      <Switch>
        <Route exact path='/' component={LoginContainer}/>
        <Route exact path='/login' component={LoginContainer}/>
        <Route exact path='/forgot-password' component={ForgotPasswordContainer}/>
        <NavbarContainer>
          <Switch>
            <Route exact path='/dashboard' component={requiresAuthentication(Dashboard)}/>
            <Route exact path='/resellers' component={requiresAuthentication(ResellersContainer)}/>
            <Redirect path='*' to='/dashboard'/>
          </Switch>
        </NavbarContainer>
        <Redirect path='*' to='/'/>
      </Switch>
    </CoreLayout>
  );
};

export default createRoutes;
