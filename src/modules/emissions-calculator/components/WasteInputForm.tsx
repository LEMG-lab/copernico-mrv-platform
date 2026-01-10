import React from 'react';
import { WasteInput, WasteType, Period, LandfillType } from '../types/emissions.types';
import { IPCC_FACTORS } from '../constants/ipccFactors';

interface WasteInputFormProps {
    input: WasteInput;
    onChange: (field: keyof WasteInput, value: any) => void;
}

export const WasteInputForm: React.FC<WasteInputFormProps> = ({ input, onChange }) => {
    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 h-full flex flex-col justify-center">
            <h3 className="text-white font-bold mb-6 border-b border-slate-700 pb-2">Entrada de Residuos</h3>

            <div className="space-y-6">
                {/* Tipo de Residuo */}
                <div>
                    <label className="block text-slate-400 text-xs uppercase mb-2">Tipo de Residuo</label>
                    <select
                        className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={input.wasteType}
                        onChange={(e) => onChange('wasteType', e.target.value as WasteType)}
                    >
                        {Object.entries(IPCC_FACTORS.wasteTypes).map(([key, val]) => (
                            <option key={key} value={key}>{val.name}</option>
                        ))}
                    </select>
                    <div className="text-[10px] text-slate-500 mt-1">
                        Factor CH4: {IPCC_FACTORS.wasteTypes[input.wasteType].ch4_kg_per_ton} kg/ton (IPCC)
                    </div>
                </div>

                {/* Cantidad y Periodo */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs uppercase mb-2">Cantidad (Tons)</label>
                        <input
                            type="number"
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                            value={input.tons}
                            onChange={(e) => onChange('tons', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase mb-2">Periodo</label>
                        <select
                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={input.period}
                            onChange={(e) => onChange('period', e.target.value as Period)}
                        >
                            <option value="day">Por Día</option>
                            <option value="month">Por Mes</option>
                            <option value="year">Por Año</option>
                        </select>
                    </div>
                </div>

                {/* Escenario Alternativo */}
                <div>
                    <label className="block text-slate-400 text-xs uppercase mb-2">Escenario Relleno (Baseline)</label>
                    <select
                        className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={input.landfillType}
                        onChange={(e) => onChange('landfillType', e.target.value as LandfillType)}
                    >
                        <option value="no_capture">Sin sistema de captura (Más común)</option>
                        <option value="passive_venting">Ventilación pasiva (10% efec.)</option>
                        <option value="active_collection">Captura activa (50% efec.)</option>
                        <option value="flaring">Quema / Flaring (75% efec.)</option>
                    </select>
                    <div className="text-[10px] text-yellow-500/80 mt-1">
                        * Seleccionar "Sin captura" para rellenos municipales estándar en LatAm.
                    </div>
                </div>
            </div>
        </div>
    );
};
