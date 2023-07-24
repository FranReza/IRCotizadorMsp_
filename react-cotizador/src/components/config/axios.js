import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://vaespersianas.ddns.net:5000',
    withCredentials: true
    
});

export default clienteAxios;