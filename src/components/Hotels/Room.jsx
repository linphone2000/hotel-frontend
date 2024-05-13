import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import ImageLoading from "../ImageLoading/ImageLoading";
import { useUIModal } from "../../context/UIModalContext";
import { useAuth } from "../../context/AuthContext";
import { _capitalize } from "chart.js/helpers";

const Room = ({ room }) => {
  // Context and state
  const { flaskAPI, setSelectedRoom } = useData();
  const { currentUser } = useAuth();
  const { handleOpenModal, handleSetModalForm, showToast } = useUIModal();
  const [roomImage, setRoomImage] = useState(null);

  // Handlers
  const handleBook = (formName, roomID) => {
    if (currentUser) {
      handleSetModalForm(formName);
      setSelectedRoom(roomID);
      handleOpenModal();
    } else {
      showToast("error", "Please log in book!");
    }
  };

  // Effect
  useEffect(() => {
    const image = new Image();
    image.src = `${flaskAPI}/get_image/${room.image}`;
    image.onload = () => {
      setRoomImage(image);
    };
  }, [room]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        {roomImage ? (
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={roomImage.src}
            alt="Room Image"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-200">
            <ImageLoading scale="" />
          </div>
        )}
        <div className="absolute top-0 right-0 p-2 bg-gray-500 bg-opacity-40 text-white font-semibold rounded-bl-lg">
          No. {room.roomNumber}
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <button
            onClick={() => handleBook("book", room._id)}
            className="bg-slate-100 text-gray-800 px-4 py-2 rounded-lg transition hover:bg-orange-100 focus:outline-none focus:ring focus:ring-orange-300"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{_capitalize(room.roomType)}</h3>
        <ul className="mt-4">
          <li className="flex items-center text-gray-700">
            <span>Max Occupancy: {room.maxOccupancy}</span>
          </li>
          <li className="flex items-center text-gray-700">
            <span>Price: ${room.price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Room;
