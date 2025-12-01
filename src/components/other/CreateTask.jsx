import React, { useState } from 'react';
import toast from 'react-hot-toast';
import httpAction from '../../utils/httpAction';
import apis from '../../api/apis';

const CreateTask = ({ employees, setEmployees }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [taskDesc, setTaskDesc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await httpAction({
                url: apis().createTask,
                method: "POST",
                body: JSON.stringify({
                    taskTitle,
                    taskDescription: taskDesc,
                    taskDate,
                    category: taskCategory,
                    employeeName: assignedTo,
                }),
                credentials: "include",
            });

            if (response?.status) {
                toast.success("Task assigned successfully!");

                setEmployees((prev) =>
                    prev.map((emp) =>
                        emp.name === assignedTo
                            ? { ...emp, taskNumbers: { ...emp.taskNumbers, newTask: emp.taskNumbers.newTask + 1 } }
                            : emp
                    )
                );

                // Reset form
                setTaskTitle('');
                setTaskDate('');
                setTaskCategory('');
                setAssignedTo('');
                setTaskDesc('');
            } else {
                toast.error(response.message || "Task assignment failed");
            }
        } catch (error) {
            console.error("Error assigning task:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-10 bg-black/60 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-8 lg:p-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                        Create a New Task
                    </h1>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={taskCategory}
                                    onChange={(e) => setTaskCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="e.g., Design, Development"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Assign to
                                </label>
                                <input
                                    type="text"
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                    list="employee-list"
                                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    placeholder="Employee name"
                                    required
                                />
                                <datalist id="employee-list">
                                    {employees?.map((emp, i) => (
                                        <option key={i} value={emp.name} />
                                    ))}
                                </datalist>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Task Description
                                </label>
                                <textarea
                                    rows="8"
                                    value={taskDesc}
                                    onChange={(e) => setTaskDesc(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
                                    placeholder="Describe the task in detail..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-lg text-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;