import "./FeatureCard.css";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, description, image }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md shadow-md pb-6 text-center feature-card">
      <img
        className="h-52 w-full object-cover mb-2 rounded-t-md"
        src={image}
        alt="Feature Image"
      />
      <div className="mb-2 flex gap-1 justify-center">
        <i
          className={`text-xl text-primary-500 border-r border-stone-300 pr-0 mr-0 xl:pr-4 xl:mr-2 ${icon}`}
        ></i>
        <h3 className="text-xl font-normal">{title}</h3>
      </div>
      <hr className="bg-slate-400 px-5"></hr>
      <p className="text-gray-700 px-4">{description} </p>
      <button onClick={() => navigate("/hotels")} className="pri-btn mt-2 font-normal">
        Explore
      </button>
    </div>
  );
};

export default FeatureCard;
