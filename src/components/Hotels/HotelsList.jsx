import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import Hotel from "./Hotel";
import Spinner from "../Spinner/Spinner";

const HotelsList = ({ handleHotelSelect }) => {
  const { hotels, hotelsLoading } = useData();

  return (
    <motion.div
      className="col-span-2 p-4 bg-gray-200 h-screen overflow-y-auto"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {hotelsLoading ? (
        <Spinner />
      ) : (
        hotels.map((hotel, index) => (
          <Hotel
            hotel={hotel}
            key={index}
            handleHotelSelect={handleHotelSelect}
          />
        ))
      )}
    </motion.div>
  );
};

export default HotelsList;
