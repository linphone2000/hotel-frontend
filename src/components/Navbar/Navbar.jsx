import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItems/NavItem";

const Navbar = () => {
  // Providers
  const { handleOpenModal } = useUIModal();
  const { logout } = useAuth();
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="origin-center absolute top-12 right-6 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="py-1">
                {/* Home */}
                <NavItem handleNavigation={handleNavigation} route={"/"}>
                  Home
                </NavItem>

                {/* About */}
                <NavItem handleNavigation={handleNavigation} route={"/about"}>
                  About
                </NavItem>
                <hr></hr>

                {/* User Profile */}
                {currentUser && (
                  <NavItem
                    handleNavigation={handleNavigation}
                    route={"/profile"}
                  >
                    My Profile
                  </NavItem>
                )}

                {/* User Bookings */}
                {currentUser && (
                  <NavItem
                    handleNavigation={handleNavigation}
                    route={"/bookings"}
                  >
                    My Bookings
                  </NavItem>
                )}

                {/* User Favourite */}
                {currentUser && (
                  <NavItem
                    handleNavigation={handleNavigation}
                    route={"/favorites"}
                  >
                    My Favorites
                  </NavItem>
                )}

                {/* Login/Register */}
                <NavItem
                  handleNavigation={handleNavigation}
                  onClick={currentUser ? logout : handleOpenModal}
                >
                  {currentUser ? "Logout" : "Login"}
                </NavItem>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
