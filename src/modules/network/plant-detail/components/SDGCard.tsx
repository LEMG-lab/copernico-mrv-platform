import React, { useState } from 'react';
import { SDGContribution } from '../types/plantDetail.types';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface SDGCardProps {
    sdg: SDGContribution;
    sdgMeta: {
        number: number;
        name: string;
        color: string;
        icon: string;
        description: string;
    };
    isExpandedDefault?: boolean;
}

export const SDGCard: React.FC<SDGCardProps> = ({ sdg, sdgMeta, isExpandedDefault = false }) => {
    const [isExpanded, setIsExpanded] = useState(isExpandedDefault);

    if (!sdg.is_primary) return null; // Logic for primary view list

    return (
        <div
            className="rounded-xl overflow-hidden border transition-all duration-300 mb-4"
            style={{
                borderColor: isExpanded ? sdgMeta.color : '#334155',
                backgroundColor: isExpanded ? `${sdgMeta.color}05` : '#1E293B'
            }}
        >
            <div
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 flex items-center justify-center text-white font-bold text-lg rounded-lg shadow-sm"
                        style={{ backgroundColor: sdgMeta.color }}
                    >
                        {sdg.sdg_number}
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">{sdgMeta.name}</h3>
                        <p className="text-slate-400 text-xs hidden sm:block">{sdgMeta.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Badge for blockchain verification hint */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-400 border border-slate-700">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>Verificado</span>
                    </div>
                    {isExpanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </div>
            </div>

            {isExpanded && (
                <div className="p-4 pt-0 border-t border-slate-700/50 animate-fade-in">
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed mt-4">
                        {sdg.contribution_description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {sdg.metrics.map((metric, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                                <div className="text-xs text-slate-500 mb-1 font-medium uppercase">{metric.indicator}</div>
                                <div className="text-white font-bold text-lg">
                                    {metric.value} <span className="text-xs font-normal text-slate-400">{metric.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
