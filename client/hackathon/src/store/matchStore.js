// src/store/matchStore.js
import { create } from "zustand";
import axios from "axios";

const matchStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  matches: [],
  match: null, 


  getAllMatches: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches/getAllMatches`);
      set({ matches: res.data.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
    }
  },


  getMatchById: async (matchId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches/getMatchById/${matchId}`);
      set({ match: res.data.data, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      throw err;
    }
  },


  updateMatchStatus: async (matchId, status) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/matches/updateMatchStatus/${matchId}`, { status });
      set({ message: res.data.message, isLoading: false });


      const updatedMatches = get().matches.map(m =>
        m._id === matchId ? { ...m, status } : m
      );
      set({ matches: updatedMatches });

      return res.data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      throw err;
    }
  },

 
  updateRequestStatusByMatchId: async (matchId, status) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/matches/updateRequestStatusByMatchId/${matchId}`, { status });
      set({ message: res.data.message, isLoading: false });
      return res.data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      throw err;
    }
  },

}));

export default matchStore;
