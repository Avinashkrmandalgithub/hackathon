import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
  withCredentials: true,
});

export const signup = (fullName, email, password) =>
  API.post("/register", { fullName, email, password });


export const signin = (email, password) =>
  API.post("/login", { email, password });

export const getCurrentUser = () => API.get("/profile");

export const signout = () => API.post("/logout");


