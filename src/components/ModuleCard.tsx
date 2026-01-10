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
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 relative overflow-hidden">
                {/* Background Gradient Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`}></div>

                <div className="relative z-10">
                    <div className="text-4xl mb-4">{icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                        {description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {actionText}
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
