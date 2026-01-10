// src/modules/alerts-system/components/AlertCard.tsx

import React from 'react';
import { Alert, SEVERITY_CONFIG, ALERT_TYPE_LABELS } from '../types/alerts.types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface AlertCardProps {
    alert: Alert;
    onAcknowledge?: (id: string) => void;
    onInProgress?: (id: string) => void;
    onResolve?: (id: string) => void;
    onDismiss?: (id: string) => void;
    compact?: boolean;
}

export const AlertCard: React.FC<AlertCardProps> = ({
    alert,
    onAcknowledge,
    onInProgress,
    onResolve,
    onDismiss,
    compact = false
}) => {
    const config = SEVERITY_CONFIG[alert.severity];
    const typeLabel = ALERT_TYPE_LABELS[alert.type];
    const timeAgo = formatDistanceToNow(new Date(alert.created_at), { addSuffix: true, locale: es });

    const statusLabels: Record<string, string> = {
        new: 'Nueva',
        acknowledged: 'Reconocida',
        in_progress: 'En progreso',
        resolved: 'Resuelta',
        dismissed: 'Descartada'
    };

    if (compact) {
        return (
            <div
                className="p-3 rounded-lg border transition-all duration-200 hover:shadow-md animate-fade-in"
                style={{ backgroundColor: config.bg, borderColor: `${config.color}40` }}
            >
                <div className="flex items-start gap-3">
                    <span className="text-lg">{config.icon}</span>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{alert.title}</p>
                        <p className="text-xs text-slate-500">{timeAgo}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="p-5 rounded-xl border-l-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ borderLeftColor: config.color }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span
                        className="text-xs font-bold uppercase px-2 py-0.5 rounded"
                        style={{ backgroundColor: config.bg, color: config.color }}
                    >
                        {config.icon} {config.label}
                    </span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-500">{timeAgo}</span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-500">{typeLabel}</span>
                    {alert.status !== 'new' && (
                        <>
                            <span className="text-xs text-slate-400">|</span>
                            <span
                                className="text-xs font-medium px-2 py-0.5 rounded-full"
                                style={{
                                    backgroundColor: alert.status === 'in_progress' ? '#DBEAFE' :
                                        alert.status === 'resolved' ? '#D1FAE5' : '#F3F4F6',
                                    color: alert.status === 'in_progress' ? '#3498DB' :
                                        alert.status === 'resolved' ? '#2ECC71' : '#6B7280'
                                }}
                            >
                                {statusLabels[alert.status]}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Title & Message */}
            <h3 className="font-bold text-slate-800 text-lg mb-1">{alert.title}</h3>
            {alert.plant_name && (
                <p className="text-sm text-slate-500 mb-2">
                    Planta: <span className="font-medium text-slate-700">{alert.plant_name}</span>
                    {alert.status === 'in_progress' && alert.acknowledged_by && (
                        <span className="ml-2">| Responsable: <span className="font-medium">{alert.acknowledged_by}</span></span>
                    )}
                </p>
            )}
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{alert.message}</p>

            {/* Data details if available */}
            {alert.data && Object.keys(alert.data).length > 0 && (
                <div className="bg-slate-50 rounded-lg p-3 mb-4 text-xs font-mono text-slate-600">
                    {alert.data.ndvi_before !== undefined && (
                        <div className="flex gap-4">
                            <span>NDVI anterior: <strong>{alert.data.ndvi_before}</strong></span>
                            <span>→</span>
                            <span>NDVI actual: <strong>{alert.data.ndvi_after}</strong></span>
                            <span className="text-red-500">({alert.data.change_pct > 0 ? '+' : ''}{alert.data.change_pct.toFixed(1)}%)</span>
                        </div>
                    )}
                    {alert.data.price_before !== undefined && (
                        <div className="flex gap-4">
                            <span>Precio anterior: <strong>${alert.data.price_before}/kg</strong></span>
                            <span>→</span>
                            <span>Precio actual: <strong>${alert.data.price_after}/kg</strong></span>
                            <span className="text-green-500">(+{alert.data.change_pct.toFixed(1)}%)</span>
                        </div>
                    )}
                    {alert.data.days_remaining !== undefined && (
                        <div>
                            <span>{alert.data.permit_name}</span>
                            <span className="ml-2 text-amber-600 font-bold">• Vence en {alert.data.days_remaining} días</span>
                        </div>
                    )}
                    {alert.data.current_utilization !== undefined && (
                        <div className="flex gap-4">
                            <span>Utilización actual: <strong>{alert.data.current_utilization}%</strong></span>
                            <span>Objetivo: <strong>{alert.data.target_utilization}%</strong></span>
                            <span className="text-red-500">({alert.data.gap_pct}%)</span>
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                {alert.action_url && alert.action_label && (
                    <a
                        href={alert.action_url}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
                        style={{ backgroundColor: config.color, color: 'white' }}
                    >
                        {alert.action_label}
                    </a>
                )}

                {alert.status === 'new' && onAcknowledge && (
                    <button
                        onClick={() => onAcknowledge(alert.id)}
                        className="px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                        Reconocer
                    </button>
                )}

                {(alert.status === 'new' || alert.status === 'acknowledged') && onInProgress && (
                    <button
                        onClick={() => onInProgress(alert.id)}
                        className="px-3 py-1.5 text-sm font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                    >
                        Marcar en progreso
                    </button>
                )}

                {alert.status === 'in_progress' && onResolve && (
                    <button
                        onClick={() => onResolve(alert.id)}
                        className="px-3 py-1.5 text-sm font-medium bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                    >
                        Resolver
                    </button>
                )}

                {alert.status !== 'resolved' && alert.status !== 'dismissed' && onDismiss && (
                    <button
                        onClick={() => onDismiss(alert.id)}
                        className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                    >
                        Descartar
                    </button>
                )}
            </div>
        </div>
    );
};
