// React
import { useRef, useState } from "react";
import Select from "react-select";
import { AnimatePresence } from "framer-motion";
// Context
import { useData } from "../../context/DataContext";
// Components
import Spinner from "../Spinner/Spinner";
import HotelsList from "./HotelsList";
import RoomsList from "./RoomsList";
import { useUIModal } from "../../context/UIModalContext";
// CSS
import './Hotels.css'

const Hotels = () => {
  // Context
  const {
    setSelectedHotel,
    hotelsLoading,
    hotels,
    setSelectedRooms,
    setSelectedHotelData,
  } = useData();
  const { showToast } = useUIModal();

  // State and refs
  const [showHotelsList, setShowHotelsList] = useState(true);
  const [showRoomsList, setShowRoomsList] = useState(window.innerWidth > 600);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const searchRef = useRef("");

  // Handlers
  const handleHotelSelect = (hotelID) => {
    handleShowHide();
    setSelectedHotel(hotelID);
  };

  // Handle show/hide
  const handleShowHide = () => {
    if (window.innerWidth <= 600) {
      setShowHotelsList((prev) => !prev);
      setShowRoomsList((prev) => !prev);
    }
  };

  // Filter
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const uniqueCities = Array.from(new Set(hotels.map((hotel) => hotel.city)));

  // Handle option change
  const handleOptionChange = (selectedOption) => {
    handleHideList();
    setSelectedOption(selectedOption);
    const query = selectedOption.label.toLowerCase();
    const filteredHotels = hotels.filter((hotel) =>
      hotel.city.toLowerCase().includes(query)
    );
    setFilteredHotels(filteredHotels);
  };

  // Handle Search
  const handleSearch = () => {
    if (searchRef.current.value !== "") {
      handleHideList();
      const query = searchRef.current.value.toLowerCase();
      const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(query)
      );
      setFilteredHotels(filteredHotels);
      if (filteredHotels.length == 0) {
        showToast("info", "No hotels found!");
      }
    }
  };

  const handleHideList = () => {
    setSelectedRooms([]);
    setSelectedHotelData();
    setSelectedHotel();
  };

  // Handle Clear
  const handleClear = () => {
    searchRef.current.value = "";
    setFilteredHotels([]);
    setSelectedOption(null);
  };

  // Selections
  const options = uniqueCities.map((city) => ({
    value: city,
    label: city,
  }));

  return (
    <>
      {/* Filter Section */}
      <div
        id="search-section"
        className="bg-mycolor px-2 lg:px-0 pt-3 pb-2 flex justify-center"
      >
        <div className="flex justify-center w-full gap-2">
          {/* Select */}
          <Select
            id="citySelect"
            className="lg:w-1/6 rounded-md"
            value={selectedOption}
            options={options}
            onChange={handleOptionChange}
            placeholder="Where are you going?"
          />
          {/* Search */}
          <div className="lg:w-1/2 md:h-9 lg:h-12 xl:h-10 relative">
            <input
              id="searchInput"
              type="text"
              ref={searchRef}
              placeholder="Enter hotel name..."
              className="w-full py-2 h-full px-4 border-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSearch}
              className="absolute top-0 right-0 h-full border-none px-4 bg-blue-400 text-white rounded-r-md hover:bg-blue-500 focus:outline-none"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {filteredHotels.length > 0 && (
            <button
              className="text-sm w-24 text-red-600 hover:text-red-800 focus:outline-none"
              onClick={handleClear}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Left and Right Pane */}
      <div className="flex text-sm flex-col bg-mycolor md:flex-row min-h-screen border-b border-gray-300">
        {/* Only for smaller screens */}
        <button
          onClick={handleShowHide}
          className={`md:hidden ${
            showHotelsList && "hidden"
          } text-gray-600 my-2 text-2xl focus:outline-none`}
        >
          {showHotelsList ? "" : <i className="fa-solid fa-angles-left"></i>}
        </button>

        {/* Left */}
        {hotelsLoading ? (
          <div className="w-full pt-2 md:w-1/4">
            <Spinner />
          </div>
        ) : (
          <>
            {showHotelsList && (
              <div className="w-full pt-2 md:w-1/4">
                <HotelsList
                  hotels={filteredHotels.length > 0 ? filteredHotels : hotels}
                  handleHotelSelect={handleHotelSelect}
                />
              </div>
            )}
          </>
        )}

        {/* Right */}
        <AnimatePresence>
          {showRoomsList && (
            <div className="md:w-3/4">
              <RoomsList
                handleShowHide={handleShowHide}
                showHotelsList={showHotelsList}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Hotels;
