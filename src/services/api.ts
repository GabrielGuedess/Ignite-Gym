import axios from "axios";

import { AppError } from "utils/AppError";

export const api = axios.create({
  baseURL: "https://e48a-2804-431-c7cd-5194-41a7-80ab-2b36-37a6.sa.ngrok.io",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);
