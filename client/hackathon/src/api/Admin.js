import axios from "axios";

// Use the same axios configuration as Auth.js for consistency
const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/admin",
  withCredentials: true,
});

export const registerAdmin = (userData) =>
  API.post("/register", userData);

export const generateAdminPassword = () =>
  API.get("/password/generate");

export const getAdminProfile = () =>
  API.get("/profile");

export const updateAdminProfile = (profileData) =>
  API.put("/update", profileData);

export const loginAdmin = (username, password) =>
  API.post("/login", { userName: username, password });

export const logoutAdmin = () =>
  API.get("/logout");
