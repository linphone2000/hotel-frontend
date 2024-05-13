// Hooks
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// CSS
import "./FeatureCard.css";

const FeatureCard = ({ index, title, description, image }) => {
  // Navigation
  const navigate = useNavigate();

  // Observer
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className={`pb-1 md:pb-6 gap-2 md:gap-5 flex flex-col ${
          index % 2 == 0 ? "md:flex-row-reverse" : "md:flex-row"
        } justify-between feature-card`}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: inView ? 0 : index % 2 == 0 ? 50 : -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <img
            className="w-full h-full object-contain mb-2 rounded-sm"
            src={image}
            alt="Feature Image"
          />
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: inView ? 0 : index % 2 == 0 ? -50 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-2 flex flex-col justify-evenly w-full md:w-1/2 items-center"
        >
          <h3 className="text-2xl font-normal">{title}</h3>
          <hr className="bg-slate-400 w-3/4"></hr>
          <p className="text-gray-700 text-justify">{description} </p>
          <button
            onClick={() => navigate("/hotels")}
            className="pri-btn mt-2 font-normal"
          >
            Explore
          </button>
        </motion.div>
      </motion.div>
      <hr className="border-gray-300 w-full"></hr>
    </div>
  );
};

export default FeatureCard;
