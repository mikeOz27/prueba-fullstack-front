import axios from 'axios';

const urlApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default urlApi;