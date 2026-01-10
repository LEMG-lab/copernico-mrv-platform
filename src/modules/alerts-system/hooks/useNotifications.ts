// src/modules/alerts-system/hooks/useNotifications.ts

import { useState, useCallback } from 'react';
import { NotificationPreferences, AlertType, AlertSeverity } from '../types/alerts.types';
import { DEFAULT_NOTIFICATION_PREFERENCES } from '../data/alertRules';

export const useNotifications = () => {
    const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFERENCES);
    const [isSaving, setIsSaving] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const updatePreferences = useCallback((updates: Partial<NotificationPreferences>) => {
        setPreferences(prev => ({ ...prev, ...updates }));
    }, []);

    const toggleEmailEnabled = useCallback(() => {
        setPreferences(prev => ({ ...prev, email_enabled: !prev.email_enabled }));
    }, []);

    const toggleSmsEnabled = useCallback(() => {
        setPreferences(prev => ({ ...prev, sms_enabled: !prev.sms_enabled }));
    }, []);

    const togglePushEnabled = useCallback(() => {
        setPreferences(prev => ({ ...prev, push_enabled: !prev.push_enabled }));
    }, []);

    const toggleQuietHours = useCallback(() => {
        setPreferences(prev => ({
            ...prev,
            quiet_hours: { ...prev.quiet_hours, enabled: !prev.quiet_hours.enabled }
        }));
    }, []);

    const toggleAlertType = useCallback((type: AlertType) => {
        setPreferences(prev => {
            const types = prev.subscribed_types.includes(type)
                ? prev.subscribed_types.filter(t => t !== type)
                : [...prev.subscribed_types, type];
            return { ...prev, subscribed_types: types };
        });
    }, []);

    const toggleSeverity = useCallback((severity: AlertSeverity) => {
        setPreferences(prev => {
            const severities = prev.subscribed_severities.includes(severity)
                ? prev.subscribed_severities.filter(s => s !== severity)
                : [...prev.subscribed_severities, severity];
            return { ...prev, subscribed_severities: severities };
        });
    }, []);

    const savePreferences = useCallback(async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSaving(false);
        setShowSettings(false);
        // In real app, would save to backend
        console.log('Preferences saved:', preferences);
    }, [preferences]);

    const resetToDefaults = useCallback(() => {
        setPreferences(DEFAULT_NOTIFICATION_PREFERENCES);
    }, []);

    return {
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
    };
};
