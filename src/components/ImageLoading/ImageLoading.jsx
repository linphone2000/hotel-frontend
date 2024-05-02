import "../Hotels/HotelInfo/HotelInfo.css";

const ImageLoading = ({ scale, isCenter }) => {
  return (
    <div className="animate-pulse my-2">
      <img
        className={`rounded-md ${scale ? scale : "hotel-info-image"} ${
          isCenter ? "mx-auto" : ""
        }`}
        src="assets/placeholder.png"
      />
    </div>
  );
};

export default ImageLoading;
