import React from 'react';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
    title: string;
    description: string;
    actionText: string;
    linkTo: string;
    icon: string;
    gradient: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, actionText, linkTo, icon, gradient }) => {
    return (
        <Link to={linkTo} className="group block h-full">
            <div className="bg-white dark:bg-[#064e3b]/80 backdrop-blur-md rounded-xl border border-slate-200 dark:border-emerald-700/50 p-6 h-full transition-all duration-500 ease-out hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.6)] hover:-translate-y-2 hover:border-emerald-300/80 dark:hover:border-emerald-400/80 relative overflow-hidden">
                {/* Background Gradient Effect - Pulse on Hover */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-25 rounded-bl-full transition-all duration-700 ease-in-out group-hover:scale-110 blur-2xl`}></div>

                <div className="relative z-10">
                    <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                        {title}
                    </h3>
                    <p className="text-slate-600 dark:text-emerald-100/70 text-sm mb-6 leading-relaxed group-hover:text-emerald-50 transition-colors">
                        {description}
                    </p>
                    <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                        {actionText}
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
