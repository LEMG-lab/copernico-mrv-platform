import React from 'react';
import { CreditType, VerificationLevel } from '../types/marketplace.types';

export const FilterSidebar: React.FC = () => {
    return (
        <div className="w-full space-y-8">
            {/* Tipo de Crédito */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tipo de Crédito</h3>
                <div className="space-y-2">
                    {['Carbon', 'Circular', 'Bio', 'Water', 'Social'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}LINK</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* País */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">País de Origen</h3>
                <select className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500">
                    <option>Todos los Países</option>
                    <option>México 🇲🇽</option>
                    <option>Países Bajos 🇳🇱</option>
                    <option>Francia 🇫🇷</option>
                    <option>Vietnam 🇻🇳</option>
                    <option>Sudáfrica 🇿🇦</option>
                </select>
            </div>

            {/* Precio */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Rango de Precio</h3>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-500">$0</span>
                    <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                    <span className="text-xs text-slate-500">$100+</span>
                </div>
            </div>

            {/* Verificación */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Nivel de Verificación</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-800 text-green-500 focus:ring-green-500 focus:ring-offset-slate-900" />
                        <span className="text-sm text-slate-300">Full Audit (IoT+Sat)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                        <span className="text-sm text-slate-300">Satellite + IoT</span>
                    </label>
                </div>
            </div>

            <button className="w-full py-2 text-xs text-slate-500 hover:text-white border border-slate-700 rounded hover:bg-slate-800 transition-colors">
                Limpiar Filtros
            </button>
        </div>
    );
};
