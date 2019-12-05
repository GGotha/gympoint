import { AsyncStorage } from "react-native";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.2:4444"
});

// api.addAsyncRequestTransform(request => async () => {
//   const token = await AsyncStorage.getItem("@Meetapp:token");

//   if (token) request.headers["Authorization"] = `Bearer ${token}`;
// });

// api.addResponseTransform(response => {
//   if (!response.ok) throw response;
// });

export default api;
