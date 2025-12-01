import React from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../tasklist/TaskList';

const EmployeeDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <Header />

            <div className="max-w-7xl mx-auto">
                {/* Task Summary Cards — NOW PERFECTLY SPACED */}
                <div className="my-12">
                    <TaskListNumbers />
                </div>

                {/* Task List Section */}
                <div className="bg-black/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">
                        Your Tasks
                    </h2>
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;