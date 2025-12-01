// src/components/tasklist/TaskCard.jsx
import React from 'react';

const TaskCard = ({ children, status = "new" }) => {
    const gradients = {
        new: "from-amber-500/10 to-orange-600/10 border-amber-500/20",
        active: "from-blue-500/10 to-cyan-600/10 border-blue-500/20",
        completed: "from-emerald-500/10 to-teal-600/10 border-emerald-500/20",
        failed: "from-rose-500/10 to-red-600/10 border-rose-500/20"
    };

    const glows = {
        new: "shadow-amber-500/20",
        active: "shadow-blue-500/20",
        completed: "shadow-emerald-500/20",
        failed: "shadow-rose-500/20"
    };

    return (
        <div className="flex-shrink-0 p-4">  {/* This padding prevents overflow */}
            <div className={`relative group w-[300px] sm:w-[340px] lg:w-[360px] h-[440px]
                            bg-gray-900/90 backdrop-blur-xl rounded-3xl border ${gradients[status]}
                            overflow-hidden shadow-2xl ${glows[status]}
                            transition-all duration-400 
                            hover:shadow-3xl hover:shadow-current/40
                            hover:-translate-y-3`}>
                
                {/* Subtle floating orb – smaller & softer */}
                <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full 
                                bg-gradient-to-br ${status === 'new' ? 'from-amber-400/30' : 
                                status === 'active' ? 'from-blue-400/30' : 
                                status === 'completed' ? 'from-emerald-400/30' : 'from-rose-400/30'} 
                                to-transparent blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />

                <div className="relative z-10 p-7 flex flex-col h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;