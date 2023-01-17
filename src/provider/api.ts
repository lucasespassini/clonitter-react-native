import { REACT_APP_BASE_URL } from "@env";
import axios from "axios";

// const api = axios.create({
//   baseURL: REACT_APP_BASE_URL
// })
const api = axios.create({
  baseURL: 'http://192.168.13.54:3333/'
})

export { api }