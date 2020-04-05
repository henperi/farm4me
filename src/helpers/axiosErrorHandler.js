/* eslint-disable import/no-cycle */

// import { setNetworkError } from '../store/modules/init/actions';
// import { logger } from './logger';
import { removeAuthUser } from '../store/modules/auth/actions';
import { flashToaster } from '../store/modules/toaster/actions';

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
    if (error.response.data.message === 'Your authorization token is either invalid or expired') {
      dispatch(removeAuthUser());
      return dispatch(flashToaster({ message: 'Your session has expired, please login again', type: 'lightGrey' }));
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log('Error.Request', error.request);

    if (!navigator.onLine) {
      return dispatch(
        flashToaster({
          message: 'It appears you are on a poor network. Please check your network and try again',
          type: 'error',
        }),
      );
    }

    return dispatch(
      flashToaster({
        message:
          `An error occured with this request, please try again later. 
          \n If this continues please send an email to help@farm4me.com for assistance`,
        type: 'error',
      }),
    );
  } else {
    // dispatch(setNetworkError(true));
    // Something happened in setting up the request that triggered an Error
    // logger.log('Error.Message', error.message);

    return dispatch(
      flashToaster({
        message: error.message,
        type: 'error',
      }),
    );
  }
};
