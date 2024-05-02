import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import ImageLoading from "../ImageLoading/ImageLoading";

const Room = ({ room }) => {
  // Context and state
  const { flaskAPI } = useData();
  const [roomImage, setRoomImage] = useState(null);

  // Effect
  useEffect(() => {
    const image = new Image();
    image.src = `${flaskAPI}/get_image/${room.image}`;
    image.onload = () => {
      setRoomImage(image);
    };
  }, [room]);

  return (
    <li>
      <p>Room Number: {room.roomNumber}</p>
      <p>Room Type: {room.roomType}</p>
      <p>Description: {room.description}</p>
      <p>Max Occupancy: {room.maxOccupancy}</p>
      <p>Price: {room.price}</p>
      <div className="hotel-image-container">
        {roomImage == null ? (
          <ImageLoading scale={"w-52 h-32"} />
        ) : (
          <img
            className={`h-32 w-52 my-2 object-cover rounded-md`}
            src={`${roomImage.src}`}
            alt="Room Image"
          />
        )}
      </div>
      <hr></hr>
    </li>
  );
};

export default Room;
