import { authReducer, authInitialState } from './auth/reducer';
import { appReducer, appInitialState } from './init/reducer';
import { projectReducer, projectsInitialState } from './projects/reducer';

export const initialState = {
  app: appInitialState,
  auth: authInitialState,
  projects: projectsInitialState,
};

export const rootReducer = (state, action) => {
  const { app, auth, projects } = state;

  return {
    app: appReducer(app, action),
    auth: authReducer(auth, action),
    projects: projectReducer(projects, action),
  };
};
