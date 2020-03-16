import JWT from 'jsonwebtoken';
import types from './types';
import httpService, { setAuthHeader, removeAuthHeader } from '../../../services/httpService';
import { logger } from '../../../helpers/logger';
import { toaster } from '../../../helpers/toaster';

/**
 * @description method to set the auth user
 * @param {object} token
 * @returns {object} reducer action type and payload
 */
export const setAuthUser = (token) => {
  const decodedToken = JWT.decode(token);
  setAuthHeader(token);

  return {
    type: types.SET_AUTH_USER,
    payload: {
      user: decodedToken,
    },
  };
};
/**
 * @description method to remove the auth user
 * @returns {object} reducer action type
 */
export const removeAuthUser = () => {
  removeAuthHeader();

  return {
    type: types.REMOVE_AUTH_USER,
  };
};


/**
 * @description A thunk action to register a new customer
 * @typedef {{
 *  firstName: string,
 *  email: string,
 *  phone: string,
 *  password: string,
 * }} SignupData
 * @param {SignupData} signupData
 * @returns {Function} dispatch an action
 */
export const signup = (signupData) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/auth', signupData);

    return dispatch(setAuthUser(data.token));
  } catch (error) {
    toaster(error.response.data.message);
    return logger.log(error.response);
  }
};

/**
 * @description A thunk action to login a user
 * @typedef {{
 *  email: string,
 *  password: string,
 * }} LoginData
 * @param {LoginData} loginData
 * @returns {Function} dispatch an action
 */
export const login = (loginData) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/auth/login', loginData);

    return dispatch(setAuthUser(data.token));
  } catch (error) {
    toaster(error.response.data.message);
    logger.log(error.response);

    return (error.response);
  }
};