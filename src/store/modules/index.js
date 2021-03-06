import { authReducer, authInitialState } from './auth/reducer';
import { appReducer, appInitialState } from './init/reducer';
import { projectReducer, projectsInitialState } from './projects/reducer';
import { profileReducer, profileInitialState } from './profile/reducer';
import { toasterReducer, toasterInitialState } from './toaster/reducer';
import { userStatsInitialState, userStatsReducer } from './userStats/reducer';
import { singleProjectReducer, singleProjectInitialState } from './singleProject/reducer';

export const initialState = {
  app: appInitialState,
  auth: authInitialState,
  projects: projectsInitialState,
  profile: profileInitialState,
  toaster: toasterInitialState,
  userStats: userStatsInitialState,
  singleProject: singleProjectInitialState,
};

export const rootReducer = (state, action) => {
  const {
    app, auth, projects, profile, toaster, userStats, singleProject,
  } = state;

  return {
    app: appReducer(app, action),
    auth: authReducer(auth, action),
    projects: projectReducer(projects, action),
    profile: profileReducer(profile, action),
    toaster: toasterReducer(toaster, action),
    userStats: userStatsReducer(userStats, action),
    singleProject: singleProjectReducer(singleProject, action),
  };
};
