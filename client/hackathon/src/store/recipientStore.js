// src/store/recipientStore.js
import { create } from "zustand";
import axios from "axios";

const recipientStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  recipients: [],
  recipient: null,  // single recipient profile
  isAuthenticated: false, // track login state

  // Create recipient profile
  createRecipient: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/createrecipient`,
        data,
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );

      set({
        isLoading: false,
        message: res.data.message,
        recipient: res.data.data,
        isAuthenticated: true, // mark as logged in
      });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Login recipient
  loginRecipient: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      // Store token in localStorage
      if (res.data.data?.token) {
        localStorage.setItem("token", res.data.data.token);
      }

      set({
        isLoading: false,
        recipient: res.data.data,
        message: res.data.message,
        isAuthenticated: true,
      });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Logout recipient
  logoutRecipient: () => {
    localStorage.removeItem("token");
    set({
      recipient: null,
      message: "Logged out successfully",
      isAuthenticated: false,
    });
  },

  // Get recipient by ID
  getRecipientById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/getrecipientbyid/${id}`,
        { 
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );
      set({ recipient: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Get recipient profile (current user)
  getRecipientProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/getrecipientprofile`,
        { 
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );
      set({ recipient: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Update recipient profile
  updateRecipientProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/updaterecipientprofile`,
        data,
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );

      set({
        isLoading: false,
        recipient: res.data.data,
        message: res.data.message,
      });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Get all recipients
  getAllRecipients: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/recipients/getallrecipients`,
        { 
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          params: filters
        }
      );
      set({ recipients: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false,
      });
      throw err;
    }
  },

  // Clear error message
  clearError: () => set({ error: null }),
  
  // Clear success message
  clearMessage: () => set({ message: null }),
}));

export default recipientStore;