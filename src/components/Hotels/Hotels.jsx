import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import HotelsList from "./HotelsList";
import RoomsList from "./RoomsList";
import { AnimatePresence } from "framer-motion";

const Hotels = () => {
  // Consumer
  const { setSelectedHotel } = useData();

  // State
  const [showHotelsList, setShowHotelsList] = useState(true);
  const [showRoomsList, setShowRoomsList] = useState(window.innerWidth > 600);

  // Handlers
  const handleHotelSelect = (hotelID) => {
    handleShowHide();
    setSelectedHotel(hotelID);
  };
  const handleShowHide = () => {
    if (window.innerWidth <= 600) {
      setShowHotelsList((prev) => !prev);
      setShowRoomsList((prev) => !prev);
    }
  };

  return (
    <>
      <div id="search-section" className="w-full h-10 bg-gray-200"></div>
      <div className="flex text-sm flex-col md:flex-row min-h-screen border-b border-gray-300">
        <button
          onClick={handleShowHide}
          className={`md:hidden ${
            showHotelsList && "hidden"
          } text-gray-600 my-2 text-2xl focus:outline-none`}
        >
          {showHotelsList ? "" : <i className="fa-solid fa-angles-left"></i>}
        </button>

        {/* Left */}
        {showHotelsList && (
          <div className="w-full md:w-1/4">
            <HotelsList handleHotelSelect={handleHotelSelect} />
          </div>
        )}

        {/* Right */}
        <AnimatePresence>
          {showRoomsList && (
            <div className="md:w-3/4">
              <RoomsList
                handleShowHide={handleShowHide}
                showHotelsList={showHotelsList}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hotels;
