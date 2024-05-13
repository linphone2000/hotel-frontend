import Select from "react-select";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import Hotel from "./Hotel";
import Spinner from "../Spinner/Spinner";
import { useRef, useState } from "react";
import { useUIModal } from "../../context/UIModalContext";

const HotelsList = ({ handleHotelSelect }) => {
  // Context
  const { hotels, hotelsLoading } = useData();
  const { showToast } = useUIModal();

  // States and refs
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const searchRef = useRef("");

  // Filter
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
  const uniqueCities = Array.from(new Set(hotels.map((hotel) => hotel.city)));

  // Handler
  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const query = selectedOption.label.toLowerCase();
    const filteredHotels = hotels.filter((hotel) =>
      hotel.city.toLowerCase().includes(query)
    );
    setFilteredHotels(filteredHotels);
  };
  const handleSearch = () => {
    if (searchRef.current.value !== "") {
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
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {hotelsLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Filter */}
          <div className="flex gap-3 relative items-center flex-col justify-center m-4">
            {/* 1/2 */}
            <div className="relative gap-2 lg:gap-0 lg:w-4/5 flex md:flex-col lg:flex-row justify-center">
              <input
                type="text"
                ref={searchRef}
                placeholder="Search by hotel ..."
                className="py-2 px-4 h-10 text-gray-700 leading-tight focus:outline-none rounded-md lg:rounded-l-md"
              />
              <button
                onClick={handleSearch}
                className="py-2 px-4 h-10 bg-yellow-400 text-white rounded-md lg:rounded-r-md transition hover:bg-yellow-500 focus:outline-none"
              >
                Search
              </button>
            </div>

            {/* 2/2 */}
            <Select
              className="w-4/5 md:w-full lg:w-4/5 rounded"
              value={selectedOption}
              options={options}
              onChange={handleOptionChange}
              placeholder="Search by City..."
            />

            {/* Clear */}
            {filteredHotels.length > 0 && (
              <button
                className="absolute top-0 right-4 hover:text-red-500 transition-all"
                onClick={handleClear}
              >
                <i className="fa-regular fa-circle-xmark hover:cursor-pointer"></i>
              </button>
            )}
          </div>
          <div className="p-4 h-full md:h-screen bg-slate-200 overflow-y-auto">
            {(filteredHotels.length === 0 ? hotels : filteredHotels).map(
              (hotel, index) => (
                <Hotel
                  hotel={hotel}
                  key={hotel._id}
                  handleHotelSelect={handleHotelSelect}
                />
              )
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HotelsList;
