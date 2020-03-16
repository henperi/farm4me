import types from './types';

export const appInitialState = {
  isReady: false,
};

export const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state,
        isReady: true,
      };

    default:
      return state;
  }
};
