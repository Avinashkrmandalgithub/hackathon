import { create } from "zustand";
import axios from "axios";

const userStore = create((set, get) => ({
  isLoading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,

  signUp: async (updatedDetails) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
                updatedDetails,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // console.log("from store", response.data);
        // handleSuccess("OTP send Successfully");
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
      // console.log('User Data:', response.data, response.data.message);
    } catch (error) {
      set({ isLoading: false, error: error.message });
      // console.error('Error:', error.response?.data?.message || error.message);
      handleError(error.response?.data?.message || error.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logIn: async (data, setIsSwitch, setMore, navigate) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
                data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        set({
          user: response.data.data.user,
          isAuthenticated: true,
          isLoading: false,
        });

        // console.log("from store", response.data.data)
        // handleSuccess(response.data.message);
        // navigate("/");
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
      // console.error('Error:', error.response?.data?.message || error.message);
    //   handleError(error.response?.data?.message || error.message);
      throw error;
    }
  },

  logOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

    } catch (error) {
      set({ isLoading: false, error: error.message });
      // console.error('Error:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  fetchAuth: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        set({ user: response.data.data, isAuthenticated: true });
        // console.log("from store", response.data.data);
        // handleSuccess(response.data.message);
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      // handleError(error.response?.data?.message || error.message);
      throw error;
    }
  },
}));

export default userStore;
