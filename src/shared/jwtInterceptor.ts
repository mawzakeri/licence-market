import axios from "axios";
import {getToken} from "@/shared/helper";
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
    console.log(error)
  }
);

export default jwtInterceptor;