import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-10 text-xl h-screen"
    >
      <p className="p-10 text-justify text-xl">
        Explore a world of possibilities with our diverse collection of hotels,
        each offering its own unique charm and character. From boutique gems
        nestled in quaint neighborhoods to luxurious skyscrapers with
        breathtaking city views, we have something to suit every taste and
        preference. Whether you're seeking a romantic getaway, a family-friendly
        retreat, or a vibrant urban escape, our curated selection ensures that
        you'll find the perfect accommodation for your next adventure. With a
        focus on impeccable service, exceptional amenities, and unparalleled
        comfort, each of our hotels promises a memorable stay that exceeds your
        expectations. Discover your ideal home away from home and make your next
        journey truly extraordinary.
      </p>
    </motion.div>
  );
};

export default About;
