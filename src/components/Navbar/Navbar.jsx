import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";

const Navbar = () => {
  // Providers
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // States
  const [isOpen, setIsOpen] = useState(false);

  // Effect
  useEffect(() => {
    setIsOpen(false);
  }, [currentUser]);

  // Handler
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar text-lg"
    >
      {/* Logo */}
      <div className="navbar-brand">
        <a
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="logo rounded-md transition-colors hover:bg-mycolor">
            <img className="w-32 px-5 py-2" src="assets/Logo-Transparent.png" />
          </div>
        </a>
      </div>

      {/* Dummy */}
      {/* <p>{currentUser ? currentUser : ""}</p> */}

      {/* Right side of nav */}
      <ul className="nav-links">
        <li>
          <button onClick={handleOpen} className="">
            <i className="fa-solid fa-bars text-white text-xl transition-all border-transparent hover:text-slate-600 hover:border hover:border-slate-600 hover:rounded-md"></i>
          </button>
        </li>
        <Dropdown isOpen={isOpen} handleNavigation={handleNavigation} />
      </ul>
    </motion.nav>
  );
};

export default Navbar;
