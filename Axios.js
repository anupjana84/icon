import Axios from "axios";

Axios.defaults.baseURL = "https://iconcomputer.in/api";

export const axiosInstance = Axios.create({});
