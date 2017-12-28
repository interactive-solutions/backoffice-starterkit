import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';

export const createRoutes = () => {
  return (
    <Route>
      <Route path="/" component={CoreLayout}>
        <IndexRoute component={LoginContainer}/>
        <Route path="login"/>
      </Route>
    </Route>
  );
};

export default createRoutes;
