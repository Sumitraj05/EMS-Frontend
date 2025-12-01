import React from 'react';

const AllTask = ({ employees }) => {
    if (!employees || employees.length === 0) {
        return (
            <div className="text-center text-gray-400 py-12 text-lg">
                No employees found.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg shadow-xl">
            <div className="min-w-[700px] sm:min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 bg-yellow-600 text-white font-bold text-sm sm:text-base md:text-lg px-4 py-4 rounded-t-lg">
                    <div className="text-left">Employee Name</div>
                    <div className="text-center">New</div>
                    <div className="text-center">Active</div>
                    <div className="text-center">Completed</div>
                    <div className="text-center">Failed</div>
                </div>

                {/* Table Body */}
                <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-b-lg">
                    {employees.map((ele, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-5 gap-4 px-4 py-5 border-b border-gray-700 last:border-b-0 hover:bg-gray-800/50 transition text-sm sm:text-base md:text-lg"
                        >
                            <div className="text-white font-medium truncate">
                                {ele.name}
                            </div>
                            <div className="text-yellow-300 text-center font-semibold">
                                {ele.taskNumbers.newTask}
                            </div>
                            <div className="text-blue-400 text-center font-semibold">
                                {ele.taskNumbers.active}
                            </div>
                            <div className="text-green-400 text-center font-semibold">
                                {ele.taskNumbers.completed}
                            </div>
                            <div className="text-red-500 text-center font-semibold">
                                {ele.taskNumbers.failed}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile-friendly scroll hint */}
            <div className="sm:hidden text-center text-gray-500 text-xs mt-3 pb-2">
                Swipe to see more
            </div>
        </div>
    );
};

export default AllTask;