import React, { useContext } from 'react';
import TaskCard from './TaskCard';
import { AuthContext } from '../../context/AuthProvider';
import httpAction from '../../utils/httpAction';
import apis from '../../api/apis';
import toast from 'react-hot-toast';

const AcceptedTask = ({ data }) => {
    const { setTasks, setUserdata } = useContext(AuthContext);

    const getCurrentEmployeeId = () => {
        try {
            const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
            return user.userId || user._id || null;
        } catch {
            return null;
        }
    };

    const handleMarkAsCompleted = async () => {
        const employeeId = getCurrentEmployeeId();
        if (!employeeId) return toast.error("Please login again");

        try {
            const response = await httpAction({
                url: apis().markAsCompleted,
                method: "POST",
                body: JSON.stringify({ taskId: data._id, employeeId }),
                credentials: "include",
            });

            if (response?.status) {
                toast.success("Task marked as completed!");

                setTasks(prev => prev.map(task =>
                    task._id === data._id ? { ...task, active: false, completed: true } : task
                ));

                const user = JSON.parse(localStorage.getItem("userInfo"));
                user.taskNumbers.active -= 1;
                user.taskNumbers.completed += 1;
                localStorage.setItem("userInfo", JSON.stringify(user));
                setUserdata(user);
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    const handleMarkAsFailed = async () => {
        const employeeId = getCurrentEmployeeId();
        if (!employeeId) return toast.error("Please login again");

        try {
            const response = await httpAction({
                url: apis().markAsFailed,
                method: "POST",
                body: JSON.stringify({ taskId: data._id, employeeId }),
                credentials: "include",
            });

            if (response?.status) {
                toast.success("Task marked as failed!");

                setTasks(prev => prev.map(task =>
                    task._id === data._id ? { ...task, active: false, failed: true } : task
                ));

                const user = JSON.parse(localStorage.getItem("userInfo"));
                user.taskNumbers.active -= 1;
                user.taskNumbers.failed += 1;
                localStorage.setItem("userInfo", JSON.stringify(user));
                setUserdata(user);
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

   return (
    <TaskCard status="active">
        <div className="flex justify-between items-start mb-6">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/50 text-blue-300 text-xs font-bold rounded-full backdrop-blur">
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

        <div className="flex gap-4 mt-auto">
            <button onClick={handleMarkAsCompleted}
                className="flex-1 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                Completed
            </button>
            <button onClick={handleMarkAsFailed}
                className="flex-1 py-5 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-rose-500/50 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                Failed
            </button>
        </div>
    </TaskCard>
);
};

export default AcceptedTask;