import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';
import { Dashboard } from './dashboard/dashboard';

export const createRoutes = () => {
  return (
    <Route>
      <Route path="/" component={CoreLayout}>
        <IndexRoute component={LoginContainer}/>
        <Route path="login" component={LoginContainer}/>
        <Route path="dashboard" component={Dashboard}/>
      </Route>
    </Route>
  );
};

export default createRoutes;
