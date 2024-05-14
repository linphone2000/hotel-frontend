import { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import { motion } from "framer-motion";
import "./HotelInfo.css";
import Spinner from "../../Spinner/Spinner";
import ImageLoading from "../../ImageLoading/ImageLoading";
import Stars from "./StarComponent/Stars";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useUIModal } from "../../../context/UIModalContext";

const HotelInfo = () => {
  // Amenities with icons
  const amenityIcons = {
    Pools: "fas fa-swimming-pool",
    Wifi: "fas fa-wifi",
    Parking: "fas fa-parking",
    Gym: "fas fa-dumbbell",
    Restaurant: "fas fa-utensils",
    Spa: "fas fa-spa",
    Concierge: "fas fa-concierge-bell",
    "Room Service": "fas fa-concierge-bell", // Just an example, replace with appropriate icon
    "Business Center": "fas fa-briefcase",
    "Pet Friendly": "fas fa-paw",
  };

  // Context
  const { selectedHotelData, flaskAPI, hotelLoading } = useData();
  const { currentUser, fetchUser } = useAuth();
  const { showToast } = useUIModal();

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

  // Handle fav insert
  const handleFav = async () => {
    if (currentUser) {
      const response = await axios.post(
        flaskAPI + "/fav_hotel/" + selectedHotelData._id,
        { userID: currentUser._id }
      );
      if (response.status == 200) {
        showToast("success", "Hotel added to favourites.");
        fetchUser();
      }
    } else {
      showToast("error", "Please log in to add favourite.");
    }
  };

  // Handle fav remove
  const handleFavRemove = async () => {
    if (currentUser) {
      const response = await axios.post(
        flaskAPI + "/fav_hotel_remove/" + selectedHotelData._id,
        { userID: currentUser._id }
      );
      if (response.status == 200) {
        showToast("success", "Hotel removed from favourites.");
        fetchUser();
      }
    } else {
      showToast("error", "Please log in to add favourite.");
    }
  };

  const isContained =
    currentUser &&
    currentUser.favIDs &&
    currentUser.favIDs.includes(selectedHotelData._id);

  return (
    <>
      {hotelLoading ? (
        <Spinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 mt-2 px-3 md:px-5 bg-slate-200 rounded-md border-b flex flex-col md:flex-row gap-4"
        >
          {/* Image */}
          <div className="relative md:w-1/2">
            {hotelImage == null ? (
              <div className="flex justify-center">
                <ImageLoading />
              </div>
            ) : (
              <div className="relative">
                <img
                  className="my-2 mx-auto md:mx-0 object-cover rounded-md hotel-info-image"
                  src={`${hotelImage.src}`}
                  alt="Hotel Image"
                />
                {isContained ? (
                  // Contained
                  <button
                    className="absolute top-1 right-8 md:right-3 text-rose-500 hover:text-rose-300 transition"
                    onClick={handleFavRemove}
                  >
                    <i className="fa-solid text-2xl fa-heart"></i>
                  </button>
                ) : (
                  // Not contained
                  <button
                    className="absolute top-1 right-8 md:right-3 text-white hover:text-rose-500 transition"
                    onClick={handleFav}
                  >
                    <i className="fa-regular text-2xl fa-heart"></i>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Left Info */}
          {selectedHotelData && (
            <>
              <div className="flex flex-col text-center md:justify-between py-2 md:text-left md:w-1/2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-lg md:text-xl font-bold">
                      {selectedHotelData.name}
                    </h1>
                  </div>
                  <div className="flex justify-center md:justify-start md:items-center space-x-1">
                    <Stars rating={selectedHotelData.rating} />
                    <p className="font-medium">{selectedHotelData.rating}</p>
                  </div>{" "}
                  <p className="font-medium">{selectedHotelData.city}</p>
                  <p className="font-medium text-gray-600">
                    Located at: {selectedHotelData.address}
                  </p>
                  <p className="font-medium text-gray-600">
                    {selectedHotelData.description}
                  </p>
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

              {/* Right info */}
              <div className="flex flex-col justify-between py-2 text-center md:text-right md:w-1/2">
                {/* Times */}
                <div>
                  <p className="font-medium text-gray-600">
                    <span className="">Check-in: </span>
                    {selectedHotelData.checkInTime >= "12:00"
                      ? `${selectedHotelData.checkInTime} PM`
                      : `${selectedHotelData.checkInTime} AM`}
                  </p>
                  <p className="font-medium text-gray-600">
                    <span className="">Check-out: </span>
                    {selectedHotelData.checkOutTime >= "12:00"
                      ? `${selectedHotelData.checkOutTime} PM`
                      : `${selectedHotelData.checkOutTime} AM`}
                  </p>
                </div>

                {/* Amenities */}
                {Array.isArray(selectedHotelData.amenities) ? ( // For more than 1 amenities
                  <div className="font-medium text-gray-600">
                    <p className="md:text-right mb-2">Amenities:</p>
                    <div className="flex gap-2 justify-end">
                      {selectedHotelData.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="w-10 py-1 transition text-center relative rounded-md bg-gray-300 hover:bg-gray-400"
                        >
                          <i className={`${amenityIcons[amenity]}`}></i>
                          <div className="tooltip hidden mb-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md absolute bottom-full left-1/2 transform -translate-x-1/2">
                            <div className="tooltip-inner">{amenity}</div>
                            <div className="tooltip-arrow"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // For only one amenities
                  <div className="font-medium text-gray-600">
                    <p className="md:text-right mb-2">Amenities:</p>
                    <div className="flex gap-2 justify-end">
                      <div className="w-10 py-1 transition text-center relative rounded-md bg-gray-300 hover:bg-gray-400">
                        <i
                          className={`${
                            amenityIcons[selectedHotelData.amenities]
                          }`}
                        ></i>
                        <div className="tooltip hidden mb-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md absolute bottom-full left-1/2 transform -translate-x-1/2">
                          <div className="tooltip-inner">
                            {selectedHotelData.amenities}
                          </div>
                          <div className="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
};

export default HotelInfo;
