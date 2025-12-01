import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Header = () => {
    const { userData } = useContext(AuthContext);

    const name = userData?.name || "User";
    const role = userData?.role || "";

    return (
        <div className="w-full bg-black/70 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Greeting */}
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-tight">
                        Hello,{" "}
                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
                            {name}
                        </span>
                        <span className="text-gray-300">!</span>
                    </h1>

                    {/* Role Message */}
                    <p className="text-sm sm:text-base md:text-lg font-medium text-gray-300 text-center sm:text-right">
                        {role === "admin" ? (
                            <span className="text-blue-400 font-bold">
                                Give Tasks to Employees
                            </span>
                        ) : (
                            <span className="text-blue-400 font-bold">
                                Complete Your Work
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;