import axios from 'axios';
import { config } from '../config';

const httpService = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

/**
 * This method sets the necessary authorization when a user is logged in
 * @param {string} token
 * @param {string} header
 * @returns {void} null
 */
export const setAuthHeader = (token, header = 'authorization') => {
  if (token) {
    localStorage.setItem('authToken', token);
    httpService.defaults.headers.common[header] = token;
  }
};

/**
 * This method removes the necessary authorization when a user logs out
 * @param {string} header
 * @returns {void} null
 */
export const removeAuthHeader = (header = 'authorization') => {
  localStorage.removeItem('authToken');
  httpService.defaults.headers.common[header] = '';
};

export default httpService;
