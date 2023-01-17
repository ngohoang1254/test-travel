import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// const codeMessage: { [status: number]: string } = {
//   200: "The server successfully returned the requested data. Validating response data...",
//   201: "Create or modify data successfully",
//   202: "A request has entered the background queue (asynchronous task)",
//   204: "The data was deleted successfully",
//   400: "The request was sent with an error. The server did not perform any operations to create or modify data",
//   401: "The user does not have permission (token, username, password is incorrect)",
//   403: "User is authorized, but access is forbidden",
//   404: "The request sent is for a record that does not exist and the server is not operating",
//   406: "Not Acceptable",
//   410: "The requested resource is permanently deleted and will not be obtained again",
//   422: "When creating an object, a validation error occurred",
//   500: "The server has an error. Please check the server",
//   502: "Gateway error",
//   503: "The service is unavailable, the server is temporarily overloaded or maintained",
//   504: "The gateway timed out",
// };

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const token = getToken();
    // if (token) {
    //   config.headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const data = await userAPI.refreshToken();
    //   setAuthToken(data.token);
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
    //   return axios(originalRequest);
    // }
    return Promise.reject(error);
  }
);

const requestAxios = async (url: string, options: AxiosRequestConfig = {}) => {
  try {
    const res: AxiosResponse = await axios({
      method: "GET",
      url,
      baseURL: process.env.NEXT_PUBLIC_URL,
      ...options,
    });
    return res.data;
  } catch (err) {
    const { response } = err as AxiosError;
    console.log("response: ", response);
    if (response && response.data) {
      return response.data;
    }
    if (response && response.status) {
      if (response.data instanceof Blob) {
        // const blob = new Blob([response.data]);
        // const data = await blob.text();
        // const { message, success } = JSON.parse(data);
        // if (!success) {
        //   notification.error({
        //     message: `Error ${response.status}:`,
        //     description: message,
        //   });
        // }
      } else {
        if (response && response.data) {
          // const errorText =
          //   response?.data?.message ||
          //   response?.data?.title ||
          //   codeMessage[response.status];
          // notification.error({
          //   message: `Error ${response.status}:`,
          //   description: errorText,
          // });
        }
      }
      throw err;
    }
  }
};

export default requestAxios;
