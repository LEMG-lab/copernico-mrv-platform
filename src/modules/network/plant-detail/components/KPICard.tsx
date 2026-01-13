import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
        label?: string;
    };
    color?: 'blue' | 'green' | 'orange' | 'purple' | 'slate';
    progress?: number; // 0-100 for progress bar
}

export const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    color = 'slate',
    progress
}) => {
    const colorStyles = {
        blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', bar: 'bg-blue-500' },
        green: { bg: 'bg-green-500/10', text: 'text-green-500', bar: 'bg-green-500' },
        orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', bar: 'bg-orange-500' },
        purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', bar: 'bg-purple-500' },
        slate: { bg: 'bg-slate-700/50', text: 'text-slate-400', bar: 'bg-slate-500' },
    }[color];

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex flex-col justify-between hover:border-slate-500 transition-colors group h-full">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</span>
                    {Icon && <Icon className={`w-4 h-4 ${colorStyles.text} opacity-70 group-hover:opacity-100 transition-opacity`} />}
                </div>

                <div className="text-2xl font-bold text-white mb-1">
                    {value}
                </div>

                {subtitle && (
                    <div className="text-xs text-slate-500 mb-2">{subtitle}</div>
                )}
            </div>

            <div className="mt-2">
                {progress !== undefined && (
                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div
                            className={`h-full rounded-full ${colorStyles.bar}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {trend && (
                    <div className={`flex items-center text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
                        {trend.label && <span className="text-slate-600 ml-1">{trend.label}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};
