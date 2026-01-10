import React from 'react';
import { Credit, CreditType } from '../types/marketplace.types';

interface CreditCardProps {
    credit: Credit;
    onClick: () => void;
}

const TYPE_COLORS: Record<CreditType, { bg: string, text: string, border: string, label: string }> = {
    carbon: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30', label: 'CarbonLINK' },
    circular: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30', label: 'CircularLINK' },
    bio: { bg: 'bg-emerald-600/10', text: 'text-emerald-500', border: 'border-emerald-500/30', label: 'BioLINK' },
    water: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30', label: 'WaterLINK' },
    social: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30', label: 'SocialLINK' },
};

export const CreditCard: React.FC<CreditCardProps> = ({ credit, onClick }) => {
    const styles = TYPE_COLORS[credit.type];

    // Helper para banderas simples (en prod usar librería de iconos)
    const getFlag = (country: string) => {
        const flags: Record<string, string> = { "Mexico": "🇲🇽", "Netherlands": "🇳🇱", "France": "🇫🇷", "Vietnam": "🇻🇳", "South Africa": "🇿🇦" };
        return flags[country] || "🌐";
    };

    return (
        <div
            onClick={onClick}
            className="bg-slate-800 rounded-xl border border-slate-700 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-slate-500 group relative overflow-hidden"
        >
            {/* Background Gradient sutil */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none`}></div>

            {/* Header: Tipo y Planta */}
            <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${styles.bg} ${styles.text} ${styles.border}`}>
                    {styles.label}
                </span>
                <div className="text-right">
                    <div className="text-xs text-slate-400 mb-0.5 flex items-center justify-end gap-1">
                        {getFlag(credit.plant.country)} {credit.plant.country}
                    </div>
                    <div className="font-bold text-slate-200 text-sm">{credit.plant.name}</div>
                </div>
            </div>

            {/* Main Info */}
            <div className="mb-4">
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-white">{credit.quantity.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 font-medium">{credit.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-lg font-bold text-blue-400">${credit.price_per_unit} <span className="text-xs font-normal text-slate-500">/ un.</span></div>
                </div>
            </div>

            {/* Footer: Rating y Verificación */}
            <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                    <span>★</span> {credit.plant.rating}
                </div>

                <div className="flex items-center gap-1.5" title={`Nivel de Verificación: ${credit.verification.level}`}>
                    <span className={`w-2 h-2 rounded-full ${credit.verification.level === 'full' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">
                        {credit.verification.level === 'full' ? 'Full Audit' : 'Verified'}
                    </span>
                    {credit.verification.blockchain_tx && (
                        <span className="text-[10px] text-slate-600">⛓️</span>
                    )}
                </div>
            </div>

            {/* Botón "Ver más" que aparece en hover */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center items-center">
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-slate-200 w-full">
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};
