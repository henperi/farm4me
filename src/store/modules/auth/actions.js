/* eslint-disable import/no-cycle */
import JWT from 'jsonwebtoken';
import types from './types';
import httpService, { setAuthHeader, removeAuthHeader } from '../../../services/httpService';
import { axiosErrorHandler } from '../../../helpers/axiosErrorHandler';
import { flashToaster } from '../toaster/actions';

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
    } = await httpService.post('/auth/signup', signupData);

    dispatch(flashToaster({ message: 'Your account has been created successfully', type: 'success' }));
    return dispatch(setAuthUser(data.token));
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return axiosErrorHandler(error, dispatch);
  }
};

/**
 * @description A thunk action to login a user
 * @typedef {{
 *  email: string,
 *  password: string,
 * }} LoginData
 * @param {LoginData} loginData
 * @param {Function} setIsSubmitting
 * @returns {any} dispatch an action
 */
export const login = (loginData, setIsSubmitting = () => null) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/auth/login', loginData);
    setIsSubmitting(false);

    dispatch(flashToaster({ message: 'Login successful', type: 'success' }));
    return dispatch(setAuthUser(data.token));
  } catch (error) {
    setIsSubmitting(false);
    if (error.response) {
      return error.response.data;
    }
    return axiosErrorHandler(error, dispatch);
  }
};
