import types from './types';

export const appInitialState = {
  isReady: false,
  noNetwork: false,
};

export const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case types.INIT_APP:
      return {
        ...state,
        isReady: true,
      };

    case types.SET_NETWORK_ERROR:
      return {
        ...state,
        noNetwork: action.payload.status,
      };

    default:
      return state;
  }
};
