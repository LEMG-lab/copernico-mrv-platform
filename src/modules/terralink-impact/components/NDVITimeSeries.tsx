import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area
} from 'recharts';
import { NDVIReading } from '../types/parcel.types';

interface NDVITimeSeriesProps {
    terralinkHistory: NDVIReading[];
    controlHistory: NDVIReading[];
}

export const NDVITimeSeries: React.FC<NDVITimeSeriesProps> = ({ terralinkHistory, controlHistory }) => {
    // Fusionar datos para la gráfica
    const data = terralinkHistory.map((item, index) => ({
        date: item.date,
        terralink: item.value,
        control: controlHistory[index]?.value || 0
    }));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                        <linearGradient id="colorImprovement" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#2ECC71" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="date"
                        stroke="#94A3B8"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis
                        stroke="#94A3B8"
                        domain={[0, 1]}
                        label={{ value: 'NDVI', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
                        itemStyle={{ color: '#F8FAFC' }}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    />
                    <Legend />

                    {/* Parcela Control - Gris Punteado */}
                    <Line
                        type="monotone"
                        dataKey="control"
                        name="Control (Tradicional)"
                        stroke="#95A5A6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3, fill: '#95A5A6' }}
                    />

                    {/* Parcela TerraLINK - Verde Solido */}
                    <Line
                        type="monotone"
                        dataKey="terralink"
                        name="TerraLINK (Biofertilizado)"
                        stroke="#2ECC71"
                        strokeWidth={3}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
