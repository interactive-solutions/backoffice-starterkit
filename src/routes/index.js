import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';
import { Dashboard } from './dashboard/dashboard';
import { requiresAuthentication } from './utils';
import { RoutingNavbar } from 'components';
import { ResellersContainer } from './resellers/resellers-container';

export const createRoutes = () => {
  return (
    <CoreLayout>
      <Route exact path="/" component={LoginContainer}/>
      <Switch>
        <Route exact path="/login" component={LoginContainer}/>
        <RoutingNavbar>
          <Switch>
            <Route exact path="/dashboard" component={requiresAuthentication(Dashboard)}/>
            <Route exact path="/resellers" component={requiresAuthentication(ResellersContainer)}/>
          </Switch>
        </RoutingNavbar>
        <Redirect path="*" to="/"/>
      </Switch>
    </CoreLayout>
  );
};

export default createRoutes;
