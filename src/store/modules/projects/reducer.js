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
    costPerHectre: number,
    ownerId: string,
    endDate: any,
    percentageProfit: number,
    id: string,
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

    default:
      return state;
  }
};
