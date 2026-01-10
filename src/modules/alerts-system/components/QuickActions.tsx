// src/modules/alerts-system/components/QuickActions.tsx

import React from 'react';
import { AlertStats } from '../types/alerts.types';

interface QuickActionsProps {
    stats: AlertStats;
    onFilterBySeverity: (severity: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ stats, onFilterBySeverity }) => {
    const cards = [
        {
            key: 'critical',
            label: 'Críticas',
            sublabel: 'requieren atención',
            count: stats.critical,
            color: '#E74C3C',
            bg: '#FEE2E2',
            icon: '🔴'
        },
        {
            key: 'warning',
            label: 'Advertencias',
            sublabel: 'revisar pronto',
            count: stats.warning,
            color: '#F39C12',
            bg: '#FEF3C7',
            icon: '🟡'
        },
        {
            key: 'info',
            label: 'Informativas',
            sublabel: 'para tu información',
            count: stats.info,
            color: '#3498DB',
            bg: '#DBEAFE',
            icon: '🔵'
        },
        {
            key: 'positive',
            label: 'Positivas',
            sublabel: 'oportunidades',
            count: stats.positive,
            color: '#2ECC71',
            bg: '#D1FAE5',
            icon: '🟢'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <button
                    key={card.key}
                    onClick={() => onFilterBySeverity(card.key)}
                    className="p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg text-left"
                    style={{
                        backgroundColor: card.bg,
                        borderColor: card.count > 0 ? card.color : 'transparent'
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{card.icon}</span>
                        <span
                            className="text-3xl font-black"
                            style={{ color: card.color }}
                        >
                            {card.count}
                        </span>
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 text-sm">{card.label}</p>
                        <p className="text-xs text-slate-500">{card.sublabel}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};
