import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface EmissionsGaugeProps {
    percentage: number; // Porcentaje de reducción (0-100)
}

export const EmissionsGauge: React.FC<EmissionsGaugeProps> = ({ percentage }) => {
    // Configuración de datos para el gauge (Valor, Resto)
    // Limitamos percentage a 100 visualmente para que no rompa el gráfico
    const visualPercentage = Math.min(100, Math.max(0, percentage));

    const data = [
        { name: 'Reducción', value: visualPercentage },
        { name: 'Restante', value: 100 - visualPercentage },
    ];

    // Colores: Verde (>80%), Amarillo (50-80%), Rojo (<50%)
    let color = '#E74C3C'; // Rojo
    if (percentage >= 80) color = '#2ECC71'; // Verde
    else if (percentage >= 50) color = '#F1C40F'; // Amarillo

    const cx = "50%";
    const cy = "70%"; // Bajar centro para medio círculo
    const iR = 60;
    const oR = 80;

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-xl border border-slate-700 h-full">
            <h3 className="text-slate-400 text-sm mb-2 uppercase tracking-wider">Eficiencia de Descarbonización</h3>

            <div className="w-full h-40 relative">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            stroke="none"
                        >
                            <Cell fill={color} />
                            <Cell fill="#334155" /> {/* Slate-700 para fondo track */}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Valor central */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 pointer-events-none">
                    <span className="text-4xl font-bold text-white mb-1">{percentage.toFixed(1)}%</span>
                    <span className="text-xs text-slate-400">Emisiones Evitadas</span>
                </div>
            </div>

            <div className="text-center mt-2 px-4 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                Vs. Disposición en Relleno Sanitario
            </div>
        </div>
    );
};
