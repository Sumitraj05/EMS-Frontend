import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import httpAction from '../../utils/httpAction';
import apis from '../../api/apis';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await httpAction({
                    url: apis().all_employees,
                    method: "GET",
                    credentials: "include",
                });

                if (response?.status) {
                    setEmployees(response.employees);
                } else {
                    toast.error(response.message || "Failed to fetch employees");
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                toast.error("Something went wrong");
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <Header />

            <div className="max-w-7xl mx-auto space-y-10">
                {/* Create Task Section */}
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 sm:p-8 shadow-xl">
                    <CreateTask employees={employees} setEmployees={setEmployees} />
                </div>

                {/* All Tasks Section */}
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 sm:p-8 shadow-xl">
                    <h5 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center sm:text-left">
                        All Assigned Tasks
                    </h5>
                    <div className="overflow-x-auto">
                        <AllTask employees={employees} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;