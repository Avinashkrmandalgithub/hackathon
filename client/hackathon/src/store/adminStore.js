import { create } from "zustand";
import axios from "axios";

const adminStore = create((set) => ({
  isLoading: false,
  error: null,
  message: null,
  approvals: [],
  admin: null,
  isAuthenticated: null,

  registerAdmin: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/register`,
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
          isLoading: false,
          message: response.data.message,
          admin: null,
          isAuthenticated: false,
        });

        return data;
      } else {
        throw new Error("failed to register admin");
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  // admin login
  loginAdmin: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
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
          admin: response.data.data.admin,
          isAuthenticated: true,
          isLoading: false,
        });

        // console.log("from store", response.data.data)
        // handleSuccess(response.data.message);
        // navigate("/");
      } else {
        set({ admin: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: error.message });
      // console.error('Error:', error.response?.data?.message || error.message);
      //   handleError(error.response?.data?.message || error.message);
      throw error;
    }
  },

  logoutAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/logout`,
        {
          withCredentials: true,
        }
      );

      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      // console.error('Error:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  fetchAdmin: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/profile`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        set({ admin: response.data.data, isAuthenticated: true });
        // console.log("from store", response.data.data);
        // handleSuccess(response.data.message);
      } else {
        set({ admin: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ admin: null, isAuthenticated: false });
      // handleError(error.response?.data?.message || error.message);
      throw error;
    }
  },

  updateProfile: async (data) => {
      set({ isLoading: true, error: null });
  
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/admin/update`,
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
            message: response.data.message,
            isLoading: false,
          });
  
          // console.log("from store", response.data.data)
          // handleSuccess(response.data.message);
          // navigate("/");
        } 
        // else {
        //   set({ isLoading: false });
        // }
      } catch (error) {
        set({ isLoading: false, error: error.message });
        // console.error('Error:', error.response?.data?.message || error.message);
      //   handleError(error.response?.data?.message || error.message);
        throw error;
      }
    },

    adminIdPass: null,

    generatePassword: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/password/generate`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        set({ isLoading: false, message: response.data.message, adminIdPass: response.data.data });
        // console.log("from store", response.data.data);
        // handleSuccess(response.data.message);
      } 

    } catch (error) {
      set({ isLoading: false, error: error.message});
      // handleError(error.response?.data?.message || error.message);
      throw error;
    }
  },
  
}));

export default adminStore;
