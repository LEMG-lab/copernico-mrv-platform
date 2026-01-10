// src/modules/alerts-system/components/AlertsDashboard.tsx

import React, { useState } from 'react';
import { useAlerts } from '../hooks/useAlerts';
import { useCompliance } from '../hooks/useCompliance';
import { useNotifications } from '../hooks/useNotifications';
import { QuickActions } from './QuickActions';
import { AlertsList } from './AlertsList';
import { AlertFilters } from './AlertFilters';
import { ComplianceTracker } from './ComplianceTracker';
import { NotificationSettings } from './NotificationSettings';
import { AlertSeverity } from '../types/alerts.types';

export const AlertsDashboard: React.FC = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'active' | 'all'>('active');

    const {
        alerts,
        allAlerts,
        stats,
        filters,
        loading: alertsLoading,
        acknowledgeAlert,
        setAlertInProgress,
        resolveAlert,
        dismissAlert,
        updateFilters,
        clearFilters,
        refreshAlerts
    } = useAlerts();

    const {
        items: complianceItems,
        plants,
        filters: complianceFilters,
        updateFilters: updateComplianceFilters
    } = useCompliance();

    const {
        preferences,
        isSaving,
        showSettings,
        setShowSettings,
        updatePreferences,
        toggleEmailEnabled,
        toggleSmsEnabled,
        togglePushEnabled,
        toggleQuietHours,
        toggleAlertType,
        toggleSeverity,
        savePreferences,
        resetToDefaults
    } = useNotifications();

    const handleFilterBySeverity = (severity: string) => {
        updateFilters({ severity: [severity as AlertSeverity] });
        setShowFilters(true);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800">Centro de Alertas y Compliance</h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Monitoreo en tiempo real de alertas operativas, ambientales y regulatorias
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={refreshAlerts}
                            disabled={alertsLoading}
                            className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <span className={alertsLoading ? 'animate-spin' : ''}>🔄</span>
                            Actualizar
                        </button>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-4 py-2 text-sm font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
                        >
                            ⚙️ Configurar
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <section>
                    <QuickActions stats={stats} onFilterBySeverity={handleFilterBySeverity} />
                </section>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Alerts Section */}
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <h2 className="text-lg font-bold text-slate-800">
                            Alertas Activas
                            <span className="ml-2 text-sm font-normal text-slate-500">
                                ({alerts.length} de {allAlerts.filter(a => a.status !== 'resolved' && a.status !== 'dismissed').length})
                            </span>
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => setViewMode('active')}
                                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === 'active' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    Activas
                                </button>
                                <button
                                    onClick={() => setViewMode('all')}
                                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    Todas
                                </button>
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 ${showFilters || Object.keys(filters).length > 0
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                🔍 Filtros
                                {Object.keys(filters).length > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                                        {Object.keys(filters).length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Filters Sidebar */}
                        {showFilters && (
                            <div className="lg:col-span-1">
                                <AlertFilters
                                    filters={filters}
                                    onFilterChange={updateFilters}
                                    onClear={clearFilters}
                                />
                            </div>
                        )}

                        {/* Alerts List */}
                        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
                            <AlertsList
                                alerts={viewMode === 'all' ? allAlerts : alerts}
                                onAcknowledge={acknowledgeAlert}
                                onInProgress={setAlertInProgress}
                                onResolve={resolveAlert}
                                onDismiss={dismissAlert}
                                emptyMessage={
                                    Object.keys(filters).length > 0
                                        ? "No hay alertas que coincidan con los filtros"
                                        : "No hay alertas activas"
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Compliance Section */}
                <section>
                    <ComplianceTracker
                        items={complianceItems}
                        plants={plants}
                        selectedPlant={complianceFilters.plant_id}
                        onPlantChange={(plantId) => updateComplianceFilters({ plant_id: plantId })}
                    />
                </section>

            </div>

            {/* Notification Settings Modal */}
            <NotificationSettings
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                preferences={preferences}
                onUpdatePreferences={updatePreferences}
                onToggleEmailEnabled={toggleEmailEnabled}
                onToggleSmsEnabled={toggleSmsEnabled}
                onTogglePushEnabled={togglePushEnabled}
                onToggleQuietHours={toggleQuietHours}
                onToggleAlertType={toggleAlertType}
                onToggleSeverity={toggleSeverity}
                onSave={savePreferences}
                onReset={resetToDefaults}
                isSaving={isSaving}
            />
        </div>
    );
};
