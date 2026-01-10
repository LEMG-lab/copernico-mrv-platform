// src/modules/alerts-system/components/NotificationSettings.tsx

import React from 'react';
import { NotificationPreferences, AlertType, AlertSeverity, ALERT_TYPE_LABELS, SEVERITY_CONFIG } from '../types/alerts.types';

interface NotificationSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    preferences: NotificationPreferences;
    onUpdatePreferences: (updates: Partial<NotificationPreferences>) => void;
    onToggleEmailEnabled: () => void;
    onToggleSmsEnabled: () => void;
    onTogglePushEnabled: () => void;
    onToggleQuietHours: () => void;
    onToggleAlertType: (type: AlertType) => void;
    onToggleSeverity: (severity: AlertSeverity) => void;
    onSave: () => void;
    onReset: () => void;
    isSaving: boolean;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
    isOpen,
    onClose,
    preferences,
    onUpdatePreferences,
    onToggleEmailEnabled,
    onToggleSmsEnabled,
    onTogglePushEnabled,
    onToggleQuietHours,
    onToggleAlertType,
    onToggleSeverity,
    onSave,
    onReset,
    isSaving
}) => {
    if (!isOpen) return null;

    const alertTypes: AlertType[] = ['operational', 'environmental', 'financial', 'regulatory', 'reputational', 'competitive', 'opportunity'];
    const severities: AlertSeverity[] = ['critical', 'warning', 'info', 'positive'];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Configuración de Notificaciones</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">

                    {/* CANALES */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Canales</h3>
                        <div className="space-y-4">

                            {/* Email */}
                            <div className="bg-slate-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📧</span>
                                        <span className="font-semibold text-slate-800">Email</span>
                                    </div>
                                    <button
                                        onClick={onToggleEmailEnabled}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${preferences.email_enabled ? 'bg-green-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${preferences.email_enabled ? 'translate-x-6' : 'translate-x-0.5'
                                            }`} />
                                    </button>
                                </div>
                                {preferences.email_enabled && (
                                    <div className="space-y-3 pt-3 border-t border-slate-200">
                                        <input
                                            type="email"
                                            value={preferences.email_address}
                                            onChange={(e) => onUpdatePreferences({ email_address: e.target.value })}
                                            placeholder="correo@ejemplo.com"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {(['immediate', 'daily_digest', 'weekly_digest'] as const).map(freq => (
                                                <label key={freq} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="email_frequency"
                                                        checked={preferences.email_frequency === freq}
                                                        onChange={() => onUpdatePreferences({ email_frequency: freq })}
                                                        className="text-blue-600"
                                                    />
                                                    <span className="text-sm text-slate-600">
                                                        {freq === 'immediate' ? 'Inmediato' : freq === 'daily_digest' ? 'Resumen diario' : 'Resumen semanal'}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* SMS */}
                            <div className="bg-slate-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📱</span>
                                        <span className="font-semibold text-slate-800">SMS</span>
                                    </div>
                                    <button
                                        onClick={onToggleSmsEnabled}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${preferences.sms_enabled ? 'bg-green-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${preferences.sms_enabled ? 'translate-x-6' : 'translate-x-0.5'
                                            }`} />
                                    </button>
                                </div>
                                {preferences.sms_enabled && (
                                    <div className="space-y-3 pt-3 border-t border-slate-200">
                                        <input
                                            type="tel"
                                            value={preferences.sms_number}
                                            onChange={(e) => onUpdatePreferences({ sms_number: e.target.value })}
                                            placeholder="+52 555 123 4567"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.sms_critical_only}
                                                onChange={() => onUpdatePreferences({ sms_critical_only: !preferences.sms_critical_only })}
                                                className="rounded text-blue-600"
                                            />
                                            <span className="text-sm text-slate-600">Solo alertas críticas</span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Push */}
                            <div className="bg-slate-50 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🔔</span>
                                        <span className="font-semibold text-slate-800">Push (App móvil)</span>
                                    </div>
                                    <button
                                        onClick={onTogglePushEnabled}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${preferences.push_enabled ? 'bg-green-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${preferences.push_enabled ? 'translate-x-6' : 'translate-x-0.5'
                                            }`} />
                                    </button>
                                </div>
                            </div>

                            {/* Quiet Hours */}
                            <div className="bg-slate-50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🌙</span>
                                        <span className="font-semibold text-slate-800">Horario silencioso</span>
                                    </div>
                                    <button
                                        onClick={onToggleQuietHours}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${preferences.quiet_hours.enabled ? 'bg-green-500' : 'bg-slate-300'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${preferences.quiet_hours.enabled ? 'translate-x-6' : 'translate-x-0.5'
                                            }`} />
                                    </button>
                                </div>
                                {preferences.quiet_hours.enabled && (
                                    <div className="flex items-center gap-4 pt-3 border-t border-slate-200">
                                        <span className="text-sm text-slate-600">De:</span>
                                        <input
                                            type="time"
                                            value={preferences.quiet_hours.start}
                                            onChange={(e) => onUpdatePreferences({
                                                quiet_hours: { ...preferences.quiet_hours, start: e.target.value }
                                            })}
                                            className="px-2 py-1 border border-slate-200 rounded text-sm"
                                        />
                                        <span className="text-sm text-slate-600">a:</span>
                                        <input
                                            type="time"
                                            value={preferences.quiet_hours.end}
                                            onChange={(e) => onUpdatePreferences({
                                                quiet_hours: { ...preferences.quiet_hours, end: e.target.value }
                                            })}
                                            className="px-2 py-1 border border-slate-200 rounded text-sm"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* TIPOS DE ALERTA */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Tipos de Alerta</h3>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                            {alertTypes.map(type => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer py-1">
                                    <input
                                        type="checkbox"
                                        checked={preferences.subscribed_types.includes(type)}
                                        onChange={() => onToggleAlertType(type)}
                                        className="rounded text-blue-600"
                                    />
                                    <span className="text-sm text-slate-700">{ALERT_TYPE_LABELS[type]}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* SEVERIDAD */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Severidad</h3>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                            {severities.map(severity => {
                                const config = SEVERITY_CONFIG[severity];
                                return (
                                    <label key={severity} className="flex items-center gap-3 cursor-pointer py-1">
                                        <input
                                            type="checkbox"
                                            checked={preferences.subscribed_severities.includes(severity)}
                                            onChange={() => onToggleSeverity(severity)}
                                            className="rounded text-blue-600"
                                        />
                                        <span className="text-sm text-slate-700 flex items-center gap-2">
                                            {config.icon} {config.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
                    <button
                        onClick={onReset}
                        className="text-sm text-slate-500 hover:text-slate-700 font-medium"
                    >
                        Restaurar por defecto
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onSave}
                            disabled={isSaving}
                            className="px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isSaving ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
