// React
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Components
import Navbar from "./components/Navbar/Navbar";
// Context
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { UIModalProvider } from "./context/UIModalContext";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import HotelsPage from "./pages/HotelsPage";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <DataProvider>
        <UIModalProvider>
          <AuthProvider>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </UIModalProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
