import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import HotelInfo from "./HotelInfo/HotelInfo";
import Room from "./Room";
import Spinner from "../Spinner/Spinner";

const RoomsList = ({}) => {
  const { loading, selectedRooms, selectedHotelData } = useData();

  return (
    <div className="col-span-6 p-4 bg-mycolor h-screen overflow-y-auto">
      {/* Hotel Info */}
      {selectedHotelData ? <HotelInfo /> : <></>}

      {/* Rooms */}
      {loading ? (
        <Spinner />
      ) : selectedRooms.length > 0 ? (
        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4"
        >
          {selectedRooms.map((room) => (
            <Room key={room._id} room={room} />
          ))}
        </motion.ul>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <i className="fa-solid fa-circle-exclamation text-gray-500 text-5xl"></i>
          <p className="text-gray-500 text-lg">Please select a hotel to get started.</p>
        </div>
      )}
    </div>
  );
};

export default RoomsList;
