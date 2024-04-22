import React from "react";
import { motion } from "framer-motion";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { handleOpenModal } = useUIModal();
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-brand">
        <a onClick={() => navigate("/")}>
          <span className="logo">Logo</span>
        </a>
      </div>
      <p>{currentUser ? currentUser : ""}</p>
      <ul className="nav-links">
        <li>
          <a onClick={() => navigate("/about")}>About</a>
        </li>
        <li>
          <a onClick={currentUser ? logout : handleOpenModal}>
            {currentUser ? "Logout" : "Login"}
          </a>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
