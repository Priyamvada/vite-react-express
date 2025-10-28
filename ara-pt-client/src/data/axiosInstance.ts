import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Express server port and API prefix
    headers: {
        'Content-Type': 'application/json',
    },
});

export const isAxiosError = axios.isAxiosError;