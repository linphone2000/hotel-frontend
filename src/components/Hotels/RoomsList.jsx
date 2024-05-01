import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import HotelInfo from "./HotelInfo";

const RoomsList = ({ roomImageloading, handleRoomLoad }) => {
  const { loading, selectedRooms, flaskAPI, selectedHotelData } = useData();

  return (
    <div className="col-span-6 p-4 bg-mycolor h-screen overflow-y-auto">
      {/* Hotel Info */}
      {selectedHotelData ? <HotelInfo /> : <></>}

      {/* Rooms */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : selectedRooms.length > 0 ? (
        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4"
        >
          {selectedRooms.map((room) => (
            <li key={room._id}>
              <p>Room Number: {room.roomNumber}</p>
              <p>Room Type: {room.roomType}</p>
              <p>Description: {room.description}</p>
              <p>Max Occupancy: {room.maxOccupancy}</p>
              <p>Price: {room.price}</p>
              <div className="hotel-image-container">
                {roomImageloading && (
                  <div className="animate-pulse my-2">
                    <img
                      className="rounded-md h-32 w-52"
                      src="assets/placeholder.png"
                    />
                  </div>
                )}
                <img
                  className={`h-32 w-52 my-2 object-cover rounded-md ${
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
        <p>No hotel selected</p>
      )}
    </div>
  );
};

export default RoomsList;
