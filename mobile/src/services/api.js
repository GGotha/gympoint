import axios from 'axios';
import { IPV4NETWORK } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `http://${IPV4NETWORK}:3000`,
});

export default api;
