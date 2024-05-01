import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import HotelsList from "./HotelsList";
import RoomsList from "./RoomsList";

const Hotels = () => {
  // Consumer
  const {
    selectedRooms,
    setSelectedHotel,
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
  const handleHotelSelect = (hotelID) => {
    setSelectedHotel(hotelID);
  };

  return (
    <>
      <div className="grid grid-cols-8 min-h-screen">
        <HotelsList
          handleHotelSelect={handleHotelSelect}
          handleLoad={handleLoad}
        />
        <RoomsList
          roomImageloading={roomImageloading}
          handleRoomLoad={handleRoomLoad}
        />
      </div>
    </>
  );
};

export default Hotels;
