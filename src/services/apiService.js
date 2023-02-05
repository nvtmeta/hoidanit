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
const postLogin = (em, pass) => {
  return axios.post(`api/v1/login`, {
    email: em,
    password: pass,
    delay: 3000,
  });
};

const postSignUp = (email, password, userName) => {
  return axios.post("api/v1/register", {
    email,
    password,
    userName,
  });
};
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getQuizData = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post("api/v1/quiz", data);
};

export {
  postCreateUser,
  getAllUsers,
  postUpdateUser,
  deleteUser,
  getUserPaginate,
  postLogin,
  postSignUp,
  getQuizByUser,
  getQuizData,
  postSubmitQuiz,
  postCreateNewQuiz,
};
