// import { logger } from './logger';

// let iteration = 0;
export const dispatchHelper = (dispatch, state) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, state);
  }

  // logger.log(action, iteration += 1);
  // logger.log(state);
  return dispatch(action);
};
