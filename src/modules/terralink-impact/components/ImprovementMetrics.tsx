import React from 'react';

interface MetricCardProps {
    title: string;
    value: string;
    trend: number; // porcentaje positivo
    color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, color }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="text-slate-400 text-sm mb-1">{title}</div>
        <div className="text-2xl font-bold text-white mb-2">{value}</div>
        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.abs(trend))}%`, backgroundColor: color }}
            />
        </div>
        <div className="text-right text-xs mt-1" style={{ color: color }}>
            +{trend.toFixed(1)}% vs Control
        </div>
    </div>
);

interface ImprovementMetricsProps {
    data: {
        ndviDelta: number;
        ndviPercentage: number;
        moistureDelta: number;
        moisturePercentage: number;
    };
}

export const ImprovementMetrics: React.FC<ImprovementMetricsProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
                title="NDVI (Vigor Vegetal)"
                value={`+${data.ndviDelta.toFixed(2)}`}
                trend={data.ndviPercentage}
                color="#2ECC71"
            />

            <MetricCard
                title="Humedad Retenida"
                value={`+${data.moistureDelta.toFixed(2)}`}
                trend={data.moisturePercentage}
                color="#3498DB"
            />

            <MetricCard
                title="Biomasa (LAI Est.)"
                value="+1.2"
                trend={62.3} // Dato demo hardcodeado para completar el layout pedido
                color="#F1C40F"
            />
        </div>
    );
};
