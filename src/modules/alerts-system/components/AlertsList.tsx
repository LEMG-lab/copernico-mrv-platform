// src/modules/alerts-system/components/AlertsList.tsx

import React from 'react';
import { Alert } from '../types/alerts.types';
import { AlertCard } from './AlertCard';

interface AlertsListProps {
    alerts: Alert[];
    onAcknowledge?: (id: string) => void;
    onInProgress?: (id: string) => void;
    onResolve?: (id: string) => void;
    onDismiss?: (id: string) => void;
    maxItems?: number;
    showViewAll?: boolean;
    onViewAll?: () => void;
    emptyMessage?: string;
}

export const AlertsList: React.FC<AlertsListProps> = ({
    alerts,
    onAcknowledge,
    onInProgress,
    onResolve,
    onDismiss,
    maxItems,
    showViewAll = false,
    onViewAll,
    emptyMessage = "No hay alertas que mostrar"
}) => {
    const displayAlerts = maxItems ? alerts.slice(0, maxItems) : alerts;
    const hasMore = maxItems && alerts.length > maxItems;

    if (alerts.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-slate-500 font-medium">{emptyMessage}</p>
                <p className="text-sm text-slate-400 mt-1">Todo está funcionando correctamente</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {displayAlerts.map((alert, index) => (
                <div
                    key={alert.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <AlertCard
                        alert={alert}
                        onAcknowledge={onAcknowledge}
                        onInProgress={onInProgress}
                        onResolve={onResolve}
                        onDismiss={onDismiss}
                    />
                </div>
            ))}

            {(showViewAll || hasMore) && onViewAll && (
                <button
                    onClick={onViewAll}
                    className="w-full py-3 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                    Ver todas las alertas ({alerts.length})
                </button>
            )}
        </div>
    );
};
