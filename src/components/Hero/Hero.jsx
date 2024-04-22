import "./Hero.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero-section">
      <img src="assets/hero.webp" alt="Hero image" />
      <div className="hero-overlay"></div>
      <div className="brand-container p-5">
        <motion.h1
          initial={{ opacity: 0, x: -100 }} // Initial animation properties
          animate={{ opacity: 1, x: 0 }} // Animation properties when component is mounted
          transition={{ duration: 0.5 }} // Transition duration
          className="text-stone-100 text-8xl"
        >
          U Thein Kyaw
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
