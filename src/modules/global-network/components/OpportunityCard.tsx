import React from 'react';
import { MethaneHotspot } from '../types/network.types';

interface OpportunityCardProps {
    hotspot: MethaneHotspot;
    rank: number;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ hotspot, rank }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-700 text-xs flex items-center justify-center text-slate-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">{rank}</span>
                    <div className="font-bold text-white">{hotspot.name}, {hotspot.country}</div>
                </div>
                <div className="text-red-400 font-bold text-xs bg-red-900/20 px-2 py-1 rounded border border-red-500/20">
                    {hotspot.ch4_anomaly} CH4
                </div>
            </div>

            <p className="text-xs text-slate-400 mb-3 pl-7">
                {hotspot.opportunity}
            </p>

            <div className="pl-7">
                <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 w-2/3"></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                    <span>Viabilidad Técnica</span>
                    <span>Alta</span>
                </div>
            </div>
        </div>
    );
};
