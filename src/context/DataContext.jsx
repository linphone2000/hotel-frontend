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
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelLoading, setHotelLoading] = useState(true);

  // Fetch rooms on load
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(flaskAPI + "/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading == true) {
      fetchRooms();
    }
  }, [loading, rooms]);

  // Fetch hotels on load
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(flaskAPI + "/hotels");
        setHotels(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setHotelLoading(false);
      }
    };
    if (hotelLoading == true) {
      fetchHotels();
    }
  }, [hotelLoading]);

  // Fetch rooms by hotel ID
  useEffect(() => {
    const fetchRoomsByHotelId = async () => {
      try {
        setLoading(true);
        if (selectedHotel) {
          const response = await axios.get(
            flaskAPI + "/rooms/" + selectedHotel
          );
          if (response.status != 200) {
            setSelectedRooms([]);
          } else {
            setSelectedRooms(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomsByHotelId();
  }, [selectedHotel]);

  // Test logging
  // useEffect(() => {
  //   console.log("Hotel: " + selectedHotel);
  // }, [selectedHotel]);

  // Memo
  const dataContextValue = useMemo(
    () => ({
      rooms,
      hotels,
      selectedHotel,
      setSelectedHotel,
      selectedRooms,
      setSelectedRooms,
      loading,
      hotelLoading,
      setLoading,
      flaskAPI,
    }),
    [rooms, hotels, selectedHotel, selectedRooms, loading]
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
