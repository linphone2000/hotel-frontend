import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";

const HotelsList = ({ handleHotelSelect, handleLoad }) => {
  const { hotels, imageLoading, hotelLoading, flaskAPI } = useData();

  return (
    <motion.div
      className="col-span-2 p-4 bg-gray-200 h-screen overflow-y-auto"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {hotelLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        hotels.map((hotel, index) => (
          <div
            onClick={() => handleHotelSelect(hotel._id)}
            className="text-center transition duration-300 ease-in-out hover:shadow-md cursor-pointer"
            key={index}
          >
            <p className="text-lg">{hotel.name}</p>
            <p>{hotel.city}</p>
            <div className="relative w-full h-full">
              {imageLoading && (
                <div className="animate-pulse my-2">
                  <img
                    className="rounded-md mx-auto h-32 w-52"
                    src="assets/placeholder.png"
                  />
                </div>
              )}
              <img
                className={`h-32 w-52 my-2 object-cover mx-auto rounded-md ${
                  imageLoading ? "hidden" : ""
                }`}
                src={`${flaskAPI}/get_image/${hotel.image}`}
                alt="Hotel Image"
                onLoad={handleLoad}
              />
            </div>
            <hr className="bg-slate-500 my-4"></hr>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default HotelsList;
