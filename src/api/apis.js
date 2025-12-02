// src/api/apis.jsx  ← THIS WILL WORK 100000000%
const apis = () => {
  const isLocalhost = window.location.hostname === "localhost" || 
                      window.location.hostname === "127.0.0.1";

  const baseURL = isLocalhost 
    ? "http://localhost:4044"           // ← NO trailing slash
    : "https://ems-backend-99v4.onrender.com";  // ← NO trailing slash

  return {
    registerUser: `${baseURL}/user/register`,
    loginUser: `${baseURL}/user/login`,
    getUserDetails: `${baseURL}/user/getUserDetails`,
    logout: `${baseURL}/user/logout`,
    getTasks: `${baseURL}/task/get`,
    acceptTask: `${baseURL}/task/acceptTask`,
    markAsCompleted: `${baseURL}/task/markCompleted`,
    markAsFailed: `${baseURL}/task/markFailed`,
    createTask: `${baseURL}/task/create`,
    all_employees: `${baseURL}/emp/employees`
  };
};

export default apis;