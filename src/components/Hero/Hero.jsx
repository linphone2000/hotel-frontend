import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { motion } from "framer-motion";

const Hero = ({ onClick }) => {
  const navigate = useNavigate();
  return (
    <section id="hero-section">
      <img src="assets/myanmar4k.jpeg" alt="Hero image" />
      <div className="hero-overlay"></div>
      <motion.div
        className="brand-container p-5 flex flex-col gap-6"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-slate-100 font-light text-5xl hero-heading">
          Explore Your Next Adventure
        </h1>
        <p className="text-slate-100 text-lg">
          Find the perfect accommodations for your next trip
        </p>
        <button
          onClick={() => navigate("/hotels")}
          className="pri-btn-outline text-slate-100 px-6 py-3 w-48 text-center rounded-lg transition-colors duration-300"
        >
          Find Your Hotel
          <i className="fa-solid fa-chevron-right ml-2 animate-pulse"></i>
        </button>
      </motion.div>
      <div
        id="features-section"
        onClick={onClick}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 hover:cursor-pointer translate-y-1/2  animate-bounce"
      >
        <i className="fa-solid fa-angles-down text-slate-100 text-2xl rounded-lg transition-all hover:border p-2"></i>
      </div>
    </section>
  );
};

export default Hero;
