// src/modules/alerts-system/data/alertRules.ts

import { AlertRule, Alert, ComplianceItem, NotificationPreferences } from '../types/alerts.types';

export const DEFAULT_ALERT_RULES: AlertRule[] = [
    {
        id: "rule-001",
        name: "Producción baja",
        description: "Producción por debajo del 80% de capacidad",
        type: "operational",
        severity: "warning",
        enabled: true,
        conditions: [
            { metric: "utilization_pct", operator: "lt", value: 80 }
        ],
        actions: [
            { type: "email", recipients: ["plant_manager"] },
            { type: "push" }
        ],
        cooldown_minutes: 1440,
        applies_to: "all_plants"
    },
    {
        id: "rule-002",
        name: "Temperatura fuera de rango",
        description: "Temperatura fuera del rango óptimo para BSF",
        type: "operational",
        severity: "critical",
        enabled: true,
        conditions: [
            { metric: "temperature_avg", operator: "lt", value: 18 },
            { metric: "temperature_avg", operator: "gt", value: 38 }
        ],
        actions: [
            { type: "email", recipients: ["plant_manager", "operations"] },
            { type: "sms", recipients: ["plant_manager"] },
            { type: "push" }
        ],
        cooldown_minutes: 60,
        applies_to: "all_plants"
    },
    {
        id: "rule-003",
        name: "NDVI bajo en parcela cliente",
        description: "Caída de NDVI mayor a 10% en parcela fertilizada",
        type: "environmental",
        severity: "warning",
        enabled: true,
        conditions: [
            { metric: "ndvi_change_pct", operator: "lt", value: -10, time_window_minutes: 10080 }
        ],
        actions: [
            { type: "email", recipients: ["agronomist", "sales"] }
        ],
        cooldown_minutes: 10080,
        applies_to: "all_plants"
    },
    {
        id: "rule-004",
        name: "Precio de proteína favorable",
        description: "Precio de harina de pescado subió más de 10%",
        type: "opportunity",
        severity: "positive",
        enabled: true,
        conditions: [
            { metric: "fishmeal_price_change_pct", operator: "gt", value: 10, time_window_minutes: 43200 }
        ],
        actions: [
            { type: "email", recipients: ["sales", "management"] }
        ],
        cooldown_minutes: 43200,
        applies_to: "all_plants"
    },
    {
        id: "rule-005",
        name: "Permiso próximo a vencer",
        description: "Permiso vence en menos de 30 días",
        type: "regulatory",
        severity: "warning",
        enabled: true,
        conditions: [
            { metric: "permit_days_to_expiry", operator: "lt", value: 30 }
        ],
        actions: [
            { type: "email", recipients: ["compliance", "plant_manager"] }
        ],
        cooldown_minutes: 10080,
        applies_to: "all_plants"
    },
    {
        id: "rule-006",
        name: "Nueva planta competidora",
        description: "Se anunció nueva planta BSF en la región",
        type: "competitive",
        severity: "info",
        enabled: true,
        conditions: [],
        actions: [
            { type: "email", recipients: ["management", "strategy"] }
        ],
        cooldown_minutes: 0,
        applies_to: "all_plants"
    },
    {
        id: "rule-007",
        name: "Meta de CO2 en riesgo",
        description: "Proyección indica que no se alcanzará meta anual",
        type: "environmental",
        severity: "warning",
        enabled: true,
        conditions: [
            { metric: "co2_projection_vs_target_pct", operator: "lt", value: 90 }
        ],
        actions: [
            { type: "email", recipients: ["management", "investors"] }
        ],
        cooldown_minutes: 43200,
        applies_to: "all_plants"
    }
];

export const MOCK_ALERTS: Alert[] = [
    {
        id: "alert-001",
        type: "operational",
        severity: "critical",
        status: "new",
        title: "Sensor de temperatura offline",
        message: "El sensor GF-T-001 en zona de cría no reporta datos desde hace 2 horas. Verificar conexión o reemplazar sensor.",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        source: "iot",
        created_at: "2026-01-10T08:30:00Z",
        action_url: "/plants/plant-001/sensors",
        action_label: "Ver sensores"
    },
    {
        id: "alert-002",
        type: "environmental",
        severity: "warning",
        status: "acknowledged",
        title: "NDVI bajo en parcela cliente",
        message: "La parcela 'Rancho El Mezquite' muestra caída de NDVI del 15% en las últimas 2 semanas",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        source: "satellite",
        data: {
            ndvi_before: 0.72,
            ndvi_after: 0.61,
            change_pct: -15.3
        },
        created_at: "2026-01-09T10:00:00Z",
        acknowledged_at: "2026-01-09T11:30:00Z",
        acknowledged_by: "Juan Pérez",
        action_url: "/terralink/parcels/rancho-mezquite",
        action_label: "Ver análisis"
    },
    {
        id: "alert-003",
        type: "opportunity",
        severity: "positive",
        status: "new",
        title: "Precio de proteína en alza",
        message: "El precio de harina de pescado subió 12% este mes. Oportunidad para incrementar ventas de ProLINK.",
        source: "external",
        data: {
            price_before: 1.60,
            price_after: 1.79,
            change_pct: 11.9
        },
        created_at: "2026-01-08T14:00:00Z",
        action_url: "/market/protein-prices",
        action_label: "Ver mercado"
    },
    {
        id: "alert-004",
        type: "regulatory",
        severity: "warning",
        status: "in_progress",
        title: "Permiso SEMARNAT por vencer",
        message: "La licencia ambiental vence en 45 días. Iniciar proceso de renovación.",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        source: "system",
        data: {
            permit_name: "Licencia Ambiental Única",
            expiry_date: "2026-02-25",
            days_remaining: 45
        },
        created_at: "2026-01-05T09:00:00Z",
        acknowledged_at: "2026-01-05T10:00:00Z",
        acknowledged_by: "María García",
        action_url: "/compliance/permits/semarnat-001",
        action_label: "Ver permiso"
    },
    {
        id: "alert-005",
        type: "financial",
        severity: "info",
        status: "new",
        title: "Pago pendiente de cliente",
        message: "La factura #2024-0892 de 'Alimentos del Norte' tiene 15 días de vencida ($45,000 MXN).",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        source: "system",
        data: {
            invoice_id: "2024-0892",
            client: "Alimentos del Norte",
            amount: 45000,
            days_overdue: 15
        },
        created_at: "2026-01-09T08:00:00Z",
        action_url: "/finance/invoices/2024-0892",
        action_label: "Ver factura"
    },
    {
        id: "alert-006",
        type: "competitive",
        severity: "info",
        status: "acknowledged",
        title: "Nueva planta BSF anunciada en Jalisco",
        message: "Protix anuncia inversión de $40M USD para nueva planta en Guadalajara con capacidad de 100 ton/día.",
        source: "external",
        data: {
            competitor: "Protix",
            location: "Guadalajara, Jalisco",
            capacity: 100,
            investment_usd: 40000000
        },
        created_at: "2026-01-07T16:00:00Z",
        acknowledged_at: "2026-01-07T18:00:00Z",
        acknowledged_by: "Roberto Sánchez",
        action_url: "/market/competitors",
        action_label: "Ver competencia"
    },
    {
        id: "alert-007",
        type: "operational",
        severity: "warning",
        status: "new",
        title: "Producción por debajo del objetivo",
        message: "La planta Xochimilco está operando al 72% de capacidad esta semana (objetivo: 85%).",
        plant_id: "plant-002",
        plant_name: "Xochimilco",
        source: "system",
        data: {
            current_utilization: 72,
            target_utilization: 85,
            gap_pct: -13
        },
        created_at: "2026-01-10T06:00:00Z",
        action_url: "/plants/plant-002/production",
        action_label: "Ver producción"
    }
];

export const MOCK_COMPLIANCE: ComplianceItem[] = [
    {
        id: "comp-001",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        requirement: "Licencia Ambiental Única (LAU)",
        category: "environmental",
        status: "expiring_soon",
        issue_date: "2024-02-25",
        expiry_date: "2026-02-25",
        days_until_expiry: 45,
        document_url: "/docs/lau-tepetlaoxtoc.pdf",
        responsible_person: "María García",
        last_checked: "2026-01-10"
    },
    {
        id: "comp-002",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        requirement: "Registro SENASICA",
        category: "sanitary",
        status: "compliant",
        issue_date: "2025-06-15",
        expiry_date: "2026-06-15",
        days_until_expiry: 156,
        document_url: "/docs/senasica-tepetlaoxtoc.pdf",
        responsible_person: "Carlos López",
        last_checked: "2026-01-10"
    },
    {
        id: "comp-003",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        requirement: "Licencia de Funcionamiento Municipal",
        category: "operational",
        status: "compliant",
        issue_date: "2025-10-01",
        expiry_date: "2026-10-01",
        days_until_expiry: 264,
        document_url: "/docs/licencia-municipal.pdf",
        responsible_person: "María García",
        last_checked: "2026-01-10"
    },
    {
        id: "comp-004",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        requirement: "Certificación ISO 14001",
        category: "certification",
        status: "pending",
        responsible_person: "Roberto Sánchez",
        notes: "En proceso de implementación. Meta: Q2 2026",
        last_checked: "2026-01-10"
    },
    {
        id: "comp-005",
        plant_id: "plant-001",
        plant_name: "Tepetlaoxtoc",
        requirement: "EUDR Compliance",
        category: "environmental",
        status: "compliant",
        document_url: "/docs/eudr-compliance.pdf",
        responsible_person: "María García",
        notes: "Verificado vía Global Forest Watch",
        last_checked: "2026-01-10"
    },
    {
        id: "comp-006",
        plant_id: "plant-002",
        plant_name: "Xochimilco",
        requirement: "Licencia Ambiental Única (LAU)",
        category: "environmental",
        status: "compliant",
        issue_date: "2025-03-15",
        expiry_date: "2027-03-15",
        days_until_expiry: 429,
        document_url: "/docs/lau-xochimilco.pdf",
        responsible_person: "Ana Rodríguez",
        last_checked: "2026-01-10"
    },
    {
        id: "comp-007",
        plant_id: "plant-002",
        plant_name: "Xochimilco",
        requirement: "Registro SENASICA",
        category: "sanitary",
        status: "expired",
        issue_date: "2024-01-10",
        expiry_date: "2026-01-10",
        days_until_expiry: 0,
        document_url: "/docs/senasica-xochimilco.pdf",
        responsible_person: "Ana Rodríguez",
        notes: "¡URGENTE! Renovar inmediatamente",
        last_checked: "2026-01-10"
    }
];

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
    email_enabled: true,
    email_address: "usuario@larvalink.com",
    email_frequency: 'immediate',
    sms_enabled: false,
    sms_number: "",
    sms_critical_only: true,
    push_enabled: true,
    quiet_hours: {
        enabled: false,
        start: "22:00",
        end: "07:00"
    },
    subscribed_types: ['operational', 'environmental', 'financial', 'regulatory', 'competitive', 'opportunity'],
    subscribed_severities: ['critical', 'warning', 'info', 'positive']
};
