import React from 'react';
import {
  Route, Switch, BrowserRouter, Redirect,
} from 'react-router-dom';

import { SignupPage } from '../pages/Signup';
import { LoginPage } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Project } from '../pages/Projects';
import { Profile } from '../pages/Profile';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Toaster } from '../components/Toaster/ index';
import { SingleProject } from '../pages/SingleProject';
// import { useGlobalStore } from '../store';

/**
 * App Routing Component
 *
 * @returns {JSX.Element} Element
 */
export function Routes() {
  return (
    <BrowserRouter>
      <Toaster />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/projects" component={Project} />
        <ProtectedRoute exact path="/projects/:projectId" component={SingleProject} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
