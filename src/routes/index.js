import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';
import { Dashboard } from './dashboard/dashboard';
import { requiresAuthentication } from './utils';
import { Navbar } from 'components';
import { ResellersContainer } from './resellers/resellers-container';

export const createRoutes = () => {
  return (
    <CoreLayout>
      <Route exact path="/" component={LoginContainer}/>
      <Switch>
        <Route exact path="/login" component={LoginContainer}/>
        <Navbar>
          <Switch>
            <Route exact path="/dashboard" component={requiresAuthentication(Dashboard)}/>
            <Route exact path="/resellers" component={requiresAuthentication(ResellersContainer)}/>
          </Switch>
        </Navbar>
        <Redirect path="*" to="/"/>
      </Switch>
    </CoreLayout>
  );
};

export default createRoutes;
