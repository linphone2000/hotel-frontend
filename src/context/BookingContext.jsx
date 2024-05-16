import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { useData } from "./DataContext";
import { useUIModal } from "./UIModalContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Context
  const { currentUser } = useAuth();
  const { flaskAPI, bookingStatus } = useData();
  const { showToast } = useUIModal();

  // States
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingLoading] = useState(true);

  // Fetch bookings by user id
  // useEffect(() => {
  //   const getBookingsByID = async () => {
  //     try {
  //       const response = await axios.get(
  //         flaskAPI + "/bookings/" + currentUser._id
  //       );
  //       if (response.status == 200) {
  //         setBookings(response.data);
  //       } else {
  //         setBookings([]);
  //       }
  //     } catch (error) {
  //       showToast("error", "Error fetching bookings");
  //     } finally {
  //       setBookingLoading(false);
  //     }
  //   };
  //   if (currentUser) {
  //     getBookingsByID();
  //   }
  // }, [currentUser, bookingStatus]);

  // Fetch bookings manually
  const getBookingsByID = async (userID) => {
    try {
      setBookingLoading(true);
      const response = await axios.get(flaskAPI + "/bookings/" + userID);
      if (response.status == 200) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      showToast("error", "Error fetching bookings");
    } finally {
      setBookingLoading(false);
    }
  };

  // Handlers
  // console.log(bookings);

  // Memo
  const BookingContextValue = useMemo(
    () => ({ bookings, bookingsLoading, getBookingsByID, setBookings }),
    [bookings, bookingsLoading]
  );

  return (
    <BookingContext.Provider value={BookingContextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  return useContext(BookingContext);
};
