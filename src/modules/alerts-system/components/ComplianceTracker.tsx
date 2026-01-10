// src/modules/alerts-system/components/ComplianceTracker.tsx

import React, { useState } from 'react';
import { ComplianceItem, COMPLIANCE_STATUS_CONFIG } from '../types/alerts.types';

interface ComplianceTrackerProps {
    items: ComplianceItem[];
    plants: { id: string; name: string }[];
    selectedPlant?: string;
    onPlantChange: (plantId?: string) => void;
}

export const ComplianceTracker: React.FC<ComplianceTrackerProps> = ({
    items,
    plants,
    selectedPlant,
    onPlantChange
}) => {
    const [sortBy, setSortBy] = useState<'status' | 'expiry'>('status');

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
        });
    };

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'expiry') {
            const aExpiry = a.days_until_expiry ?? 9999;
            const bExpiry = b.days_until_expiry ?? 9999;
            return aExpiry - bExpiry;
        }
        return 0; // Already sorted by status in hook
    });

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-bold text-slate-800 text-lg">Estado de Compliance</h3>

                <div className="flex items-center gap-3">
                    <select
                        value={selectedPlant || 'all'}
                        onChange={(e) => onPlantChange(e.target.value === 'all' ? undefined : e.target.value)}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="all">Todas las plantas</option>
                        {plants.map(plant => (
                            <option key={plant.id} value={plant.id}>{plant.name}</option>
                        ))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'status' | 'expiry')}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="status">Ordenar por estado</option>
                        <option value="expiry">Ordenar por vencimiento</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Requisito</th>
                            <th className="px-4 py-3 text-left font-medium">Planta</th>
                            <th className="px-4 py-3 text-left font-medium">Vence</th>
                            <th className="px-4 py-3 text-left font-medium">Estado</th>
                            <th className="px-4 py-3 text-left font-medium">Responsable</th>
                            <th className="px-4 py-3 text-center font-medium">Doc</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedItems.map((item) => {
                            const statusConfig = COMPLIANCE_STATUS_CONFIG[item.status];
                            return (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="font-medium text-slate-800">{item.requirement}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600">
                                        {item.plant_name}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {item.expiry_date ? (
                                            <span className={
                                                item.days_until_expiry !== undefined && item.days_until_expiry <= 0
                                                    ? 'text-red-600 font-medium'
                                                    : item.days_until_expiry !== undefined && item.days_until_expiry <= 60
                                                        ? 'text-amber-600 font-medium'
                                                        : 'text-slate-600'
                                            }>
                                                {formatDate(item.expiry_date)}
                                                {item.days_until_expiry !== undefined && (
                                                    <span className="ml-1 text-xs">
                                                        ({item.days_until_expiry <= 0 ? 'Vencido' : `${item.days_until_expiry}d`})
                                                    </span>
                                                )}
                                            </span>
                                        ) : (
                                            <span className="text-slate-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: `${statusConfig.color}20`,
                                                color: statusConfig.color
                                            }}
                                        >
                                            {statusConfig.icon} {statusConfig.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600">
                                        {item.responsible_person || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {item.document_url ? (
                                            <a
                                                href={item.document_url}
                                                className="text-blue-600 hover:text-blue-700 text-sm"
                                                title="Ver documento"
                                            >
                                                📄
                                            </a>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {items.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                    No hay requisitos de compliance registrados
                </div>
            )}

            {/* Actions */}
            <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <span>+</span> Agregar requisito
                </button>
                <button className="text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1">
                    📊 Exportar reporte
                </button>
            </div>
        </div>
    );
};
