import { useEffect } from "react";
import { useBooking } from "../../context/BookingContext";
import { useData } from "../../context/DataContext";
import Spinner from "../Spinner/Spinner";
import BookingItem from "../BookingItem/BookingItem";

const BookingComponent = () => {
  // Context
  const { bookingStatus } = useData();
  const { bookings, bookingsLoading } = useBooking();

  // Effect to re-render
  useEffect(() => {}, [bookingStatus]);
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl text-center font-semibold mb-4">Your Bookings</h2>
      <hr className="my-5 border-gray-300"></hr>
      {bookingsLoading ? (
        <div className="h-64">
          <Spinner />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex items-center justify-center gap-2 h-48 rounded-lg bg-gray-200">
          <i className="fa-solid fa-circle-exclamation text-2xl text-yellow-500"></i>
          <p className="text-gray-400 text-lg">No bookings found.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <BookingItem key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingComponent;
