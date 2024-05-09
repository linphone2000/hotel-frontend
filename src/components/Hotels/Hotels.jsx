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

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 600) {
  //       setShowHotelsList(true);
  //       setShowRoomsList(true);
  //     } else {
  //       setShowHotelsList(true);
  //       setShowRoomsList(false);
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

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
      <div className="flex flex-col md:flex-row min-h-screen">
      <button
        onClick={handleShowHide}
        className={`md:hidden ${
          showHotelsList && "hidden"
        } text-gray-600 my-2 text-2xl focus:outline-none`}
      >
        {showHotelsList ? "" : <i className="fa-solid fa-angles-left"></i>}
      </button>
        {showHotelsList && (
          <div className="w-full md:w-1/4">
            <HotelsList handleHotelSelect={handleHotelSelect} />
          </div>
        )}
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
