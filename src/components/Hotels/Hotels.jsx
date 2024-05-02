import { useData } from "../../context/DataContext";
import HotelsList from "./HotelsList";
import RoomsList from "./RoomsList";

const Hotels = () => {
  // Consumer
  const { setSelectedHotel } = useData();

  // State

  // Effect
  const handleHotelSelect = (hotelID) => {
    setSelectedHotel(hotelID);
  };

  return (
    <>
      <div className="grid grid-cols-8 min-h-screen">
        <HotelsList handleHotelSelect={handleHotelSelect} />
        <RoomsList />
      </div>
    </>
  );
};

export default Hotels;
