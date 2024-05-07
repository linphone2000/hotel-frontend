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
  const [showRoomsList, setShowRoomsList] = useState(window.innerWidth > 500);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 500) {
        setShowHotelsList(true);
        setShowRoomsList(true);
      } else {
        setShowHotelsList(true);
        setShowRoomsList(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handlers
  const handleHotelSelect = (hotelID) => {
    handleShowHide();
    setSelectedHotel(hotelID);
  };
  const handleShowHide = () => {
    if (window.innerWidth <= 500) {
      setShowHotelsList((prev) => !prev);
      setShowRoomsList((prev) => !prev);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
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
