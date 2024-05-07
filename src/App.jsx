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
import Bookings from "./pages/Bookings";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <Router>
      <DataProvider>
        <UIModalProvider>
          <AuthProvider>
            <BookingProvider>
              <ToastContainer />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookings" element={<Bookings />} />
              </Routes>
              <Footer />
            </BookingProvider>
          </AuthProvider>
        </UIModalProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
