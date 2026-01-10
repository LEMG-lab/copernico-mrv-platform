// src/modules/alerts-system/types/alerts.types.ts

export type AlertType =
    | 'operational'
    | 'environmental'
    | 'financial'
    | 'regulatory'
    | 'reputational'
    | 'competitive'
    | 'opportunity';

export type AlertSeverity =
    | 'critical'
    | 'warning'
    | 'info'
    | 'positive';

export type AlertStatus =
    | 'new'
    | 'acknowledged'
    | 'in_progress'
    | 'resolved'
    | 'dismissed';

export interface Alert {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    status: AlertStatus;
    title: string;
    message: string;
    plant_id?: string;
    plant_name?: string;
    source: 'satellite' | 'iot' | 'manual' | 'system' | 'external';
    data?: Record<string, any>;
    threshold_value?: number;
    actual_value?: number;
    created_at: string;
    acknowledged_at?: string;
    acknowledged_by?: string;
    resolved_at?: string;
    resolved_by?: string;
    action_url?: string;
    action_label?: string;
}

export interface AlertRule {
    id: string;
    name: string;
    description: string;
    type: AlertType;
    severity: AlertSeverity;
    enabled: boolean;
    conditions: AlertCondition[];
    actions: AlertAction[];
    cooldown_minutes: number;
    applies_to: 'all_plants' | 'specific_plants';
    plant_ids?: string[];
}

export interface AlertCondition {
    metric: string;
    operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte' | 'change_pct';
    value: number;
    time_window_minutes?: number;
}

export interface AlertAction {
    type: 'email' | 'sms' | 'push' | 'webhook' | 'slack';
    recipients?: string[];
    webhook_url?: string;
    template?: string;
}

export type ComplianceStatus =
    | 'compliant'
    | 'expiring_soon'
    | 'expired'
    | 'pending'
    | 'not_applicable';

export interface ComplianceItem {
    id: string;
    plant_id: string;
    plant_name: string;
    requirement: string;
    category: 'environmental' | 'sanitary' | 'operational' | 'financial' | 'certification';
    status: ComplianceStatus;
    issue_date?: string;
    expiry_date?: string;
    days_until_expiry?: number;
    document_url?: string;
    responsible_person?: string;
    notes?: string;
    last_checked: string;
}

export interface NotificationPreferences {
    email_enabled: boolean;
    email_address: string;
    email_frequency: 'immediate' | 'daily_digest' | 'weekly_digest';
    sms_enabled: boolean;
    sms_number: string;
    sms_critical_only: boolean;
    push_enabled: boolean;
    quiet_hours: {
        enabled: boolean;
        start: string;
        end: string;
    };
    subscribed_types: AlertType[];
    subscribed_severities: AlertSeverity[];
}

// Helper type for alert statistics
export interface AlertStats {
    critical: number;
    warning: number;
    info: number;
    positive: number;
    total: number;
}

// Severity config for UI
export const SEVERITY_CONFIG: Record<AlertSeverity, { color: string; bg: string; label: string; icon: string }> = {
    critical: { color: '#E74C3C', bg: '#FEE2E2', label: 'Crítica', icon: '🔴' },
    warning: { color: '#F39C12', bg: '#FEF3C7', label: 'Advertencia', icon: '🟡' },
    info: { color: '#3498DB', bg: '#DBEAFE', label: 'Informativa', icon: '🔵' },
    positive: { color: '#2ECC71', bg: '#D1FAE5', label: 'Positiva', icon: '🟢' }
};

// Compliance status config
export const COMPLIANCE_STATUS_CONFIG: Record<ComplianceStatus, { color: string; label: string; icon: string }> = {
    compliant: { color: '#2ECC71', label: 'Vigente', icon: '✅' },
    expiring_soon: { color: '#F39C12', label: 'Por vencer', icon: '⚠️' },
    expired: { color: '#E74C3C', label: 'Vencido', icon: '❌' },
    pending: { color: '#3498DB', label: 'En proceso', icon: '🔄' },
    not_applicable: { color: '#94A3B8', label: 'N/A', icon: '➖' }
};

// Alert type labels
export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
    operational: 'Operacional',
    environmental: 'Ambiental',
    financial: 'Financiera',
    regulatory: 'Regulatoria',
    reputational: 'Reputacional',
    competitive: 'Competencia',
    opportunity: 'Oportunidad'
};
