// src/modules/alerts-system/hooks/useCompliance.ts

import { useState, useMemo, useCallback } from 'react';
import { ComplianceItem, ComplianceStatus } from '../types/alerts.types';
import { MOCK_COMPLIANCE } from '../data/alertRules';

interface UseComplianceOptions {
    initialItems?: ComplianceItem[];
}

interface ComplianceFilters {
    plant_id?: string;
    status?: ComplianceStatus[];
    category?: string[];
}

export const useCompliance = (options?: UseComplianceOptions) => {
    const [items, setItems] = useState<ComplianceItem[]>(options?.initialItems || MOCK_COMPLIANCE);
    const [filters, setFilters] = useState<ComplianceFilters>({});
    const [loading, setLoading] = useState(false);

    // Calculate summary stats
    const summary = useMemo(() => {
        return {
            total: items.length,
            compliant: items.filter(i => i.status === 'compliant').length,
            expiring_soon: items.filter(i => i.status === 'expiring_soon').length,
            expired: items.filter(i => i.status === 'expired').length,
            pending: items.filter(i => i.status === 'pending').length,
            not_applicable: items.filter(i => i.status === 'not_applicable').length
        };
    }, [items]);

    // Get unique plants
    const plants = useMemo(() => {
        const plantMap = new Map<string, string>();
        items.forEach(item => {
            if (!plantMap.has(item.plant_id)) {
                plantMap.set(item.plant_id, item.plant_name);
            }
        });
        return Array.from(plantMap, ([id, name]) => ({ id, name }));
    }, [items]);

    // Filter items
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            if (filters.plant_id && item.plant_id !== filters.plant_id) {
                return false;
            }
            if (filters.status?.length && !filters.status.includes(item.status)) {
                return false;
            }
            if (filters.category?.length && !filters.category.includes(item.category)) {
                return false;
            }
            return true;
        }).sort((a, b) => {
            // Sort by status priority (expired > expiring > pending > compliant > n/a)
            const statusOrder: Record<ComplianceStatus, number> = {
                expired: 0,
                expiring_soon: 1,
                pending: 2,
                compliant: 3,
                not_applicable: 4
            };
            return statusOrder[a.status] - statusOrder[b.status];
        });
    }, [items, filters]);

    // Actions
    const updateFilters = useCallback((newFilters: Partial<ComplianceFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);

    const refreshCompliance = useCallback(async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setItems(MOCK_COMPLIANCE);
        setLoading(false);
    }, []);

    return {
        items: filteredItems,
        allItems: items,
        summary,
        plants,
        filters,
        loading,
        updateFilters,
        clearFilters,
        refreshCompliance
    };
};
