import React, { createContext, useState, useEffect } from "react";
import { signin, signup, signout, getCurrentUser } from "../api/Auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if user data exists in localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          console.log('User restored from localStorage:', userData);
        } else {
          // Optionally try to fetch current user from server
          // Uncomment this when you have proper auth middleware
          // const response = await getCurrentUser();
          // if (response.data?.user) {
          //   setUser(response.data.user);
          //   setIsAuthenticated(true);
          // }
        }
      } catch (error) {
        console.log('No valid authentication found');
        // Clear any invalid stored data
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSignin = async (email, password) => {
    try {
      setLoading(true);
      const res = await signin(email, password);
      // Extract user from response data
      const userData = res.data?.data?.user || res.data?.user || res.data?.data;
      console.log('Login response:', res.data);
      console.log('Setting user:', userData);
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      // Persist user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      return res;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (fullName, email, password) => {
    try {
      setLoading(true);
      const res = await signup(fullName, email, password);
      return res;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async () => {
    try {
      setLoading(true);
      await signout();
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear persisted data
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('donorProfile');
      localStorage.removeItem('patientProfile');
      
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Signout error:', error);
      // Even if API call fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated, 
      handleSignin, 
      handleSignup, 
      handleSignout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
