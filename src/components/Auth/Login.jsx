import React, { useState, useContext } from 'react';
import toast from "react-hot-toast";
import apis from "../../api/apis";
import httpAction from '../../utils/httpAction';
import { Link } from 'react-router-dom';
import useProvideHooks from '../../hooks/useProvider';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { navigate } = useProvideHooks(); 
    const { setUserdata, setTasks } = useContext(AuthContext); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchTasks = async (employeeId) => {
        try {
            const response = await httpAction({
                url: `${apis().getTasks}/${employeeId}`,
                method: 'GET',
                credentials: 'include',
            });
            setTasks(response?.status ? response.tasks : []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await httpAction({
                url: apis().loginUser, 
                method: "POST",
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (result?.status && result.user) {
                // THIS IS THE GOLDEN FIX
                const freshUser = result.user;

                // 1. Save to localStorage (always fresh!)
                localStorage.setItem("userInfo", JSON.stringify(freshUser));

                // 2. Update context
                setUserdata(freshUser);

                // 3. Fetch tasks
                if (freshUser.userId || freshUser._id) {
                    await fetchTasks(freshUser.userId || freshUser._id);
                }

                // 4. Navigate
                navigate('/');
                toast.success(`Welcome back, ${freshUser.name || 'User'}!`);
                setFormData({ email: "", password: "" });
            } 
            else {
                toast.error(result?.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-black rounded-xl border border-gray-600 shadow-2xl p-6 sm:p-8 md:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                        Sign in to your account
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="name@company.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg text-lg transition transform hover:scale-105 cursor-pointer shadow-lg"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            Don’t have an account yet?{' '}
                            <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-400 hover:underline transition">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;