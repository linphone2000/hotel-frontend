import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";
import ImageLoading from "../ImageLoading/ImageLoading";

const ProfileComponent = () => {
  // Context
  const { currentUser, updateUser } = useAuth();
  const { flaskAPI } = useData();
  const { showToast } = useUIModal();

  // Ref
  const fileInputRef = useRef(null);

  // State
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Showing the current profile picture
  const [image, setImage] = useState(null); // To change Image (New)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Effect
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
      });
    }
  }, [currentUser]);

  // Effect to preload image
  useEffect(() => {
    if (currentUser) {
      const image = new Image();
      image.src = `${flaskAPI}/get_image/${currentUser.image}`;
      image.onload = () => {
        setProfileImage(image);
      };
    }
    return () => {
      setProfileImage(null);
    };
  }, [currentUser]);

  // Effect
  useEffect(() => {
    if (image != null) {
      setFormData({
        ...formData,
        image: image,
      });
    }
  }, [image]);

  // Handlers
  const toggleFormEnabled = () => {
    setIsFormEnabled((prev) => !prev);
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle File
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  // Handle Submit
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("image", image);
      updateUser(formDataToSend);
      setIsFormEnabled(false);
    } catch (error) {
      showToast("error", error);
    }
  };

  // Test
  // console.log(isFormEnabled);

  return (
    <>
      {currentUser ? (
        <div className="text-center p-8">
          {/* Profile Picture */}
          {profileImage == null ? (
            <div className="flex justify-center">
              <ImageLoading scale={"!rounded-full h-28 w-28"} />
            </div>
          ) : (
            <div className="relative mx-auto overflow-hidden rounded-full h-28 w-28 mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="opacity-0 w-0"
                disabled={!isFormEnabled}
              ></input>
              {image ? (
                <img
                  className="object-cover inline-block w-full h-full"
                  src={URL.createObjectURL(image)}
                  alt="Hotel Image"
                />
              ) : (
                <img
                  className="object-cover inline-block w-full h-full"
                  src={`${profileImage.src}`}
                  alt="Hotel Image"
                />
              )}
              {/* Overlay */}
              <div
                onClick={handleFileUpload}
                className={`absolute bottom-0 left-0 w-full h-1/2 bg-black bg-opacity-50 text-white text-center opacity-0 transition-opacity duration-300 ${
                  isFormEnabled && "hover:opacity-100 hover:cursor-pointer"
                }`}
              >
                <p className="p-2">Edit</p>
              </div>
            </div>
          )}

          {/* Profile Heading */}
          <h1 className="text-5xl font-bold mb-4">{currentUser.fullName}</h1>

          {/* Profile Edit */}
          <div className="flex justify-center">
            <div className="bg-gray-50 w-full md:w-1/2 rounded-md p-4 flex flex-col transition-all">
              <div className="flex flex-col md:flex-row items-center justify-evenly mb-2">
                <label
                  htmlFor="fullName"
                  className="md:w-1/3 block mb-2 text-lg"
                >
                  Full Name:
                </label>
                <input
                  id="fullName"
                  type="text"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.fullName}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-evenly mb-2">
                <label htmlFor="email" className="md:w-1/3 block mb-2 text-lg">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.email}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-evenly mb-2">
                <label htmlFor="phone" className="md:w-1/3 block mb-2 text-lg">
                  Phone:
                </label>
                <input
                  id="phone"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  type="text"
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.phone}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-evenly mb-2">
                <label
                  htmlFor="address"
                  className="md:w-1/3 block mb-2 text-lg"
                >
                  Address:
                </label>
                <input
                  id="address"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  type="text"
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.address}
                  disabled={!isFormEnabled}
                />
              </div>

              {/* Button */}
              {isFormEnabled && (
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className={`mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition`}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={toggleFormEnabled}
            className={`mt-4 px-4 py-2 rounded-md transition ${
              isFormEnabled
                ? "bg-gray-500 text-gray-100 hover:bg-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isFormEnabled ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProfileComponent;
