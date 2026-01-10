// src/modules/alerts-system/hooks/useAlerts.ts

import { useState, useMemo, useCallback } from 'react';
import { Alert, AlertSeverity, AlertStatus, AlertType, AlertStats } from '../types/alerts.types';
import { MOCK_ALERTS } from '../data/alertRules';

interface UseAlertsOptions {
    initialAlerts?: Alert[];
}

interface AlertFilters {
    severity?: AlertSeverity[];
    status?: AlertStatus[];
    type?: AlertType[];
    plant_id?: string;
    search?: string;
}

export const useAlerts = (options?: UseAlertsOptions) => {
    const [alerts, setAlerts] = useState<Alert[]>(options?.initialAlerts || MOCK_ALERTS);
    const [filters, setFilters] = useState<AlertFilters>({});
    const [loading, setLoading] = useState(false);

    // Calculate stats
    const stats: AlertStats = useMemo(() => {
        const activeAlerts = alerts.filter(a => a.status !== 'resolved' && a.status !== 'dismissed');
        return {
            critical: activeAlerts.filter(a => a.severity === 'critical').length,
            warning: activeAlerts.filter(a => a.severity === 'warning').length,
            info: activeAlerts.filter(a => a.severity === 'info').length,
            positive: activeAlerts.filter(a => a.severity === 'positive').length,
            total: activeAlerts.length
        };
    }, [alerts]);

    // Filter alerts
    const filteredAlerts = useMemo(() => {
        return alerts.filter(alert => {
            // Exclude resolved/dismissed by default unless specifically filtered
            if (!filters.status?.length && (alert.status === 'resolved' || alert.status === 'dismissed')) {
                return false;
            }

            if (filters.severity?.length && !filters.severity.includes(alert.severity)) {
                return false;
            }
            if (filters.status?.length && !filters.status.includes(alert.status)) {
                return false;
            }
            if (filters.type?.length && !filters.type.includes(alert.type)) {
                return false;
            }
            if (filters.plant_id && alert.plant_id !== filters.plant_id) {
                return false;
            }
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                return (
                    alert.title.toLowerCase().includes(searchLower) ||
                    alert.message.toLowerCase().includes(searchLower) ||
                    alert.plant_name?.toLowerCase().includes(searchLower)
                );
            }
            return true;
        }).sort((a, b) => {
            // Sort by severity first (critical > warning > info > positive)
            const severityOrder: Record<AlertSeverity, number> = { critical: 0, warning: 1, info: 2, positive: 3 };
            const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
            if (severityDiff !== 0) return severityDiff;

            // Then by date (newest first)
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
    }, [alerts, filters]);

    // Actions
    const acknowledgeAlert = useCallback((alertId: string, acknowledgedBy: string = 'Usuario') => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? {
                    ...alert,
                    status: 'acknowledged' as AlertStatus,
                    acknowledged_at: new Date().toISOString(),
                    acknowledged_by: acknowledgedBy
                }
                : alert
        ));
    }, []);

    const setAlertInProgress = useCallback((alertId: string) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? { ...alert, status: 'in_progress' as AlertStatus }
                : alert
        ));
    }, []);

    const resolveAlert = useCallback((alertId: string, resolvedBy: string = 'Usuario') => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? {
                    ...alert,
                    status: 'resolved' as AlertStatus,
                    resolved_at: new Date().toISOString(),
                    resolved_by: resolvedBy
                }
                : alert
        ));
    }, []);

    const dismissAlert = useCallback((alertId: string) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId
                ? { ...alert, status: 'dismissed' as AlertStatus }
                : alert
        ));
    }, []);

    const updateFilters = useCallback((newFilters: Partial<AlertFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);

    const refreshAlerts = useCallback(async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setAlerts(MOCK_ALERTS);
        setLoading(false);
    }, []);

    return {
        alerts: filteredAlerts,
        allAlerts: alerts,
        stats,
        filters,
        loading,
        acknowledgeAlert,
        setAlertInProgress,
        resolveAlert,
        dismissAlert,
        updateFilters,
        clearFilters,
        refreshAlerts
    };
};
