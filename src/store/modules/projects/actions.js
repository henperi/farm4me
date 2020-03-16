import { types } from './types';
import httpService from '../../../services/httpService';
import { logger } from '../../../helpers/logger';
import { toaster } from '../../../helpers/toaster';

/**
 * @typedef {import('./reducer').Project} Project
 */

/**
 *
 * @description Method to set multiple projects in the store
 *
 * @param {Project[]} projects
 * @returns {object} reducer action type and payload
 */
export const setProjects = (projects) => ({
  type: types.SET_PROJECTS,
  payload: {
    projects,
  },
});

/**
 * @description method to add one project to the project store
 * @param {Project} project
 * @returns {object} reducer action type and payload
 */
export const addOneProject = (project) => ({
  type: types.ADD_PROJECT,
  payload: {
    project,
  },
});


/**
 * @description A thunk action to register a new customer
 * @typedef {{
 *  investmentId: string,
 *  numberOfHecters: number,
 * }} createData
 * @param {createData} createProjectData
 * @returns {Function} dispatch an action
 */
export const createProject = (createProjectData) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/project', createProjectData);

    return dispatch(addOneProject(data.project));
  } catch (error) {
    toaster(error.response.data.message);
    return logger.log(error.response);
  }
};


/**
 * @description A thunk action to register a new customer
 * @returns {Function} dispatch an action
 */
export const fetchProjects = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.get('/project');

    dispatch(setProjects(data.projects));

    return data.projects;
  } catch (error) {
    toaster(error.response.data.message);
    logger.log(error.response);

    return (error.response);
  }
};
