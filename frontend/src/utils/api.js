import axios from 'axios';

/**
 * A utility function to make API calls.
 * 
 * @param {string} url - The endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {object} payload - The request payload (used only in POST/PUT).
 * @param {object} headers - Custom headers, if any.
 * 
 * @returns {Promise} - The promise object representing the response.
 */
const apiCall = (url, method, payload = null, headers = {}) => {
  // Set default headers if none provided
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  const options = {
    method,
    url,
    headers: defaultHeaders,
    data: payload, // Add payload to the request body for POST/PUT methods
  };

  // Return axios promise
  return axios(options)
    .then(response => response.data)  // Only return the data from the response
    .catch(error => {
      // Handle and propagate errors
      throw error.response ? error.response.data : error.message;
    });
};

export default apiCall;
