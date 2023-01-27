import axios from "../utils/axiosCustomise";
import FormData from "form-data";
const postCreateUser = (email, password, name, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", name);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const postUpdateUser = (id, name, role, image) => {
  const data = new FormData();
  data.append("username", name);
  data.append("id", id);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
  return axios.post(`http://localhost:8081/api/v1/login`, { email, password });
};

export {
  postCreateUser,
  getAllUsers,
  postUpdateUser,
  deleteUser,
  getUserPaginate,
  postLogin,
};
