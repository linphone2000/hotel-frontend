// React
import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
// Providers
import { useData } from "./DataContext";
import { useUIModal } from "./UIModalContext";
// Imports

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Navigate
  const navigate = useNavigate();

  // Context
  const { flaskAPI } = useData();
  const { showToast, handleCloseModal } = useUIModal();

  // States
  const [currentUser, setCurrentUser] = useState(null);

  // Fetching for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser !== undefined) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        fetchUserWithID(parsedUser._id);
      }
    }
  }, []);

  // Closing modal after successful login
  useEffect(() => {
    if (currentUser) {
      handleCloseModal();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser);
    }
  }, [currentUser]);

  // Handlers
  // Register
  const register = async (userData) => {
    try {
      const { email, password, fullName, phone, address } = userData;

      // Form Data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("address", address);

      const response = await axios.post(`${flaskAPI}/register`, formData, {});

      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    showToast("info", "Logging in...");
    const response = await axios.post(flaskAPI + "/login", {
      email,
      password,
    });
    if (response.data.user) {
      const user = response.data.user;
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      showToast("success", response.data.message);
    } else if (response.status == 204) {
      showToast("error", "User doesn't exists");
    } else {
      showToast("error", response.data.message);
    }
  };

  // Update and Fetch Current User
  const updateUser = async (formData) => {
    const response = await axios.post(
      flaskAPI + "/useredit/" + currentUser._id,
      formData
    );
    if (response.status == 200) {
      const user = response.data.user;
      setCurrentUser(user);
      localStorage.removeItem("currentUser");
      localStorage.setItem("currentUser", JSON.stringify(user));
      showToast("success", "User updated successfully!");
    } else {
      showToast("error", "Error updating user");
    }
  };

  // Re-fetch user manually
  const fetchUser = async () => {
    const response = await axios.post(
      flaskAPI + "/fetch_user/" + currentUser._id
    );
    if (response.status == 200) {
      const user = response.data.user;
      setCurrentUser(user);
      localStorage.removeItem("currentUser");
      localStorage.setItem("currentUser", JSON.stringify(user));
      // console.log("User fetched");
    } else {
      console.log("User fetching error");
    }
  };

  // Re-fetch user manually
  const fetchUserWithID = async (userID) => {
    const response = await axios.post(flaskAPI + "/fetch_user/" + userID);
    if (response.status == 200) {
      const user = response.data.user;
      setCurrentUser(user);
      localStorage.removeItem("currentUser");
      localStorage.setItem("currentUser", JSON.stringify(user));
      // console.log("User fetched");
    } else {
      console.log("User fetching error");
    }
  };

  // Logout
  const logout = () => {
    navigate("/");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    showToast("info", "Loggout out!");
  };

  // Memo
  const authContextValue = useMemo(
    () => ({
      currentUser,
      updateUser,
      fetchUser,
      setCurrentUser,
      register,
      login,
      logout,
    }),
    [currentUser]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
