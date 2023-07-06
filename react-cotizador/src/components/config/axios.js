import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://172.16.1.108:5000',
    withCredentials: true
    
});

export default clienteAxios;