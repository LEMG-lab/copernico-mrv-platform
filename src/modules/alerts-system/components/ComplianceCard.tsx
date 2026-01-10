// src/modules/alerts-system/components/ComplianceCard.tsx

import React from 'react';
import { ComplianceItem, COMPLIANCE_STATUS_CONFIG } from '../types/alerts.types';

interface ComplianceCardProps {
    item: ComplianceItem;
    onClick?: () => void;
}

const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
    environmental: { label: 'Ambiental', icon: '🌿' },
    sanitary: { label: 'Sanitario', icon: '🏥' },
    operational: { label: 'Operativo', icon: '⚙️' },
    financial: { label: 'Financiero', icon: '💰' },
    certification: { label: 'Certificación', icon: '📜' }
};

export const ComplianceCard: React.FC<ComplianceCardProps> = ({ item, onClick }) => {
    const statusConfig = COMPLIANCE_STATUS_CONFIG[item.status];
    const categoryConfig = CATEGORY_LABELS[item.category];

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div
            className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{categoryConfig.icon}</span>
                        <span className="text-xs text-slate-500 uppercase font-medium">{categoryConfig.label}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 truncate">{item.requirement}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Planta: <span className="font-medium text-slate-700">{item.plant_name}</span>
                    </p>
                </div>

                <div className="text-right shrink-0">
                    <div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                            backgroundColor: `${statusConfig.color}20`,
                            color: statusConfig.color
                        }}
                    >
                        {statusConfig.icon} {statusConfig.label}
                    </div>
                    {item.days_until_expiry !== undefined && item.days_until_expiry > 0 && (
                        <p className="text-xs text-slate-500 mt-1">
                            {item.days_until_expiry} días restantes
                        </p>
                    )}
                </div>
            </div>

            {/* Additional info */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Responsable: {item.responsible_person || '-'}</span>
                <span>Vence: {formatDate(item.expiry_date)}</span>
            </div>

            {item.notes && (
                <p className="mt-2 text-xs text-slate-500 italic bg-slate-50 p-2 rounded">
                    {item.notes}
                </p>
            )}
        </div>
    );
};
