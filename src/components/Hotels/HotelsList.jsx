import { motion } from "framer-motion";
import Hotel from "./Hotel";

const HotelsList = ({ hotels, handleHotelSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 h-full md:h-screen bg-slate-200 rounded-r-md overflow-y-auto">
        <div className="flex gap-2 items-center justify-center">
          <hr className="w-full border-gray-300"></hr>
          <h1 className="text-center font-semibold text-lg text-gray-600">
            Hotels
          </h1>
          <hr className="w-full border-gray-300"></hr>
        </div>
        {hotels.map((hotel) => (
          <Hotel
            hotel={hotel}
            key={hotel._id}
            handleHotelSelect={handleHotelSelect}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HotelsList;
