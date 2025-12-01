import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const TaskListNumbers = () => {
    const { userData } = useContext(AuthContext);

    const stats = userData?.taskNumbers || { newTask: 0, active: 0, completed: 0, failed: 0 };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {/* New Task */}
            <div className="bg-yellow-500 rounded-3xl p-10 text-center shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 border-4 border-yellow-400">
                <h1 className="text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl">
                    {stats.newTask}
                </h1>
                <p className="text-xl lg:text-2xl font-bold text-white mt-4">New Tasks</p>
            </div>

            {/* Active Task */}
            <div className="bg-blue-600 rounded-3xl p-10 text-center shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 border-4 border-blue-500">
                <h1 className="text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl">
                    {stats.active}
                </h1>
                <p className="text-xl lg:text-2xl font-bold text-white mt-4">Active</p>
            </div>

            {/* Completed */}
            <div className="bg-green-600 rounded-3xl p-10 text-center shadow-2xl hover:shadow-green-600/50 transition-all duration-300 border-4 border-green-500">
                <h1 className="text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl">
                    {stats.completed}
                </h1>
                <p className="text-xl lg:text-2xl font-bold text-white mt-4">Completed</p>
            </div>

            {/* Failed */}
            <div className="bg-red-600 rounded-3xl p-10 text-center shadow-2xl hover:shadow-red-600/50 transition-all duration-300 border-4 border-red-500">
                <h1 className="text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl">
                    {stats.failed}
                </h1>
                <p className="text-xl lg:text-2xl font-bold text-white mt-4">Failed</p>
            </div>
        </div>
    );
};

export default TaskListNumbers;