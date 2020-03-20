/* eslint-disable import/no-cycle */

import { setNetworkError } from '../store/modules/init/actions';
import { removeAuthUser } from '../store/modules/auth/actions';
import { logger } from './logger';

/**
 * This helper method attempts to handle axios error messages
 *
 * @param {*} error
 * @param {function} dispatch
 * @returns {*} any
 */
export const axiosErrorHandler = (error, dispatch) => {
  // console.log(error.toJSON());
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.log('Error.response.data', error.response.data);
    if (error.response.data.message === 'Your authorization token is either invalid or expired') {
      // alert('Logout');
      dispatch(removeAuthUser());
    }
  } else if (error.request) {
    logger.log('Error.request');
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log('Error.Request', error.request);

    dispatch(setNetworkError(true));

    if (!navigator.onLine) {
      dispatch(setNetworkError(true));
    }
  } else {
    dispatch(setNetworkError(true));
    // Something happened in setting up the request that triggered an Error
    logger.log('Error.Message', error.message);
  }
};
