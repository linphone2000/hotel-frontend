import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useData } from "./DataContext";
import { useUIModal } from "./UIModalContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States
  const [currentUser, setCurrentUser] = useState(null);
  const { flaskAPI } = useData();
  const { showToast, handleCloseModal } = useUIModal();
  const navigate = useNavigate();

  // Fetching for logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Closing modal after successful login
  useEffect(() => {
    if (currentUser) {
      handleCloseModal();
    }
  }, [currentUser]);

  // Handlers
  // Register
  const register = async (userData) => {
    const email = userData.email;
    const password = userData.password;
    const fullName = userData.fullName;
    const phone = userData.phone;
    const address = userData.address;
    const response = await axios.post(flaskAPI + "/register", {
      email,
      password,
      fullName,
      phone,
      address,
    });
    return response;
  };

  // Login
  const login = async (email, password) => {
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
