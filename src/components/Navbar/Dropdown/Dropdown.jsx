// React
import { AnimatePresence, motion } from "framer-motion";
// Context
import { useUIModal } from "../../../context/UIModalContext";
import { useAuth } from "../../../context/AuthContext";
// Components
import NavItem from "../NavItems/NavItem";

const Dropdown = ({ isOpen, handleNavigation }) => {
  // Context
  const { handleOpenModal, handleSetModalForm } = useUIModal();
  const { currentUser, logout } = useAuth();

  // Handler
  const handleLoginClicked = () => {
    handleSetModalForm("login");
    handleOpenModal();
  };

  return (
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
              <NavItem handleNavigation={handleNavigation} route={"/profile"}>
                My Profile
              </NavItem>
            )}

            {/* User Bookings */}
            {currentUser && (
              <NavItem handleNavigation={handleNavigation} route={"/bookings"}>
                My Bookings
              </NavItem>
            )}

            {/* User Favourite */}
            {currentUser && (
              <NavItem handleNavigation={handleNavigation} route={"/favourites"}>
                My Favourites
              </NavItem>
            )}

            {/* Login/Register */}
            <NavItem
              handleNavigation={handleNavigation}
              onClick={currentUser ? logout : handleLoginClicked}
            >
              {currentUser ? "Logout" : "Login"}
            </NavItem>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
