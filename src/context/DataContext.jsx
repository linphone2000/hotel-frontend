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

  // States
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedHotelData, setSelectedHotelData] = useState();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hotelLoading, setHotelLoading] = useState(true);

  // Fetch rooms on load
  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       const response = await axios.get(flaskAPI + "/rooms");
  //       setRooms(response.data);
  //     } catch (error) {
  //       console.error("Error fetching rooms:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (loading == true) {
  //     fetchRooms();
  //     console.log(rooms);
  //   }
  // }, [loading, rooms]);

  // Fetch hotels on load
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(flaskAPI + "/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setHotelLoading(false);
      }
    };
    if (hotelLoading == true) {
      fetchHotels();
      console.log(hotels);
    }
  }, [hotelLoading]);

  // Fetch rooms by hotel ID
  useEffect(() => {
    const fetchRoomsByHotelId = async (hotelID) => {
      try {
        setLoading(true);
        const response = await axios.get(flaskAPI + "/rooms/" + hotelID);
        if (response.status != 200) {
          setSelectedRooms([]);
        } else {
          setSelectedRooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedHotel) {
      fetchRoomsByHotelId(selectedHotel);
    }
  }, [selectedHotel]);

  // Fetch hotel by hotel ID
  useEffect(() => {
    const fetchHotelDataBySelection = async (hotelID) => {
      try {
        setLoading(true);
        const response = await axios.get(flaskAPI + "/hotels/" + hotelID);
        if (response.status == 200) {
          setSelectedHotelData(response.data);
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedHotel) {
      fetchHotelDataBySelection(selectedHotel);
    }
  }, [selectedHotel]);

  // Memo
  const dataContextValue = useMemo(
    () => ({
      hotels,
      selectedHotel,
      selectedHotelData,
      selectedRooms,
      setSelectedHotel,
      setSelectedHotelData,
      setSelectedRooms,
      loading,
      hotelLoading,
      setLoading,
      flaskAPI,
    }),
    [
      hotels,
      selectedHotel,
      selectedHotelData,
      selectedRooms,
      loading,
      hotelLoading,
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
