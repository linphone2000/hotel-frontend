// React
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Components
import Modal from "./components/Modal/Modal";
import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm/AuthForm";
// Context
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { UIModalProvider } from "./context/UIModalContext";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import HotelsPage from "./pages/HotelsPage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <DataProvider>
        <UIModalProvider>
          <AuthProvider>
            <ToastContainer />
            <Modal>
              <AuthForm />
            </Modal>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/hotels" element={<HotelsPage />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </UIModalProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
