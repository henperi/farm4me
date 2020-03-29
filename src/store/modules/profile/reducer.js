import { types } from './types';

export const profileInitialState = {
  userId: '',
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
    profileImage: '',
    validIdCard: '',
  },
};

// console.log('profileInitialState.bank', Object.values(profileInitialState.bank));

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
