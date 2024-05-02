const StarIcon = ({ filled }) => {
  return (
    <i
      className={`fa-solid fa-star ${
        filled ? "text-yellow-500" : "text-gray-300"
      }`}
    ></i>
  );
};

export default StarIcon;
