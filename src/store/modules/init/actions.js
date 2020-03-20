/* eslint-disable import/no-cycle */
import types from './types';
import { setAuthUser } from '../auth/actions';

/**
 * @description Method to start the app
 * @returns {object} reducer action type and payload
 */
export const initApp = () => ({
  type: types.INIT_APP,
});


/**
 * @description method to set the status of network error
 * @param {boolean} status
 * @returns {object} reducer action type and payload
 */
export const setNetworkError = (status) => ({
  type: types.SET_NETWORK_ERROR,
  payload: {
    status,
  },
});

export const initialiseStore = (dispatch) => {
  const token = localStorage.getItem('authToken');

  dispatch(initApp());
  if (token) {
    dispatch(setAuthUser(token));
  }
};
