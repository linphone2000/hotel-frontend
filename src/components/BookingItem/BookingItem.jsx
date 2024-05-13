import axios from "axios";
import { useData } from "../../context/DataContext";
import { useUIModal } from "../../context/UIModalContext";
import { _capitalize } from "chart.js/helpers";

const BookingItem = ({ booking }) => {
  // Context
  const { flaskAPI } = useData();
  const { setBookingStatus } = useData();
  const { showToast } = useUIModal();

  // Date Formatting
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };

  // Handlers
  const handleCancel = async () => {
    const response = await axios.delete(flaskAPI + "/book/" + booking._id);
    console.log(response.data);
    showToast("success", "Booking cancelled!");
    setBookingStatus((prev) => !prev);
  };

  return (
    <div className="bg-white flex flex-col gap-3 shadow-md rounded-md p-4 mb-4">
      {/* Booking card heading */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <h3 className="text-xl font-semibold">{booking.hotelName}</h3>
        <span className="text-gray-600 mt-2 md:mt-0">
          <p className="text-gray-600">
            Check-in:
            <span className="">{" " + formatDate(booking.stayDates[0])}</span>
            {booking.hotelCheckIn >= "12:00"
              ? ` ${booking.hotelCheckIn} PM`
              : ` ${booking.hotelCheckIn} AM`}
          </p>{" "}
        </span>
      </div>
      <hr></hr>

      {/* Booking card body */}
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="w-full md:w-2/3">
          <p className="text-gray-600">{booking.hotelAddress}</p>
          <p className="text-gray-600">
            Check-in:
            <span className="font-semibold">
              {" " + formatDate(booking.stayDates[0])}
            </span>
            {booking.hotelCheckIn >= "12:00"
              ? ` ${booking.hotelCheckIn} PM`
              : ` ${booking.hotelCheckIn} AM`}
          </p>
          <p className="text-gray-600">
            Check-out:
            <span className="font-semibold">
              {" " +
                formatDate(booking.stayDates[booking.stayDates.length - 1])}
            </span>
            {booking.hotelCheckOut >= "12:00"
              ? ` ${booking.hotelCheckOut} PM`
              : ` ${booking.hotelCheckOut} AM`}
          </p>
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-0 md:flex md:flex-col md:items-end md:justify-end">
          <p className="text-gray-600">Total Price: ${booking.totalPrice}</p>
          <p className="text-gray-600">
            Room No: <span className="font-semibold">{booking.roomNumber}</span>
          </p>
          <p className="text-gray-600 font-medium">
            {_capitalize(booking.roomType)}
          </p>
        </div>
      </div>
      <hr></hr>

      {/* Booking ID */}
      <div>
        <p className="text-gray-600">
          Booking Number: <span className="font-semibold">{booking._id}</span>
        </p>
        <p className="text-gray-600">
          Booking Creation Date: {formatDateTime(booking.creationDate)}
        </p>
      </div>

      {/* Cancel Booking */}
      <div className="mt-2">
        <button
          onClick={() => {
            handleCancel();
          }}
          className="w-full h-8 rounded-md border border-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingItem;
