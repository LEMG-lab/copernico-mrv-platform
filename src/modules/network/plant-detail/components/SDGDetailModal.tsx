import React from 'react';
import { X, Globe, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { SDGContribution } from '../types/plantDetail.types';
import { SDG_DATA } from '../data/sdgData';

interface SDGDetailModalProps {
    sdg: SDGContribution;
    onClose: () => void;
}

export const SDGDetailModal: React.FC<SDGDetailModalProps> = ({ sdg, onClose }) => {
    const meta = SDG_DATA[sdg.sdg_number];

    if (!meta) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#0F172A] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div
                    className="px-6 py-4 flex justify-between items-center text-white"
                    style={{ backgroundColor: meta.color }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-xl backdrop-blur-sm">
                            {sdg.sdg_number}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{meta.name}</h3>
                            <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Objetivo de Desarrollo Sostenible</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 space-y-8">

                    {/* Description */}
                    <div>
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-3 uppercase tracking-wider">
                            <Globe className="w-4 h-4" />
                            Impacto del Proyecto
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            {sdg.contribution_description}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                        <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-4 uppercase tracking-wider">
                            <BarChart3 className="w-4 h-4" />
                            KPIs Verificables & Entregables
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {sdg.metrics.map((metric, idx) => (
                                <div key={idx} className="bg-slate-800 rounded-lg p-3 border border-slate-700/50">
                                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                                    <div className="text-xs text-slate-400 font-medium uppercase mb-1">{metric.indicator}</div>
                                    <div className="text-[10px] text-slate-500">{metric.unit}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Verification */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            <span>Trazabilidad garantizada por <strong className="text-white">Global Force Blockchain</strong></span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors group">
                            Ver registro en cadena
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
