import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 md:px-20">
      {/* Heading */}
      <h1 className="text-3xl mb-10 font-bold text-center md:text-left">
        About Us
      </h1>

      {/* Upper div */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 mb-7">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            className="object-cover h-64 w-full max-w-md rounded-lg"
            src="https://i.pinimg.com/564x/d6/0f/24/d60f2437553335633d4557615bac7fe2.jpg"
            alt="Our Story"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-justify px-4 md:px-0"
        >
          <h1 className="text-lg uppercase font-bold mb-2">Our Story</h1>
          <p>
            Welcome to our hotel booking platform, your gateway to a diverse
            array of exceptional accommodations. Since our inception, we have
            dedicated ourselves to curating a selection of hotels that offer
            unparalleled comfort and luxury. Our story is rooted in a passion
            for hospitality and a commitment to providing guests with
            unforgettable experiences.
          </p>
          <p>
            From cozy boutique hotels to grand resorts, our platform brings
            together a wide range of properties, each with its own unique charm
            and amenities. We continuously strive to enhance our offerings,
            ensuring that every hotel listed meets our high standards of
            excellence. Our mission is to make your stay as seamless and
            enjoyable as possible, no matter where you choose to rest your head.
          </p>
        </motion.div>
      </div>

      {/* Lower div */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-justify px-4 md:px-0"
        >
          <h1 className="text-lg uppercase font-bold mb-2">Our Mission</h1>
          <p>
            Our mission is to connect travelers with the perfect hotel to suit
            their needs and preferences. We believe that a great stay starts
            with the right choice of accommodation, and we are dedicated to
            offering a broad spectrum of options to ensure that every guest
            finds their ideal match.
          </p>
          <p>
            Whether you're looking for a serene retreat, a family-friendly
            resort, or a bustling city center hotel, our platform provides
            detailed information, reviews, and seamless booking processes to
            help you make informed decisions. We are committed to delivering
            exceptional service and ensuring that your travel experience is both
            convenient and memorable.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            className="object-cover h-64 w-full max-w-md rounded-lg"
            src="https://i.pinimg.com/564x/d6/0f/24/d60f2437553335633d4557615bac7fe2.jpg"
            alt="Our Mission"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
