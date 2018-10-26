import axios from 'axios';

const axiosOrder = axios.create({
    baseURL:'https://react-burger-builder-3bcfe.firebaseio.com/'
});

export default axiosOrder;