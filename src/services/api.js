import axios from 'axios';

export const ApiCall = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend URL
  // You can add other default configurations here like headers, timeout, etc.
});

export default ApiCall;