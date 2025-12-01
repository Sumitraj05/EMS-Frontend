import React from 'react';
import TaskCard from './TaskCard';

const FailedTask = ({ data }) => {
    if (!data) {
        return (
            <div className="text-center text-gray-400 py-10 text-lg">
                Loading...
            </div>
        );
    }

    return (
    <TaskCard status="failed">
        <div className="flex justify-between items-start mb-6">
            <span className="px-4 py-2 bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs font-bold rounded-full backdrop-blur">
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

        <button disabled className="mt-auto w-full py-5 bg-gradient-to-r from-rose-600 to-red-700 text-white font-bold text-xl rounded-2xl opacity-90 cursor-not-allowed">
            Task Failed
        </button>
    </TaskCard>
);
};

export default FailedTask;