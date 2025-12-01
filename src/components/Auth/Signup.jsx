import React, { useState } from 'react';
import toast from "react-hot-toast";
import apis from "../../api/apis";
import httpAction from '../../utils/httpAction';
import useProvideHooks from '../../hooks/useProvider';

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const { navigate } = useProvideHooks(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await httpAction({
                url: apis().registerUser, 
                method: "POST", 
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (result?.status) {
                toast.success(result.message || "Account created successfully!");
                navigate('/login');
                setFormData({ name: "", email: "", password: "" });
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-black rounded-xl border border-gray-600 shadow-2xl p-6 sm:p-8 md:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                        Create your account
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Your name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

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
                            Sign Up
                        </button>

                        <p className="text-center text-sm text-gray-400 mt-6">
                            Already have an account?{' '}
                            <span 
                                onClick={() => navigate('/login')} 
                                className="font-medium text-blue-500 hover:text-blue-400 hover:underline cursor-pointer transition"
                            >
                                Sign in
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;