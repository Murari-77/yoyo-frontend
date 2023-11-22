import axios from 'axios';

export const ApiCall = axios.create({
  baseURL: "https://yoyo-backend-2pwg.onrender.com", // Replace with your backend URL
  // You can add other default configurations here like headers, timeout, etc.
});

export default ApiCall;