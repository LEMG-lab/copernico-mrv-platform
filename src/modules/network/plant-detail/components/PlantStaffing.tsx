import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { Users, Clock, ShieldCheck, UserCheck } from 'lucide-react';

export const PlantStaffing: React.FC<{ plant: PlantDetail }> = ({ plant }) => {
    if (!plant.staffing) return null;

    const shiftColors = {
        morning: 'bg-yellow-500 text-yellow-900',
        afternoon: 'bg-orange-500 text-orange-900',
        night: 'bg-blue-500 text-blue-900'
    };

    const shiftLabels = {
        morning: 'Matutino (06:00 - 14:00)',
        afternoon: 'Vespertino (14:00 - 22:00)',
        night: 'Nocturno (22:00 - 06:00)'
    };

    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Personal y Operaciones
            </h2>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Active Shift Card */}
                <div className="flex-1 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-5 border border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-300" />
                            <span className="font-bold text-white">Turno Activo</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${shiftColors[plant.staffing.current_shift]}`}>
                            {shiftLabels[plant.staffing.current_shift].split(' ')[0]}
                        </span>
                    </div>

                    <div className="text-sm text-slate-400 mb-6">
                        {shiftLabels[plant.staffing.current_shift]}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-white mb-1">{plant.staffing.operators_active}</div>
                            <div className="text-xs text-slate-500">Operadores</div>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-white mb-1">{plant.staffing.supervisors_active}</div>
                            <div className="text-xs text-slate-500">Supervisores</div>
                        </div>
                    </div>
                </div>

                {/* Safety Status */}
                <div className="flex-1 bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl p-5 border border-emerald-500/20">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-white text-lg">Estatus de Seguridad</h3>
                            <p className="text-xs text-emerald-300/70">Sin incidentes reportados hoy</p>
                        </div>
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>

                    <div className="space-y-3 mt-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Días sin accidentes</span>
                            <span className="font-bold text-white">142 días</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">EPP Completos</span>
                            <span className="font-bold text-emerald-400">100%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Capacitación Vigente</span>
                            <span className="font-bold text-emerald-400">98%</span>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="flex-1 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-slate-300" />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500">Gerente de Turno</div>
                            <div className="font-bold text-white">Ing. Luis Méndez</div>
                        </div>
                    </div>
                    <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                        Contactar Supervisión
                    </button>
                </div>
            </div>
        </section>
    );
};
