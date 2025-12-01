import React, { useContext } from 'react';
import TaskCard from './TaskCard';
import { AuthContext } from '../../context/AuthProvider';
import apis from '../../api/apis';
import httpAction from '../../utils/httpAction';
import toast from 'react-hot-toast';

const NewTask = ({ data }) => {
    const { setTasks, setUserdata } = useContext(AuthContext);

    const getCurrentEmployeeId = () => {
        try {
            const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
            return user.userId || user._id || null;
        } catch {
            return null;
        }
    };

    const handleAcceptTask = async () => {
        const employeeId = getCurrentEmployeeId();
        if (!employeeId) {
            toast.error("Session expired. Please login again.");
            return;
        }

        try {
            const response = await httpAction({
                url: apis().acceptTask,
                method: "POST",
                body: JSON.stringify({ taskId: data._id, employeeId }),
                credentials: "include",
            });

            if (response?.status) {
                toast.success("Task accepted successfully!");

                setTasks(prev => prev.map(task =>
                    task._id === data._id
                        ? { ...task, newTask: false, active: true }
                        : task
                ));

                const user = JSON.parse(localStorage.getItem("userInfo"));
                user.taskNumbers.active += 1;
                user.taskNumbers.newTask -= 1;
                localStorage.setItem("userInfo", JSON.stringify(user));
                setUserdata(user);
            } else {
                toast.error(response?.message || "Failed to accept task");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
    <TaskCard status="new">
        <div className="flex justify-between items-start mb-6">
            <span className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold rounded-full backdrop-blur">
                {data.category}
            </span>
            <span className="text-gray-400 text-sm font-medium">
                {data.taskDate ? new Date(data.taskDate).toLocaleDateString("en-IN") : "No Date"}
            </span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4 line-clamp-2">
            {data.taskTitle}
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed flex-1 line-clamp-6 mb-8">
            {data.taskDescription}
        </p>

        <button
            onClick={handleAcceptTask}
            className="mt-auto w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 cursor-pointer"
        >
            Accept Task
        </button>
    </TaskCard>
);
};

export default NewTask;