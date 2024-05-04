import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import Spinner from "../Spinner/Spinner";
import ImageLoading from "../ImageLoading/ImageLoading";
import CustomDateRangePicker from "../CustomDatePicker/CustomDateRangePicker";

const BookForm = () => {
  // Context
  const { selectedRoomData, roomLoading, flaskAPI } = useData();

  // State
  const [roomImage, setRoomImage] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null); // State to store selected date range

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

  // Capitalize Function
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Handler function to handle date range selection
  const handleSelect = (range) => {
    setSelectedRange(range);
  };

  // Sample unavailable dates
  const unavailableDates = [
    new Date("2024-05-14"),
    new Date("2024-05-15"),
    new Date("2024-05-16"),
  ];

  return (
    <>
      {roomLoading ? (
        // Loading for room object
        <Spinner />
      ) : selectedRoomData != null ? (
        <div className="bg-white flex gap-4 rounded-lg shadow-lg p-6">
          <div>
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              {roomImage == null ? (
                <ImageLoading />
              ) : (
                <img
                  className="w-full h-64 object-cover"
                  src={`${roomImage.src}`}
                  alt="Room Image"
                />
              )}
            </div>

            {/* Room Data */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Room Type:{" "}
                {selectedRoomData.roomType &&
                  capitalizeFirstLetter(selectedRoomData.roomType)}
              </h2>
              <p className="text-gray-600">
                Room Number: <span className="font-bold">{selectedRoomData.roomNumber}</span>
              </p>
            </div>
            <p className="text-gray-600 mb-4">{selectedRoomData.description}</p>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">
                Max Occupancy: {selectedRoomData.maxOccupancy}
              </p>
              <p className="text-gray-700">Price: ${selectedRoomData.price}</p>
            </div>
          </div>

          {/* V-line */}
          <div className="w-px bg-gray-300"></div>

          {/* Date Picker */}
          <div className="text-center">
            <CustomDateRangePicker
              unavailableDates={unavailableDates}
              onSelect={handleSelect}
            />

            {/* Display selected date range */}
            {selectedRange && (
              <p className="text-gray-700 mt-4">
                Selected range: {selectedRange.startDate.toDateString()} -{" "}
                {selectedRange.endDate.toDateString()}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Nothing</p>
      )}
    </>
  );
};

export default BookForm;
