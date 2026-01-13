import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Thermometer, Droplets, Wind, Activity } from 'lucide-react';

export const PlantEnvironment: React.FC<{ plant: PlantDetail }> = ({ plant }) => {
    // Generate simple graph data based on history
    const TempData = plant.environment?.temperature.history.map((val, i) => ({ time: `${i * 15}m`, value: val })) || [];
    const HumidityData = plant.environment?.humidity.history.map((val, i) => ({ time: `${i * 15}m`, value: val })) || [];

    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Monitoreo Ambiental en Tiempo Real
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Temperature */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Thermometer className="w-5 h-5 text-orange-400" />
                            <h3 className="text-slate-300 font-medium">Temperatura (Nave A)</h3>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {plant.environment?.temperature.current}°C
                        </div>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TempData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94a3b8" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#fb923c' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#fb923c" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Humidity */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-blue-400" />
                            <h3 className="text-slate-300 font-medium">Humedad Relativa</h3>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {plant.environment?.humidity.current}%
                        </div>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={HumidityData}>
                                <defs>
                                    <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#60a5fa' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHumidity)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Other Sensors Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700">
                <div className="bg-slate-900/50 p-4 rounded-xl text-center">
                    <div className="text-slate-400 text-xs mb-1">CO2 (PPM)</div>
                    <div className={`text-xl font-bold ${plant.environment?.co2.status === 'nominal' ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {plant.environment?.co2.current}
                    </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl text-center">
                    <div className="text-slate-400 text-xs mb-1">Flujo Aire (CFM)</div>
                    <div className={`text-xl font-bold ${plant.environment?.airflow.status === 'nominal' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                        {plant.environment?.airflow.current}
                    </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl text-center">
                    <div className="text-slate-400 text-xs mb-1">Cámaras Activas</div>
                    <div className="text-xl font-bold text-blue-400">8/8</div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl text-center">
                    <div className="text-slate-400 text-xs mb-1">Sensores Online</div>
                    <div className="text-xl font-bold text-emerald-400">{plant.sensors?.online}/{plant.sensors?.total}</div>
                </div>
            </div>
        </section>
    );
};
