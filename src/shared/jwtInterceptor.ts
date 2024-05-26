import axios from "axios";
import {getToken, logoutUserHandler} from "@/shared/helper";
/*import store from '../store/index';*/

const jwtInterceptor = axios.create({});


jwtInterceptor.interceptors.request.use((config) =>
{
  config.headers["accept"] = '*/*'
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
});

jwtInterceptor.interceptors.response.use(
  (response) =>
  {
    return response;
  },
  async (error) =>
  {
    if (error.response && error.response.status === 401)
    {
      logoutUserHandler();
    }
    return error;
  }
);

export default jwtInterceptor;