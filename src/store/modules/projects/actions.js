import { types } from './types';
import httpService from '../../../services/httpService';

import { axiosErrorHandler } from '../../../helpers/axiosErrorHandler';

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
    return axiosErrorHandler(error, dispatch);
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
    return axiosErrorHandler(error, dispatch);
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
    return axiosErrorHandler(error, dispatch);
  }
};
