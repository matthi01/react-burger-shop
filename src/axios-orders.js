import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-shop-5c0c7.firebaseio.com/'
});

export default instance;