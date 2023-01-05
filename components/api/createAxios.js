import axios from 'axios';

const createAxios = axios.create({
    baseURL: 'https://627bd552b54fe6ee008ffd5c.mockapi.io/',
    responseType: 'json',
});
axios.interceptors.request.use(
    (request) => {
        console.log(request);
        // Edit request config
        return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
export default createAxios;
