import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import ImageLoading from "../ImageLoading/ImageLoading";

const HotelCard = ({ hotel }) => {
  // Context
  const { flaskAPI } = useData();

  // State
  const [hotelImage, setHotelImage] = useState(null);

  // Effect
  useEffect(() => {
    const image = new Image();
    image.src = `${flaskAPI}/get_image/${hotel.image}`;
    image.onload = () => {
      setHotelImage(image);
    };
  }, []);

  return (
    <div
      key={hotel._id}
      className="bg-white w-full gap-4 flex rounded-lg shadow-md p-4"
    >
      <div className="w-1/2">
        <h1 className="text-xl font-semibold mb-2">{hotel.name}</h1>
        <p>
          <span className="font-bold">City:</span> {hotel.city}
        </p>
        <p>
          <span className="font-bold">Address:</span> {hotel.address}
        </p>
        <p>
          <span className="font-bold">Rating:</span> {hotel.rating}
        </p>
        <p>
          <span className="font-bold">Description:</span> {hotel.description}
        </p>
        <p>
          <span className="font-bold">Check-in Time:</span> {hotel.checkInTime}
        </p>
        <p>
          <span className="font-bold">Check-out Time:</span>{" "}
          {hotel.checkOutTime}
        </p>
        <p>
          <span className="font-bold">Email:</span> {hotel.hotelEmail}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {hotel.hotelPhone}
        </p>
      </div>
      <div className="w-1/2 flex items-center">
        {hotelImage == null ? (
          <ImageLoading scale={"w-full"} isCenter={true} />
        ) : (
          <img
            className={`w-full object-cover mx-auto rounded-md `}
            src={`${hotelImage.src}`}
            alt="Hotel Image"
          />
        )}
      </div>
    </div>
  );
};

export default HotelCard;
