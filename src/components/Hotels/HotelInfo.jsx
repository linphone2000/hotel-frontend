import { useData } from "../../context/DataContext";

const HotelInfo = () => {
  // Context
  const { selectedHotelData, imageLoading, flaskAPI } = useData();

  //   Handler
  console.log(selectedHotelData);

  return (
    <>
      <div className="p-2 border-b flex gap-4 justify-center">
        <div className="relative">
          {imageLoading && (
            <div className="animate-pulse my-2">
              <img
                className="rounded-md mx-auto h-32 w-52"
                src="assets/placeholder.png"
              />
            </div>
          )}
          <img
            className={`h-32 w-52 my-2 object-cover mx-auto rounded-md`}
            src={`${flaskAPI}/get_image/${selectedHotelData.image}`}
            alt="Hotel Image"
          />
        </div>
        <div className="text-left">
          <h1 className=" text-xl mb-2 font-bold">{selectedHotelData.name}</h1>
          <p className=" font-medium">{selectedHotelData.description}</p>
          <p className=" font-medium">{selectedHotelData.address}</p>
          {/* <p className="font-medium">{selectedHotelData.amenities}</p> */}
          <p className=" font-medium">{selectedHotelData.checkInTime}</p>
          <p className=" font-medium">{selectedHotelData.checkOutTime}</p>
          <p className=" font-medium">{selectedHotelData.city}</p>
          <p className=" font-medium">{selectedHotelData.hotelEmail}</p>
          <p className=" font-medium">{selectedHotelData.hotelPhone}</p>
          <p className=" font-medium">{selectedHotelData.rating}</p>
        </div>
      </div>
    </>
  );
};

export default HotelInfo;
