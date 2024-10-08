import axios from "axios";
export const axiosInstance = axios.create({
  // baseURL: "http://vogue-api.test/wp-json/wp/v2",
  baseURL: "http://localhost:2000",
});
