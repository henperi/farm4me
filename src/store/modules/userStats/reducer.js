import { types } from './types';

export const userStatsInitialState = {
  totalProjects: 0,
  totalCashInvested: 0,
  totalCashAvailableForWithdrawal: 0,
  totalRunningProjects: 0,
  refetchTime: 0,
};

export const userStatsReducer = (state = userStatsInitialState, action) => {
  switch (action.type) {
    case types.SET_USER_STATS:
      return {
        ...state,
        ...action.payload.userStats,
        refetchTime: Date.now() + (5 * 60 * 1000),
      };

    default:
      return state;
  }
};
