import { REACT_APP_BASE_URL } from "@env";
import axios from "axios";

const api = axios.create({
  baseURL: REACT_APP_BASE_URL
})

export { api }