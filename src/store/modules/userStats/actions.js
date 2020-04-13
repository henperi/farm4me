/* eslint-disable import/no-cycle */
import { types } from './types';
import httpService from '../../../services/httpService';
import { axiosErrorHandler } from '../../../helpers/axiosErrorHandler';

/**
 * @description method to set the user stats
 * @param {object} userStats
 * @returns {object} reducer action type and payload
 */
export const setUserStats = (userStats) => ({
  type: types.SET_USER_STATS,
  payload: {
    userStats,
  },
});

/**
 * @description A thunk action to fetch the authenticated user's stats
 * @returns {Function} dispatch an action
 */
export const fetchUserStats = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.get('/user-stats');

    return dispatch(setUserStats(data.userStats));
  } catch (error) {
    return axiosErrorHandler(error, dispatch);
  }
};
