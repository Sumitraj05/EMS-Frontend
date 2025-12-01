import React, { useContext } from 'react';
import AcceptedTask from './AcceptedTask';
import NewTask from './NewTask';
import CompletedTask from './CompletedTask';
import FailedTask from './FailedTask';
import { AuthContext } from '../../context/AuthProvider';

const TaskList = () => {
    const { tasks } = useContext(AuthContext);

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center text-gray-400 py-16 text-lg font-medium">
                No tasks available yet.
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-10">
            <div
                id="tasklist"
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
                style={{ scrollbarWidth: 'thin' }}
            >
                {tasks.map((elem, idx) => {
                    if (elem.newTask) {
                        return <NewTask key={idx} data={elem} />;
                    }
                    if (elem.active) {
                        return <AcceptedTask key={idx} data={elem} />;
                    }
                    if (elem.completed) {
                        return <CompletedTask key={idx} data={elem} />;
                    }
                    if (elem.failed) {
                        return <FailedTask key={idx} data={elem} />;
                    }
                    return null;
                })}

                {/* Optional: Add empty divs for better scrolling feel on mobile */}
                <div className="flex-shrink-0 w-4 sm:w-6" />
            </div>

            {/* Mobile scroll hint */}
            {tasks.length > 1 && (
                <p className="text-center text-gray-500 text-sm mt-4 sm:hidden">
                    Swipe to see more tasks
                </p>
            )}
        </div>
    );
};

export default TaskList;