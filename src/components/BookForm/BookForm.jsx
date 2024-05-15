// React
import { useEffect, useState } from "react";
import axios from "axios";
// Context
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
// Components
import Spinner from "../Spinner/Spinner";
import ImageLoading from "../ImageLoading/ImageLoading";
import CustomDateRangePicker from "../CustomDatePicker/CustomDateRangePicker";
import { useUIModal } from "../../context/UIModalContext";
import { _capitalize } from "chart.js/helpers";

const BookForm = () => {
  // Context
  const {
    selectedRoomData,
    roomLoading,
    flaskAPI,
    setBookingStatus,
    selectedHotel,
  } = useData();
  const { currentUser } = useAuth();
  const { showToast, handleCloseModal } = useUIModal();

  // State
  const [roomImage, setRoomImage] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null); // State to store selected date range
  const [totalPrice, setTotalPrice] = useState(0);

  // Effect to preload image
  useEffect(() => {
    if (selectedRoomData && selectedRoomData.image) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${selectedRoomData.image}`;
      image.onload = () => {
        setRoomImage(image);
      };
    }
    return () => {
      setRoomImage(null);
    };
  }, [selectedRoomData]);

  useEffect(() => {
    if (selectedRange) {
      const nights = Math.ceil(
        (selectedRange.endDate - selectedRange.startDate) /
          (1000 * 60 * 60 * 24)
      );
      setTotalPrice(nights * selectedRoomData.price);
    }
  }, [selectedRange]);

  // Handler date range selection
  const handleSelect = (range) => {
    setSelectedRange(range);
  };

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const datesToAdd = [];
      let currentDate = new Date(selectedRange.startDate);
      const endDate = new Date(selectedRange.endDate);
      while (currentDate <= endDate) {
        datesToAdd.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (datesToAdd.length > 1) {
        const response = await axios.post(flaskAPI + "/book", {
          userID: currentUser._id,
          roomID: selectedRoomData._id,
          unavailableDates: datesToAdd,
          hotelID: selectedHotel,
          totalPrice: totalPrice,
          creationDate: new Date(),
        });
        if (response.status == 200) {
          setBookingStatus((prev) => !prev);
          showToast("success", "Room booked successfully");
          handleCloseModal();
        }
      } else {
        showToast("error", "Please select both check in/out dates");
      }
    } catch (error) {
      console.log("No dates selected");
      showToast("error", "No dates selected");
    }
  };

  return (
    <>
      {roomLoading ? (
        // Loading for room object
        <div className="w-96 h-96">
          <Spinner />
        </div>
      ) : selectedRoomData != null ? (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              {roomImage == null ? (
                <ImageLoading scale={"w-full h-64"} />
              ) : (
                <img
                  className="w-full h-64 object-cover"
                  src={`${roomImage.src}`}
                  alt="Room Image"
                />
              )}
            </div>

            {/* Room Data */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">
                Room Type:{" "}
                {selectedRoomData.roomType &&
                  _capitalize(selectedRoomData.roomType)}
              </h2>
              <p className="text-gray-600">
                Room Number:{" "}
                <span className="font-bold">{selectedRoomData.roomNumber}</span>
              </p>
              <p className="text-gray-600 mb-4">
                {selectedRoomData.description}
              </p>
              <div className="flex justify-between">
                <p className="text-gray-700">
                  Max Occupancy: {selectedRoomData.maxOccupancy}
                </p>
                <p className="text-gray-700">
                  Price: ${selectedRoomData.price}
                </p>
              </div>
            </div>
          </div>

          {/* V-line */}
          <div className="hidden lg:block w-px bg-gray-300"></div>

          {/* Date Picker */}
          <div className="text-center lg:w-1/2">
            <CustomDateRangePicker
              unavailableDates={
                selectedRoomData != null && selectedRoomData.unavailable_dates
              }
              onSelect={handleSelect}
            />

            {/* Display selected date range */}
            {selectedRange && (
              <div className="flex flex-col gap-2">
                <p className="text-gray-700 mt-4">
                  Selected range: {selectedRange.startDate.toDateString()} -{" "}
                  {selectedRange.endDate.toDateString()}
                </p>
                <div className="flex justify-center gap-4 items-center">
                  <p className="font-semibold text-gray-600">Price: ${totalPrice}</p>
                  <p className="text-sm text-green-500 border px-2 pb-0.5 rounded-lg border-green-500">Pay on arrival</p>
                </div>
              </div>
            )}

            {/* Book Submit */}
            <button
              className="bg-slate-100 text-gray-800 px-4 py-2 rounded-lg mt-4 transition hover:bg-orange-100 focus:outline-none focus:ring focus:ring-orange-300"
              onClick={handleSubmit}
            >
              Book
            </button>
          </div>
        </div>
      ) : (
        <p>Nothing</p>
      )}
    </>
  );
};

export default BookForm;
