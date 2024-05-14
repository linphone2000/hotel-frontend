import React, { useEffect, useRef, useState } from "react";
import "./AuthForm.css";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useUIModal } from "../../context/UIModalContext";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner/Spinner";

function AuthForm() {
  // States
  const [mode, setMode] = useState("login");
  const [isAnimated, setIsAnimated] = useState(false);
  const [isRegisteredMode, setIsRegisteredMode] = useState(false);
  const [logging, setLogging] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  // Inputs
  const inputs = [
    { label: "Email:", ref: emailRef, type: "text", required: true },
    { label: "Password:", ref: passwordRef, type: "password", required: true },
    ...(mode === "register"
      ? [
          { label: "Name:", ref: fullNameRef, type: "text", required: true },
          { label: "Phone:", ref: phoneRef, type: "text", required: true },
          { label: "Address:", ref: addressRef, type: "text", required: true },
        ]
      : []),
  ];

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
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Effect
  // useEffect(() => {
  //   emailRef.current.value = "";
  //   passwordRef.current.value = "";
  // }, []);

  // Handlers
  const handleModeChange = () => {
    setIsAnimated(true);
    setIsRegisteredMode((prev) => !prev);
    setTimeout(() => {
      setMode(mode === "login" ? "register" : "login");
      setIsAnimated(false);
    }, 500);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogging(true);
    const userData = {
      email: emailRef.current.value,
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
        const response = await login(userData.email, userData.password);
        if (response) {
          console.log(response);
          setLogging(false);
        }
      } else {
        // Register
        const response = await register(userData);
        const isRegistered = response.data.is_registered;
        if (isRegistered) {
          showToast("success", response.data.message);
          setIsRegisteredMode((prev) => !prev);
          setMode("login");
          setLogging(false);
        } else {
          showToast("error", response.data.message);
          setLogging(false);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast("error", "Email already taken!");
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
        {/* Left Pane */}
        <div className="image-container flex justify-center ">
          <img src="assets/loginform.jpeg" className="max-h-screen" />
        </div>

        {/* Right Pane */}
        <div className="auth-form-container relative">
          <motion.h2
            variants={textVariants}
            animate={isAnimated ? "animate" : "initial"}
          >
            {mode === "login" ? "Login" : "Register"}
          </motion.h2>

          {/* Form */}
          <motion.form
            key={mode}
            variants={textVariants}
            animate={isAnimated ? "animate" : "initial"}
            onSubmit={handleSubmit}
            transition={{ staggerChildren: 0.1 }}
          >
            {inputs.map((input, index) => (
              <div key={index}>
                <label>{input.label}</label>
                <motion.input
                  ref={input.ref}
                  type={input.type}
                  required={input.required}
                  variants={textVariants}
                />
              </div>
            ))}

            {/* Submit */}
            <div className="button-container relative">
              <motion.button
                variants={textVariants}
                animate={isAnimated ? "animate" : "initial"}
                className="pri-btn"
                type="submit"
              >
                {mode === "login" ? "Login" : "Register"}
              </motion.button>
              {logging && (
                <div className="absolute left-3/4 transform -translate-x-3/4">
                  <Spinner />
                </div>
              )}
            </div>
          </motion.form>

          {/* Mode Change */}
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
