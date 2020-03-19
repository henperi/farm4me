/* eslint-disable import/no-cycle */

import { setNetworkError } from '../store/modules/init/actions';

/**
 * This helper method attempts to handle axios error messages
 *
 * @param {*} error
 * @param {function} dispatch
 * @returns {*} any
 */
export const axiosErrorHandler = (error, dispatch) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('Error.response.data', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log('Error.Request', error.request);

    if (!navigator.onLine) {
      dispatch(setNetworkError(true));
    }
  } else {
    dispatch(setNetworkError(true));
    // Something happened in setting up the request that triggered an Error
    console.log('Error.Message', error.message);
  }
};
