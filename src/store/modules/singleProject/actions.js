import { types } from './types';
import httpService from '../../../services/httpService';

import { axiosErrorHandler } from '../../../helpers/axiosErrorHandler';
// import { flashToaster } from '../toaster/actions';

/**
 * @typedef {import('./reducer').Project} Project
 */

/**
 *
 * @description Method to set multiple projects in the store
 *
 * @param {Project} project
 * @returns {object} reducer action type and payload
 */
export const setSingleProject = (project) => ({
  type: types.SET_SINGLE_PROJECT,
  payload: {
    project,
  },
});

/**
 * @description A thunk action to register a new customer
 * @param {{ projectId: string }} projectId
 * @returns {Function} dispatch an action
 */
export const fetchSingleProject = ({ projectId }) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.get(`/project/${projectId}`);

    // console.log(data);

    dispatch(setSingleProject(data.project));

    return data.projects;
  } catch (error) {
    return axiosErrorHandler(error, dispatch);
  }
};
