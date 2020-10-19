import axios from 'axios'

export const AxiosAPI = axios.create({
  baseURL: '/.netlify/functions',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});