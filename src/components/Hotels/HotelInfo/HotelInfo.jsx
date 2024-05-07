import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import { motion } from "framer-motion";
import "./HotelInfo.css";
import Spinner from "../../Spinner/Spinner";
import ImageLoading from "../../ImageLoading/ImageLoading";
import Stars from "./StarComponent/Stars";

const HotelInfo = () => {
  // Context
  const { selectedHotelData, flaskAPI, hotelLoading } = useData();

  // State
  const [hotelImage, setHotelImage] = useState(null);

  // Effect to preload image
  useEffect(() => {
    if (selectedHotelData && selectedHotelData.image) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${selectedHotelData.image}`;
      image.onload = () => {
        setHotelImage(image);
      };
    }
    return () => {
      setHotelImage(null);
    };
  }, [selectedHotelData]);

  // Handler
  // console.log(typeof selectedHotelData.rating);

  return (
    <>
      {hotelLoading ? (
        <Spinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 px-3 md:px-5 bg-gray-200 rounded-md border-b flex flex-col md:flex-row gap-4"
        >
          <div className="relative md:w-1/2">
            {hotelImage == null ? (
              <ImageLoading />
            ) : (
              <img
                className="my-2 object-cover rounded-md hotel-info-image"
                src={`${hotelImage.src}`}
                alt="Hotel Image"
              />
            )}
          </div>
          <div className="flex flex-col justify-between py-2 text-left md:w-1/2">
            <div>
              <h1 className="text-lg md:text-xl mb-2 font-bold">
                {selectedHotelData.name}
              </h1>
              <div className="flex items-center space-x-1">
                <Stars rating={selectedHotelData.rating} />
                <p className="font-medium">{selectedHotelData.rating}</p>
              </div>{" "}
              <p className="font-medium">{selectedHotelData.city}</p>
            </div>
            <div>
              <p className="font-medium">
                Email: {selectedHotelData.hotelEmail}
              </p>
              <p className="font-medium">
                Phone: {selectedHotelData.hotelPhone}
              </p>
            </div>
          </div>
          <div className="text-left md:text-right gap-1 pt-2 flex flex-col md:w-1/2">
            <p className="font-medium">{selectedHotelData.description}</p>
            <p className="font-medium">
              Located at: {selectedHotelData.address}
            </p>
            {/* <p className="font-medium">{selectedHotelData.amenities}</p> */}
            <p className="font-medium">
              Check-in Time:{" "}
              {selectedHotelData.checkInTime >= "12:00"
                ? `${selectedHotelData.checkInTime} PM`
                : `${selectedHotelData.checkInTime} AM`}
            </p>
            <p className="font-medium">
              Check-out Time:{" "}
              {selectedHotelData.checkOutTime >= "12:00"
                ? `${selectedHotelData.checkOutTime} PM`
                : `${selectedHotelData.checkOutTime} AM`}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HotelInfo;
