import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { motion } from "framer-motion";
import "./Hotels.css";

const Hotels = () => {
  // Consumer
  const {
    hotels,
    setSelectedHotel,
    selectedRooms,
    loading,
    hotelLoading,
    flaskAPI,
  } = useData();

  // State
  const [imageLoading, setImageLoading] = useState(true); // Hotel
  const [roomImageloading, setRoomImageLoading] = useState(true); //Room

  // Effect
  useEffect(() => {
    setRoomImageLoading(true);
  }, [selectedRooms]);

  // Handler
  const handleLoad = () => {
    setImageLoading(false);
  };
  const handleRoomLoad = () => {
    setRoomImageLoading(false);
  };

  return (
    <>
      <div className="grid-container">
        {/* Left panel */}
        <motion.div
          className="col1 bg-gray-200"
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
                onClick={() => setSelectedHotel(hotel._id)}
                className="text-center transition duration-300 ease-in-out hover:shadow-md cursor-pointer"
                key={index}
              >
                <p className="text-lg">{hotel.name}</p>
                <p>{hotel.city}</p>
                <div className="image-container">
                  {imageLoading && (
                    <div className="animate-spin mx-auto my-4 rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  )}{" "}
                  <img
                    className={`h-20 w-32 object-cover mx-auto ${
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

        {/* Right panel */}
        <div className="col2 bg-gray-400">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              {" "}
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : selectedRooms.length > 0 ? (
            <motion.ul
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              {selectedRooms.map((room) => (
                <li key={room._id}>
                  <p>Room Number: {room.room_number}</p>
                  <p>Room Type: {room.room_type}</p>
                  <p>Description: {room.description}</p>
                  <p>Max Occupancy: {room.max_occupancy}</p>
                  <p>Price: {room.price}</p>
                  <div className="image-container">
                    {roomImageloading && (
                      <div className="animate-spin my-4 rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    )}{" "}
                    <img
                      className={`h-20 w-32 object-cover ${
                        roomImageloading ? "hidden" : ""
                      }`}
                      src={`${flaskAPI}/get_image/${room.image}`}
                      alt="Room Image"
                      onLoad={handleRoomLoad}
                    />
                  </div>
                  <hr></hr>
                </li>
              ))}
            </motion.ul>
          ) : (
            <p>No rooms selected</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Hotels;
