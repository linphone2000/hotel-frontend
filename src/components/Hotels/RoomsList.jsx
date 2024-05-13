import Select from "react-select";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import HotelInfo from "./HotelInfo/HotelInfo";
import Room from "./Room";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";
import { _capitalize } from "chart.js/helpers";

const RoomsList = ({ showHotelsList, handleShowHide }) => {
  // States
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Context
  const { loading, selectedRooms, selectedHotelData } = useData();

  // Filter
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const uniqueRoomTypes = Array.from(
    new Set(selectedRooms.map((room) => room.roomType))
  );

  // Selections
  const options = uniqueRoomTypes.map((roomType) => ({
    value: roomType,
    label: _capitalize(roomType),
  }));

  // Handler
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const query = selectedOption.label.toLowerCase();
    const filteredRooms = selectedRooms.filter((room) =>
      room.roomType.toLowerCase().includes(query)
    );
    setFilteredRooms(filteredRooms);
  };
  const handleClear = () => {
    setFilteredRooms([]);
    setSelectedOption(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.1 }}
      className="col-span-6 px-4 pb-4 bg-mycolor md:h-screen overflow-y-auto h-full"
    >
      {/* Hotel Info */}
      {selectedHotelData ? <HotelInfo /> : <></>}

      {/* Rooms */}
      {loading ? (
        <Spinner />
      ) : selectedRooms.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          className=""
        >
          {/* Heading */}
          <h1 className="text-center text-2xl font-semibold pt-4">
            Available Rooms
          </h1>
          <hr className="my-2 border-slate-300"></hr>

          {/* Filter */}
          <div className="flex gap-2 relative justify-center md:justify-end">
            {/* Select */}
            {/* Clear */}
            {filteredRooms.length > 0 && (
              <button
                className="text-red-400 transition-all underline hover:text-red-500"
                onClick={handleClear}
              >
                Clear{" "}
              </button>
            )}
            <Select
              className="w-1/2 md:w-1/4 md:pe-4"
              value={selectedOption}
              options={options}
              onChange={handleOptionChange}
              placeholder="Room Type"
            />
          </div>

          {/* Rooms */}
          <div className="p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {(filteredRooms.length === 0 ? selectedRooms : filteredRooms).map(
              (room) => (
                <Room key={room._id} room={room} />
              )
            )}
          </div>
        </motion.div>
      ) : selectedHotelData && selectedRooms.length == 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <i className="fa-solid fa-circle-exclamation text-gray-500 text-5xl"></i>
          <p className="text-gray-500 text-lg">No rooms in this hotels yet.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <i className="fa-solid fa-circle-exclamation text-gray-500 text-5xl"></i>
          <p className="text-gray-500 text-lg">
            Please select a hotel to get started.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default RoomsList;
