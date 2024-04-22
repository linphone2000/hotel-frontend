import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation properties
      animate={{ opacity: 1, y: 0 }} // Animation properties when component is mounted
      transition={{ duration: 0.5 }} // Transition duration
      className="p-10 text-xl"
    >
      <p className="p-10 text-xl">
        Cozy Boutique Hotel: Experience the charm and intimacy of [Hotel Name],
        your haven in the heart of [city name]. Our boutique hotel boasts a
        unique character and personalized service. Each of our thoughtfully
        designed rooms offers a sense of comfort and style. Savor a delicious
        breakfast in our charming cafe, and explore the vibrant culture and
        attractions on our doorstep. At [Hotel Name], we believe in creating a
        warm and welcoming atmosphere where guests feel like cherished friends.
      </p>
    </motion.div>
  );
};

export default About;
