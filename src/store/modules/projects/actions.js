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
 * @description method to add one project to the project store
 * @param {Project} project
 * @returns {object} reducer action type and payload
 */
export const updateOneProject = (project) => ({
  type: types.UPDATE_ONE_PROJECT,
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
 * @returns {Function | Project} dispatch an action
 */
export const createProject = (createProjectData) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/project', createProjectData);

    dispatch(addOneProject(data.project));
    return data.project;
  } catch (error) {
    toaster(error.response.data.message);
    return logger.log(error.response);
  }
};

/**
 * @description A thunk action to register a new customer
 * @typedef {{
 *  transactionRef: string,
 * }} startProject
 * @param {startProject} startProjectData
 * @returns {Function | Project} dispatch an action
 */
export const startProject = (startProjectData) => async (dispatch) => {
  const { transactionRef } = startProjectData;
  try {
    const {
      data: { data },
    } = await httpService.post(`/project/start/${transactionRef}`, startProjectData);

    dispatch(updateOneProject(data.updatedProject));
    return data.project;
  } catch (error) {
    toaster(error.response.data.message);
    return logger.log(error.response);
  }
};

/**
 * @description A thunk action to register a new customer
 * @param {string} projectId
 * @returns {Promise<string>} dispatch an action
 */
export const generateReference = async (projectId) => {
  try {
    const {
      data: { data },
    } = await httpService.post(`/project/generateRef/${projectId}`);

    return data.reference;
  } catch (error) {
    toaster(error.response.data.message);
    logger.log(error.response);

    return null;
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
    logger.log(error);

    toaster(error.response ? error.response.data.message : error);

    return (error.response);
  }
};
