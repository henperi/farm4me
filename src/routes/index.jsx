import React from 'react';
import {
  Route, Switch, BrowserRouter, Redirect,
} from 'react-router-dom';

import { SignupPage } from '../pages/Signup';
import { LoginPage } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Project } from '../pages/Projects';
import { Profile } from '../pages/Profile';
import { NetworkError } from '../components/NetworkError';

/**
 * App Routing Component
 *
 * @returns {JSX.Element} Element
 */
export function Routes() {
  return (
    <BrowserRouter>
      <NetworkError />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/projects" component={Project} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
