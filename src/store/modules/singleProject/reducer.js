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
 * @type {Project}
 */
// @ts-ignore
export const singleProjectInitialState = {};

export const singleProjectReducer = (state = singleProjectInitialState, action) => {
  switch (action.type) {
    case types.SET_SINGLE_PROJECT:
      return { ...action.payload.project };

    default:
      return state;
  }
};
