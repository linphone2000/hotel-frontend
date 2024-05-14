// Context
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useUIModal } from "../context/UIModalContext";
import { useEffect } from "react";
import HotelCard from "../components/HotelCard/HotelCard";

const Favourites = () => {
  // Context
  const { currentUser, fetchUser } = useAuth();
  const { flaskAPI, favHotels, setFavHotels } = useData();
  const { showToast } = useUIModal();

  // States

  // Fetching user's favourite hotels
  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await axios.post(flaskAPI + "/fetch_favourites", {
        favIDs: currentUser.favIDs,
      });
      if (response.status == 200) {
        setFavHotels(response.data);
      } else {
        showToast("error", "Fetching failed.");
      }
    };
    if (currentUser) {
      if (currentUser.favIDs) {
        if (currentUser.favIDs.length > 0) {
          fetchFavourites();
        }
      } else {
        setFavHotels([]);
      }
      // console.log(currentUser);
    }
  }, [currentUser]);

  // Test
  useEffect(() => {
    if (favHotels) {
      console.log(favHotels);
    }
  }, [favHotels]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {currentUser && (
        <div className="min-h-screen">
          {currentUser.favIDs && currentUser.favIDs.length > 0 ? (
            <>
              <h1 className="text-center mt-4 mb-2 font-bold text-2xl">
                Your favourite hotels
              </h1>
              <hr className="border-gray-300"></hr>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 justify-center">
                {favHotels.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}
              </div>
            </>
          ) : (
            <div className=" bg-gray-100 p-10">
              <div className="flex items-center h-screen justify-center text-center w-full text-gray-600 p-4border border-gray-300 rounded-lg shadow-md">
                <h1 className="font-semibold text-2xl">No favourite hotels</h1>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Favourites;
