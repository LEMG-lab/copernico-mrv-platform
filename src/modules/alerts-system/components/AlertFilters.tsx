// src/modules/alerts-system/components/AlertFilters.tsx

import React from 'react';
import { AlertSeverity, AlertStatus, AlertType, SEVERITY_CONFIG, ALERT_TYPE_LABELS } from '../types/alerts.types';

interface AlertFiltersProps {
    filters: {
        severity?: AlertSeverity[];
        status?: AlertStatus[];
        type?: AlertType[];
        search?: string;
    };
    onFilterChange: (filters: any) => void;
    onClear: () => void;
}

export const AlertFilters: React.FC<AlertFiltersProps> = ({ filters, onFilterChange, onClear }) => {
    const severities: AlertSeverity[] = ['critical', 'warning', 'info', 'positive'];
    const statuses: { value: AlertStatus; label: string }[] = [
        { value: 'new', label: 'Nuevas' },
        { value: 'acknowledged', label: 'Reconocidas' },
        { value: 'in_progress', label: 'En progreso' },
        { value: 'resolved', label: 'Resueltas' },
        { value: 'dismissed', label: 'Descartadas' }
    ];
    const types: AlertType[] = ['operational', 'environmental', 'financial', 'regulatory', 'competitive', 'opportunity'];

    const toggleSeverity = (severity: AlertSeverity) => {
        const current = filters.severity || [];
        const updated = current.includes(severity)
            ? current.filter(s => s !== severity)
            : [...current, severity];
        onFilterChange({ severity: updated.length ? updated : undefined });
    };

    const toggleStatus = (status: AlertStatus) => {
        const current = filters.status || [];
        const updated = current.includes(status)
            ? current.filter(s => s !== status)
            : [...current, status];
        onFilterChange({ status: updated.length ? updated : undefined });
    };

    const toggleType = (type: AlertType) => {
        const current = filters.type || [];
        const updated = current.includes(type)
            ? current.filter(t => t !== type)
            : [...current, type];
        onFilterChange({ type: updated.length ? updated : undefined });
    };

    const hasActiveFilters = filters.severity?.length || filters.status?.length || filters.type?.length || filters.search;

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
            {/* Search */}
            <div>
                <input
                    type="text"
                    placeholder="Buscar alertas..."
                    value={filters.search || ''}
                    onChange={(e) => onFilterChange({ search: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>

            {/* Severity */}
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Severidad</h4>
                <div className="flex flex-wrap gap-2">
                    {severities.map(severity => {
                        const config = SEVERITY_CONFIG[severity];
                        const isActive = filters.severity?.includes(severity);
                        return (
                            <button
                                key={severity}
                                onClick={() => toggleSeverity(severity)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${isActive
                                        ? 'ring-2 ring-offset-1'
                                        : 'opacity-60 hover:opacity-100'
                                    }`}
                                style={{
                                    backgroundColor: config.bg,
                                    color: config.color,
                                    ringColor: isActive ? config.color : undefined
                                }}
                            >
                                {config.icon} {config.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Status */}
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Estado</h4>
                <div className="flex flex-wrap gap-2">
                    {statuses.map(({ value, label }) => {
                        const isActive = filters.status?.includes(value);
                        return (
                            <button
                                key={value}
                                onClick={() => toggleStatus(value)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all border ${isActive
                                        ? 'bg-slate-800 text-white border-slate-800'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Type */}
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Tipo</h4>
                <div className="flex flex-wrap gap-2">
                    {types.map(type => {
                        const isActive = filters.type?.includes(type);
                        return (
                            <button
                                key={type}
                                onClick={() => toggleType(type)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all border ${isActive
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                    }`}
                            >
                                {ALERT_TYPE_LABELS[type]}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
                <button
                    onClick={onClear}
                    className="w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                >
                    Limpiar filtros
                </button>
            )}
        </div>
    );
};
