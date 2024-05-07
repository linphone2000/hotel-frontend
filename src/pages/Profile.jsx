import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  // Context
  const { currentUser } = useAuth();

  // State
  const [isFormEnabled, setIsFormEnabled] = useState(false);

  // Handlers
  const toggleFormEnabled = () => {
    setIsFormEnabled(!isFormEnabled);
  };

  return (
    <>
      {currentUser ? (
        <div className="text-center p-8">
          {/* Profile Picture */}
          <img
            src="assets/placeholder.png"
            alt="Profile Picture"
            className="mx-auto rounded-full h-28 w-28 mb-4"
          />

          {/* Profile Heading */}
          <h1 className="text-5xl font-bold mb-4">{currentUser.fullName}</h1>

          {/* Profile Edit */}
          <form className="flex justify-center">
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
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={currentUser.fullName}
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
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={currentUser.email}
                  disabled={!isFormEnabled}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-evenly mb-2">
                <label htmlFor="phone" className="md:w-1/3 block mb-2 text-lg">
                  Phone:
                </label>
                <input
                  id="phone"
                  type="text"
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={currentUser.phone}
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
                  type="text"
                  className={`p-2 rounded-md w-full md:w-2/3 mb-2 ${
                    isFormEnabled
                      ? "bg-gray-200 outline outline-1 outline-blue-300 focus:outline-blue-700 focus:outline-2 animate-pulse"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  value={currentUser.address}
                  disabled={!isFormEnabled}
                />
              </div>

              {/* Button */}
              {isFormEnabled && (
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`mt-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition`}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>

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

export default Profile;
