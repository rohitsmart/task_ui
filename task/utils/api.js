import axios from 'axios';

const LOGIN_API_URL = "http://179.61.188.36:9000/api/employee/login";
const ATTENDANCE_API_URL = "http://179.61.188.36:9000/api/attendence/web-online";

export const login = async (email, password) => {
  const response = await axios.post(LOGIN_API_URL, {
    email,
    password
  });
  return response.data.auth.token;
};

export const markAttendance = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(ATTENDANCE_API_URL, null, { headers });
  return response.data;
};
