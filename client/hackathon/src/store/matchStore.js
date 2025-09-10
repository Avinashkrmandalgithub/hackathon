// src/store/matchStore.js
import { create } from "zustand";
import axios from "axios";

const matchStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  matches: [],
  match: null,

  // Manual trigger for matching process (admin only)
  manualMatch: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/match/manual-match`,
        {},
        { 
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );
      set({ 
        message: res.data.message, 
        isLoading: false 
      });
      return res.data.data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message, 
        isLoading: false 
      });
      throw err;
    }
  },

  // Get all matches
  getAllMatches: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/match/getAllMatches`,
        { 
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          params: filters
        }
      );
      set({ matches: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message, 
        isLoading: false 
      });
      throw err;
    }
  },

  // Get match by ID
  getMatchById: async (matchId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/match/getMatchById/${matchId}`,
        { 
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      set({ match: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message, 
        isLoading: false 
      });
      throw err;
    }
  },

  // Update match status (admin only)
  updateMatchStatus: async (matchId, status) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/match/updateMatchStatus/${matchId}`, 
        { status },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );
      set({ 
        message: res.data.message, 
        isLoading: false 
      });

      // Update local state
      const updatedMatches = get().matches.map(m =>
        m._id === matchId ? { ...m, status } : m
      );
      set({ matches: updatedMatches });

      return res.data.data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message, 
        isLoading: false 
      });
      throw err;
    }
  },

  // Update request status by match ID (admin only)
  updateRequestStatusByMatchId: async (matchId, status) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/match/updateRequestStatusByMatchId/${matchId}`, 
        { status },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          } 
        }
      );
      set({ 
        message: res.data.message, 
        isLoading: false 
      });
      return res.data.data;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message, 
        isLoading: false 
      });
      throw err;
    }
  },

  // Clear error message
  clearError: () => set({ error: null }),
  
  // Clear success message
  clearMessage: () => set({ message: null }),
}));

export default matchStore;