import { logger } from './logger';

let iteration = 0;
export const dispatchHelper = (dispatch, state) => (action) => {
  logger.log(action, iteration += 1);
  logger.log(state);

  if (typeof action === 'function') {
    return action(dispatch, state);
  }
  return dispatch(action);
};
