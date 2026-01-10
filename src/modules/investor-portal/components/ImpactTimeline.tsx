import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TimelineData {
    period: string;
    co2eq: number;
    waste: number;
    jobs: number;
}

interface ImpactTimelineProps {
    data: TimelineData[];
}

export const ImpactTimeline: React.FC<ImpactTimelineProps> = ({ data }) => {
    // Generar meta lineal simple para visualización
    const plotData = data.map((d, i) => ({
        ...d,
        target: 2000 + (i * 2500) // Meta ficticia lineal
    }));

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-fade-in-up h-[400px]">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Evolución de Impacto Acumulado</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={plotData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line
                        type="monotone"
                        dataKey="co2eq"
                        name="CO2eq Evitado (Real)"
                        stroke="#10b981"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="target"
                        name="Meta Anual (Lineal)"
                        stroke="#94a3b8"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
