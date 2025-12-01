import React, { useContext } from "react";
import homeImg from '../../../assets/HomeImg.png';
import { AuthContext } from "../../context/AuthProvider";
import useProvideHooks from "../../hooks/useProvider";

const Home = () => {
  const { navigate } = useProvideHooks();
  const { userData } = useContext(AuthContext);
  const role = userData?.role || "";

  const navigateToPage = () => {
    if (role === "admin") {
      navigate("/adminDash");
    } else {
      navigate("/employeeDash");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side - Text & Button */}
        <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Keep Track of Your Work <br />
            <span className="text-yellow-500">Easily!</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
            Manage employees, track data, and stay on top of everything with ease.
          </p>

          <div className="flex justify-center lg:justify-start">
            {userData ? (
              <button
                onClick={navigateToPage}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg sm:text-xl py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg sm:text-xl py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
              >
                Login to Continue
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="order-1 lg:order-2 flex justify-center">
          <img
            src={homeImg}
            alt="Employee Management System"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-2xl shadow-2xl object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;