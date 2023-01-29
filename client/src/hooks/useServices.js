import axios from "axios";

const useServices = () => {
  const BASE_URL = process.env.REACT_APP_BACK_URL;

  // api routes
  const routeUrl = {
    user: BASE_URL + "/api/user",
  };

  function api() {
    return axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // users calls
  const users = {
    signup: (data) => api().post(`${routeUrl.user}/signup`, data),
    login: (data) => api().post(`${routeUrl.user}/login`, data),
    addAction: (data) => api().put(`${routeUrl.user}/addAction`, data),
    removeAction: (data) => api().put(`${routeUrl.user}/removeAction`, data),
  };

  return { users };
};

export default useServices;
