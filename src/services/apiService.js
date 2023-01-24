import axios from "../utils/axiosCustomise";
const postCreateUser = (email, password, name, role, image) => {
  //   const FormData = require("form-data");
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", name);
  data.append("role", role);
  data.append("image", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

export { postCreateUser, getAllUsers };
