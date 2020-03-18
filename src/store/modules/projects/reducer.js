import { types } from './types';

/**
 * @typedef {{
    numberOfHecters: number,
    isPaid: boolean,
    name: string,
    createdAt: number,
    totalCost: number,
    season: string,
    startDate: any,
    totalReturns: number,
    profit: number,
    duration: number,
    costPerHectare: number,
    ownerId: string,
    endDate: any,
    percentageProfit: number,
    id: string,
    reference: string,
}} Project
 */

/**
 * @type {Project[]}
 */
export const projectsInitialState = [];

export const projectReducer = (state = projectsInitialState, action) => {
  switch (action.type) {
    case types.ADD_PROJECT:
      return [
        ...state,
        action.payload.project,
      ];

    case types.SET_PROJECTS:
      return [
        ...action.payload.projects,
      ];

    case types.UPDATE_ONE_PROJECT: {
      const projectToUpdate = action.payload.project;
      const updatedState = state.map((project) => {
        if (project.id === projectToUpdate.id) {
          return projectToUpdate;
        }
        return project;
      });

      return [
        ...updatedState,
      ];
    }

    default:
      return state;
  }
};
