
import types from './types';
import { setAuthUser } from '../auth/actions';

/**
 * @description Method to start the app
 * @returns {object} reducer action type and payload
 */
export const initApp = () => ({
  type: types.INIT_APP,
});


export const initialiseStore = (dispatch) => {
  const token = localStorage.getItem('authToken');

  dispatch(initApp());
  if (token) {
    dispatch(setAuthUser(token));
  }
};
