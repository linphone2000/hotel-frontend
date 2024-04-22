import React, { useEffect, useRef, useState } from "react";
import "./AuthForm.css";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useUIModal } from "../../context/UIModalContext";
import { useAuth } from "../../context/AuthContext";

function AuthForm() {
  // States
  const [mode, setMode] = useState("login");
  const [isAnimated, setIsAnimated] = useState(false);
  const [isRegisteredMode, setIsRegisteredMode] = useState(false);

  // Refs
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  // Context
  const { showToast } = useUIModal();
  const { register, login } = useAuth();

  // Animations
  const textVariants = {
    initial: {
      opacity: 1,
      scale: 1,
    },
    animate: {
      opacity: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  // Effect
  useEffect(() => {
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  }, []);

  // Handlers
  const handleModeChange = () => {
    setIsAnimated((prev) => !prev);
    setIsRegisteredMode((prev) => !prev);
    setTimeout(() => {
      setMode(mode === "login" ? "register" : "login");
      setIsAnimated(false);
    }, 300);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (mode === "register") {
      userData.fullName = fullNameRef.current.value;
      userData.phone = phoneRef.current.value;
      userData.address = addressRef.current.value;
    }
    try {
      // Login
      if (mode === "login") {
        login(userData.username, userData.password);
      } else {
        // Register
        const response = await register(userData);
        const isRegistered = response.data.is_registered;
        if (isRegistered) {
          showToast("success", response.data.message);
          setIsRegisteredMode((prev) => !prev);
          setMode("login");
        } else {
          showToast("error", response.data.message);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast("error", "Username already taken!");
      } else {
        showToast("error", "Invalid credentials!");
      }
    }
  };

  return (
    <>
      <div
        className={`flex flex-row wrapper-container ${
          isRegisteredMode == true ? "expended" : ""
        }`}
      >
        <div className="image-container flex justify-center ">
          <img src="assets/loginform.jpeg" className="max-h-screen" />
        </div>
        <div className="auth-form-container">
          <motion.h2
            variants={textVariants}
            animate={isAnimated ? "animate" : "initial"}
          >
            {mode === "login" ? "Login" : "Register"}
          </motion.h2>
          <motion.form
            variants={textVariants}
            animate={isAnimated ? "animate" : "initial"}
            onSubmit={handleSubmit}
            transition={{ staggerChildren: 0.1 }}
          >
            <div>
              <label>Username:</label>
              <motion.input
                ref={usernameRef}
                type="text"
                variants={textVariants}
                required={true}
              />
            </div>
            <div>
              <label>Password:</label>
              <motion.input
                ref={passwordRef}
                type="password"
                variants={textVariants}
                required={true}
              />
            </div>
            {mode === "register" && (
              <>
                <div>
                  <label>Full Name:</label>
                  <motion.input
                    type="text"
                    ref={fullNameRef}
                    variants={textVariants}
                    required={true}
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <motion.input
                    type="text"
                    ref={phoneRef}
                    variants={textVariants}
                    required={true}
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <motion.input
                    type="text"
                    ref={addressRef}
                    variants={textVariants}
                    required={true}
                  />
                </div>
              </>
            )}
            <div className="button-container">
              <motion.button
                variants={textVariants}
                animate={isAnimated ? "animate" : "initial"}
                className="pri-btn"
                type="submit"
              >
                {mode === "login" ? "Login" : "Register"}
              </motion.button>
            </div>
          </motion.form>

          <motion.p
            variants={textVariants}
            animate={isAnimated ? "animate" : "initial"}
          >
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button onClick={handleModeChange}>
              {mode === "login" ? "Register here" : "Login here"}
            </button>
          </motion.p>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
