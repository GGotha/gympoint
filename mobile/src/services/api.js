import axios from 'axios';
import { IPV4_NETWORK } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `http://${IPV4_NETWORK}:3000`,
});

export default api;
