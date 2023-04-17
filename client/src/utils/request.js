import { message } from 'antd';
import axios from "axios";
export const request = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 30000,
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    setTimeout(() => message.error('Error!'), 100)
    return Promise.reject(error);
  }
);