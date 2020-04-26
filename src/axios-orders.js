import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-04-20.firebaseio.com'
});

export default instance;