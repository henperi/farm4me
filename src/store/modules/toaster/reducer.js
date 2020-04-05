import { types } from './types';

/**
 * @typedef {import('./actions').ToastData} ToastData
 */

/**
 *
 * @typedef {import('./actions').FlashAction} Action
 */

/**
 * @type {ToastData[]}
 */
export const toasterInitialState = [];

// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param {ToastData[]} state
 * @param {Action} action
 *
 */
export const toasterReducer = (state = toasterInitialState, action) => {
  switch (action.type) {
    case types.ADD_TOASTER:
      return [
        action.payload.toastData,
        ...state,
      ];

    case types.REMOVE_TOASTER: {
      const updatedState = state.filter((toaster) => toaster.id !== action.payload.toastId);

      return [
        ...updatedState,
      ];
    }

    default:
      return state;
  }
};
