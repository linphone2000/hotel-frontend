import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import ImageLoading from "../ImageLoading/ImageLoading";

const Hotel = ({ handleHotelSelect, hotel }) => {
  // State
  const { flaskAPI, selectedHotel } = useData();
  const [hotelImage, setHotelImage] = useState(null);

  // Effect
  useEffect(() => {
    const image = new Image();
    image.src = `${flaskAPI}/get_image/${hotel.image}`;
    image.onload = () => {
      setHotelImage(image);
    };
  });

  return (
    <>
      <div
        onClick={() => handleHotelSelect(hotel._id)}
        className={`text-center transition duration-300 rounded-lg overflow-hidden my-2 py-2 ease-in-out shadow-sm hover:shadow-xl cursor-pointer ${
          hotel._id == selectedHotel && "!shadow-2xl"
        }`}
      >
        <p className="text-lg">{hotel.name}</p>
        <p>{hotel.city}</p>
        <div className="relative w-full h-full">
          {hotelImage == null ? (
            <ImageLoading scale={"w-52 h-32"} isCenter={true} />
          ) : (
            <img
              className={`h-32 w-52 my-2 object-cover mx-auto rounded-md `}
              src={`${hotelImage.src}`}
              alt="Hotel Image"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Hotel;
