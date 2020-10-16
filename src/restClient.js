import axios from 'axios'

export const AxiosAPI = axios.create({
  // baseURL: '/.netlify/functions',
  baseURL: 'http://localhost:9000',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});