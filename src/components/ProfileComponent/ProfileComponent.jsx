import { useEffect, useRef, useState } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useUIModal } from "../../context/UIModalContext";
import ImageLoading from "../ImageLoading/ImageLoading";
import BookingComponent from "../BookingComponent/BookingComponent";
import Favourites from "../../pages/Favourites";

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
        // Main wrapper
        <div className="p-4 gap-4 flex">
          {/* Left */}
          <div className="p-4 w-full lg:w-1/4 bg-white rounded-lg shadow-md">
            <div className="text-center mb-4">
              {/* Profile Picture */}
              {profileImage == null ? (
                <div className="flex justify-center">
                  <ImageLoading scale={"!rounded-full h-24 w-24"} />
                </div>
              ) : (
                <div className="relative mx-auto overflow-hidden rounded-full h-24 w-24 mb-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="opacity-0 w-0"
                    disabled={!isFormEnabled}
                  />
                  {image ? (
                    <img
                      className="object-cover inline w-full h-full"
                      src={URL.createObjectURL(image)}
                      alt="Profile Image"
                    />
                  ) : (
                    <img
                      className="object-cover inline w-full h-full"
                      src={`${profileImage.src}`}
                      alt="Profile Image"
                    />
                  )}
                  {/* Overlay */}
                  <div
                    onClick={handleFileUpload}
                    className={`absolute bottom-0 left-0 w-full h-1/2 bg-black bg-opacity-50 text-white text-center opacity-0 transition-opacity duration-300 ${
                      isFormEnabled && "hover:opacity-100 hover:cursor-pointer"
                    }`}
                  >
                    <p className="p-1 text-sm">Edit</p>
                  </div>
                </div>
              )}

              {/* Profile Heading */}
              <h1 className="text-2xl font-bold mb-2">
                {currentUser.fullName}
              </h1>
            </div>

            {/* Profile Edit Form */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <div className="mb-3">
                <label htmlFor="fullName" className="block text-sm mb-1">
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
                  className={`w-full p-2 rounded-md ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.fullName}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm mb-1">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`w-full p-2 rounded-md ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.email}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="block text-sm mb-1">
                  Phone:
                </label>
                <input
                  id="phone"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  type="text"
                  className={`w-full p-2 rounded-md ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.phone}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="block text-sm mb-1">
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
                  className={`w-full p-2 rounded-md ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={formData.address}
                  disabled={!isFormEnabled}
                />
              </div>

              {/* Save Changes Button */}
              {isFormEnabled && (
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Edit/Cancel Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={toggleFormEnabled}
                className={`px-4 py-2 rounded-md transition ${
                  isFormEnabled
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isFormEnabled ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="hidden rounded-md overflow-hidden lg:block w-3/4">
            {/* <BookingComponent /> */}
            <Favourites />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProfileComponent;
