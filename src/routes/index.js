import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CoreLayout } from '../layouts/core-layout/core-layout';
import { LoginContainer } from './login/login-container';
import { Dashboard } from './dashboard/dashboard';
import { requiresAuthentication } from './utils';
import { Navbar } from 'components/navbar/navbar';

export const renderpage = () => { return (<div><h1>page1</h1></div>); };
export const renderpage1 = () => { return (<div><h1>page2</h1></div>); };
export const renderpage2 = () => { return (<div><h1>page3</h1></div>); };

export const createRoutes = () => {
  return (
    <CoreLayout>
      <Route exact path="/" component={LoginContainer}/>
      <Switch>
        <Route exact path="/login" component={LoginContainer}/>
        <Navbar>
          <Switch>
            <Route exact path="/dashboard" component={requiresAuthentication(Dashboard)}/>
          </Switch>
        </Navbar>
        <Redirect path="*" to="/"/>
      </Switch>
    </CoreLayout>
  );
};

export default createRoutes;
