import axios from "axios";

const API = axios.create({
  baseURL: "https://fullstack-todo-app-nnft.onrender.com/api", // live backend
  withCredentials: true,
});

export default API;
