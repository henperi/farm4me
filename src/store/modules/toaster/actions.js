import shortId from 'shortid';
import { types } from './types';

/**
 * @typedef {{
  *  id?: string;
  *  message: string;
  *  timeOut?: number;
  *  type?: string;
  * }} ToastData
  */

/**
 * @typedef {{
  * type: string;
  * payload: {
    * toastId?: string;
    * toastData: {
      * id: string;
      * message: string;
      * timeOut: number;
      * type: string;
    * };
  * };
 * }} FlashReturns
 */

/**
 * @description Method to remove a toast message from the store
 * @param {string} toastId
 * @returns {object} reducer action type and payload
 */
export const removeToaster = (toastId) => ({
  type: types.REMOVE_TOASTER,
  payload: {
    toastId,
  },
});

/**
 * @description Method to add one toast message to the store
 * @param {ToastData} toastData
 * @returns {Function | FlashReturns} result
 */
export const flashToaster = ({
  message, timeOut = 12000, type = 'success', id = shortId.generate(),
}) => ({
  type: types.ADD_TOASTER,
  payload: {
    toastData: {
      id,
      message,
      type,
      timeOut,
    },
  },
});

/**
 * @description Method to add one toast message to the store
 * @param {ToastData} toastData
 * @returns {object} reducer action type and payload
 */
export const addToaster = ({
  message, timeOut = 15000, type = 'success', id = shortId.generate(),
}) => ({
  type: types.ADD_TOASTER,
  payload: {
    toastData: {
      id,
      message,
      type,
      timeOut,
    },
  },
});
