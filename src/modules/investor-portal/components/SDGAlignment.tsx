import React from 'react';
import { SDGContribution } from '../types/investor.types';

interface SDGAlignmentProps {
    contributions: SDGContribution[];
}

const SDG_COLORS: Record<number, string> = {
    1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D', 5: '#FF3A21',
    6: '#26BDE2', 7: '#FCC30B', 8: '#A21942', 9: '#FD6925', 10: '#DD1367',
    11: '#FD9D24', 12: '#BF8B2E', 13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B',
    16: '#00689D', 17: '#19486A'
};

const SDG_NAMES: Record<number, string> = {
    2: 'Hambre Cero',
    8: 'Trabajo Decente',
    12: 'Prod. Responsable',
    13: 'Acción Climática',
    15: 'Vida Terrestre'
};

export const SDGAlignment: React.FC<SDGAlignmentProps> = ({ contributions }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {contributions.map((sdg) => {
                const color = SDG_COLORS[sdg.sdg] || '#000';
                const name = SDG_NAMES[sdg.sdg] || `ODS ${sdg.sdg}`;

                return (
                    <div key={sdg.sdg} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden flex flex-col relative group hover:-translate-y-1 transition-transform duration-300">
                        <div style={{ backgroundColor: color }} className="h-2 w-full"></div>
                        <div className="p-4 flex-1 flex flex-col items-center text-center">
                            <div className="text-3xl font-black mb-1" style={{ color: color }}>{sdg.sdg}</div>
                            <div className="text-xs font-bold text-slate-600 uppercase mb-3 line-clamp-1">{name}</div>

                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                                <div className="h-full rounded-full" style={{ width: `${sdg.score}%`, backgroundColor: color }}></div>
                            </div>
                            <div className="text-xs text-slate-400 font-mono">{sdg.score}/100</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
