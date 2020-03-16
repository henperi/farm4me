import types from './types';

export const authInitialState = {
  isAuthenticated: false,
  user: {
    firstName: '',
    email: '',
    phone: '',
    id: '',
  },
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case types.SET_AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };
    case types.REMOVE_AUTH_USER:
      return {
        ...authInitialState,
      };

    default:
      return state;
  }
};
