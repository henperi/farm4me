import { types } from './types';

export const profileInitialState = {
  userId: '',
  percentageComplete: 25,
  bank: {
    bankName: '',
    accountName: '',
    accountNumber: '',
  },
  address: {
    city: '',
    state: '',
    addressLine1: '',
  },
  docs: {
    photo: '',
    validId: '',
  },
};

export const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case types.SET_PROFILE:
      return {
        ...state,
        ...action.payload.profile,
      };

    default:
      return state;
  }
};
