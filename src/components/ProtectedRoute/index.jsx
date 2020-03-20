/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalStore } from '../../store';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useGlobalStore();
  const { auth } = state;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated) {
          return <Component {...props} />;
        }
        return (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
