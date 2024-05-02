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
        console.log("Image loaded");
      };
    }
    return () => {
      setHotelImage(null);
    };
  }, [selectedHotelData]);

  // Handler

  return (
    <>
      {hotelLoading ? (
        <Spinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 px-5 bg-gray-200 rounded-md border-b flex justify-between gap-4"
        >
          <div className="relative w-1/2">
            {hotelImage == null ? (
              <ImageLoading />
            ) : (
              <img
                className={`my-2 object-cover rounded-md hotel-info-image`}
                src={`${hotelImage.src}`}
                alt="Hotel Image"
              />
            )}
          </div>
          {/* Left hotel infomation pane */}
          <div className="flex flex-col justify-between py-2 text-left w-1/2">
            <div>
              <h1 className=" text-xl mb-2 font-bold">
                {selectedHotelData.name}
              </h1>
              <div className="flex items-center space-x-1">
                <Stars rating={selectedHotelData.rating} />
                <p className="font-medium">{selectedHotelData.rating}</p>
              </div>{" "}
              <p className=" font-medium">{selectedHotelData.city}</p>
            </div>
            <div>
              <p className=" font-medium">
                Email: {selectedHotelData.hotelEmail}
              </p>
              <p className=" font-medium">
                Phone: {selectedHotelData.hotelPhone}
              </p>
            </div>
          </div>
          {/* Right hotel infomation pane */}
          <div className="text-right flex flex-col w-1/2">
            <h1 className=" text-xl mb-2 font-bold">
              {selectedHotelData.name}
            </h1>
            <p className=" font-medium">{selectedHotelData.description}</p>
            <p className=" font-medium">{selectedHotelData.address}</p>
            {/* <p className="font-medium">{selectedHotelData.amenities}</p> */}
            <p className=" font-medium">{selectedHotelData.checkInTime}</p>
            <p className=" font-medium">{selectedHotelData.checkOutTime}</p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HotelInfo;
