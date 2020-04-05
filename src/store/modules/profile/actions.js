/* eslint-disable import/no-cycle */
import { types } from './types';
import httpService from '../../../services/httpService';
import { axiosErrorHandler } from '../../../helpers/axiosErrorHandler';
import { flashToaster } from '../toaster/actions';


/**
 * @description method to set the auth user
 * @param {object} profile
 * @returns {object} reducer action type and payload
 */
export const setProfile = (profile) => ({
  type: types.SET_PROFILE,
  payload: {
    profile,
  },
});

/**
 * @description A thunk action to fetch the authenticated user's profile
 * @returns {Function} dispatch an action
 */
export const fetchProfile = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.get('/profile');

    return dispatch(setProfile(data.profile));
  } catch (error) {
    return axiosErrorHandler(error, dispatch);
  }
};

/**
 * @description A thunk action to add a user's personal info
 * @typedef {{
  *  firstName: string,
  *  lastName: string,
  *  phone: string,
  * }} PersonalInfo
  * @param {PersonalInfo} personalInfo
  * @returns {Function} dispatch an action
  */
export const updatePersonalInfo = (personalInfo) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.put('/profile/update-personal-data', personalInfo);

    return dispatch(setProfile(data.profile));
  } catch (error) {
    return axiosErrorHandler(error, dispatch);
  }
};

/**
 * @description A thunk action to add a user's bank info
 * @typedef {{
*   bankName: string,
*   accountNumber: string,
*   accountName: string,
* }} BankInfo
* @param {BankInfo} bankInfo
* @returns {Function} dispatch an action
*/
export const addBankInfo = (bankInfo) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/profile/add-bank', bankInfo);

    dispatch(flashToaster({ message: 'Bank information added successfully', type: 'success' }));

    return dispatch(setProfile(data.profile));
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return axiosErrorHandler(error, dispatch);
  }
};

/**
 * @description A thunk action to add a user's address info
 * @typedef {{
  *   city: string,
  *   state: string,
  *   addressLine1: string,
  * }} AddressInfo
  * @param {AddressInfo} addressInfo
  * @returns {Function} dispatch an action
  */
export const addAddressInfo = (addressInfo) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/profile/add-address', addressInfo);

    dispatch(flashToaster({ message: 'Address information added successfully', type: 'success' }));

    return dispatch(setProfile(data.profile));
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return axiosErrorHandler(error, dispatch);
  }
};

/**
 * @description A thunk action to add a user's docs info
 * @typedef {{
  *   profileImage: string,
  *   vaidIdCard: string,
  * }} DocsInfo
  * @param {DocsInfo} docsInfo
  * @returns {Function} dispatch an action
  */
export const addDocsInfo = (docsInfo) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await httpService.post('/profile/add-docs', docsInfo);
    dispatch(flashToaster({ message: 'Doccument information added successfully', type: 'success' }));

    return dispatch(setProfile(data.profile));
  } catch (error) {
    return axiosErrorHandler(error, dispatch);
  }
};
