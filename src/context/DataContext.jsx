import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const flaskAPI = "http://localhost:5001";
  // const flaskAPI = "http://192.168.10.3:5001";

  // States
  const [hotels, setHotels] = useState([]); // All hotels
  const [selectedHotel, setSelectedHotel] = useState(); // Hotel id in string
  const [selectedHotelData, setSelectedHotelData] = useState(); // Hotel object
  const [selectedRooms, setSelectedRooms] = useState([]); // Selected rooms by hotel
  const [selectedRoom, setSelectedRoom] = useState(); // Room id in string
  const [selectedRoomData, setSelectedRoomData] = useState();
  const [loading, setLoading] = useState(false); // Used for room loading
  const [hotelsLoading, setHotelsLoading] = useState(true); // Used for multiple hotels loading
  const [hotelLoading, setHotelLoading] = useState(true); // Used for single hotel loading
  const [roomLoading, setRoomLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(false); // To re-render the booking modal
  const [favHotels, setFavHotels] = useState([]);

  // Fetch hotels on load
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(flaskAPI + "/hotels");
        if (response.status == 200) {
          setHotels(response.data);
          setHotelsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };
    if (hotelsLoading == true) {
      fetchHotels();
    }
  }, [hotelsLoading]);

  // Fetch rooms by hotel ID
  useEffect(() => {
    const fetchRoomsByHotelId = async (hotelID) => {
      try {
        setLoading(true);
        const response = await axios.get(flaskAPI + "/rooms/" + hotelID);
        if (response.status != 200) {
          setSelectedRooms([]);
          setLoading(false);
        } else {
          setSelectedRooms(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    if (selectedHotel) {
      fetchRoomsByHotelId(selectedHotel);
    }
  }, [selectedHotel]);

  // Fetch room data by room ID
  useEffect(() => {
    const fetchRoomByRoomId = async (roomID) => {
      try {
        setRoomLoading(true);
        const response = await axios.get(
          flaskAPI + "/rooms/get_room/" + roomID
        );
        if (response.status == 200) {
          setSelectedRoomData(response.data);
          setRoomLoading(false);
        }
      } catch (error) {}
    };
    if (selectedRoom != null) {
      fetchRoomByRoomId(selectedRoom);
    }
  }, [selectedRoom, bookingStatus]);

  // Fetch hotel by hotel ID
  useEffect(() => {
    const fetchHotelDataBySelection = async (hotelID) => {
      try {
        setHotelLoading(true);
        const response = await axios.get(flaskAPI + "/hotels/" + hotelID);
        if (response.status == 200) {
          setSelectedHotelData(response.data);
          setHotelLoading(false);
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };
    if (selectedHotel) {
      fetchHotelDataBySelection(selectedHotel);
    }
  }, [selectedHotel]);  

  // Testing

  // Memo
  const dataContextValue = useMemo(
    () => ({
      hotels,
      selectedHotel,
      selectedHotelData,
      selectedRoom,
      selectedRooms,
      selectedRoomData,
      setSelectedHotel,
      favHotels,
      setFavHotels,
      setSelectedHotelData,
      setSelectedRoom,
      setSelectedRooms,
      loading,
      hotelsLoading,
      hotelLoading,
      roomLoading,
      setLoading,
      flaskAPI,
      bookingStatus,
      setBookingStatus,
    }),
    [
      hotels,
      selectedHotel,
      selectedHotelData,
      selectedRoom,
      selectedRooms,
      favHotels,
      loading,
      hotelsLoading,
      hotelLoading,
      roomLoading,
      bookingStatus,
    ]
  );

  return (
    <DataContext.Provider value={dataContextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
