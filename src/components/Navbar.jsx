import React, { useContext, useState } from 'react';
import logo from "./../../assets/logo ems.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import httpAction from '../utils/httpAction';
import apis from '../api/apis';
import useProvideHooks from '../hooks/useProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { userData, setUserdata, setTasks } = useContext(AuthContext);
    const { navigate } = useProvideHooks();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const role = userData?.role || "";

    const logout = async () => {
        try {
            await httpAction({
                url: apis().logout,
                method: "POST",
                credentials: 'include'
            });

            // THESE 3 LINES = NO MORE GHOST USERS, NEGATIVE TASKS, OR WRONG NAMES EVER AGAIN
            localStorage.removeItem("userInfo");   // KILLS GHOST DATA
            setUserdata(null);                     // Clears context
            setTasks([]);                          // Clears tasks

            toast.success("Logged out successfully!");
            setMobileMenuOpen(false);              // Close mobile menu
            navigate('/login');
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Logout failed. Please try again.");

            // Even if backend fails, we FORCE logout on frontend
            localStorage.removeItem("userInfo");
            setUserdata(null);
            setTasks([]);
            setMobileMenuOpen(false);
            navigate('/login');
        }
    };

    return (
        <nav className="bg-[#1c1c1c] fixed w-full z-50 top-0 shadow-2xl border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <img src={logo} className="h-9 sm:h-10" alt="EMS Logo" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {role === "employee" && (
                            <Link
                                to="/employeeDash"
                                className="text-yellow-400 hover:text-yellow-300 font-medium transition"
                            >
                                Employee Dashboard
                            </Link>
                        )}
                        {role === "admin" && (
                            <Link
                                to="/adminDash"
                                className="text-yellow-400 hover:text-yellow-300 font-medium transition"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        {userData ? (
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg transition transform hover:scale-105 cursor-pointer shadow-lg"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-lg transition transform hover:scale-105 cursor-pointer shadow-lg"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none p-2"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#1c1c1c] border-t border-gray-800">
                        <div className="px-4 pt-4 pb-6 space-y-4">
                            {role === "employee" && (
                                <Link
                                    to="/employeeDash"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-yellow-400 hover:text-yellow-300 font-medium text-lg py-2"
                                >
                                    Employee Dashboard
                                </Link>
                            )}
                            {role === "admin" && (
                                <Link
                                    to="/adminDash"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-yellow-400 hover:text-yellow-300 font-medium text-lg py-2"
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            {userData ? (
                                <button
                                    onClick={logout}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition shadow-md"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-lg transition shadow-md"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;