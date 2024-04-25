import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    headers: {
        Accept: 'application/json',
    },
    timeout: 10000,
})

export default API
