// src/modules/alerts-system/components/AlertHistory.tsx

import React, { useState } from 'react';
import { Alert, SEVERITY_CONFIG, ALERT_TYPE_LABELS } from '../types/alerts.types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface AlertHistoryProps {
    alerts: Alert[];
}

export const AlertHistory: React.FC<AlertHistoryProps> = ({ alerts }) => {
    const [showAll, setShowAll] = useState(false);

    // Filter to only resolved/dismissed
    const historyAlerts = alerts.filter(a => a.status === 'resolved' || a.status === 'dismissed');
    const displayAlerts = showAll ? historyAlerts : historyAlerts.slice(0, 5);

    if (historyAlerts.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-4">Historial de Alertas</h3>
                <p className="text-slate-500 text-center py-8">No hay alertas resueltas aún</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg">Historial de Alertas</h3>
                <p className="text-sm text-slate-500">{historyAlerts.length} alertas resueltas/descartadas</p>
            </div>

            <div className="divide-y divide-slate-100">
                {displayAlerts.map((alert) => {
                    const config = SEVERITY_CONFIG[alert.severity];
                    const resolvedAt = alert.resolved_at
                        ? formatDistanceToNow(new Date(alert.resolved_at), { addSuffix: true, locale: es })
                        : formatDistanceToNow(new Date(alert.created_at), { addSuffix: true, locale: es });

                    return (
                        <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3">
                            <span
                                className="w-2 h-2 rounded-full mt-2 shrink-0"
                                style={{ backgroundColor: config.color }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 text-sm truncate">{alert.title}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                    <span>{ALERT_TYPE_LABELS[alert.type]}</span>
                                    <span>•</span>
                                    <span>{resolvedAt}</span>
                                    {alert.resolved_by && (
                                        <>
                                            <span>•</span>
                                            <span>Por: {alert.resolved_by}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <span
                                className="text-xs px-2 py-0.5 rounded-full shrink-0"
                                style={{
                                    backgroundColor: alert.status === 'resolved' ? '#D1FAE5' : '#F3F4F6',
                                    color: alert.status === 'resolved' ? '#059669' : '#6B7280'
                                }}
                            >
                                {alert.status === 'resolved' ? 'Resuelta' : 'Descartada'}
                            </span>
                        </div>
                    );
                })}
            </div>

            {historyAlerts.length > 5 && (
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {showAll ? 'Mostrar menos' : `Ver todas (${historyAlerts.length})`}
                    </button>
                </div>
            )}
        </div>
    );
};
