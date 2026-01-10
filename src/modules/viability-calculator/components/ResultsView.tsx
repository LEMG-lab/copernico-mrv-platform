import React from 'react';
import { ViabilityResult } from '../types/viability.types';

interface ResultsViewProps {
    result: ViabilityResult;
    onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onRestart }) => {

    // Color helper basado en el score
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500 border-green-500';
        if (score >= 60) return 'text-yellow-500 border-yellow-500';
        return 'text-red-500 border-red-500';
    };

    return (
        <div className="space-y-8 animate-fade-in-up pb-20">

            {/* 1. Score General */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none`}></div>

                <div className={`relative w-40 h-40 rounded-full border-8 flex flex-col items-center justify-center ${getScoreColor(result.overall_score)} bg-slate-900`}>
                    <div className="text-5xl font-bold text-white">{result.overall_score}</div>
                    <div className="text-xs font-bold uppercase text-slate-400 mt-1">/ 100</div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-bold uppercase mb-2">
                        Resultado del Análisis
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Proyecto {result.recommendation === 'highly_viable' ? 'Altamente Viable 🚀' : result.recommendation === 'viable' ? 'Viable ✅' : 'Desafiante ⚠️'}
                    </h2>
                    <p className="text-slate-400 max-w-2xl">
                        {result.recommendation === 'highly_viable'
                            ? "Tu ubicación presenta condiciones excelentes. El clima es óptimo, hay abundancia de residuos y el mercado local muestra un fuerte potencial."
                            : "El proyecto es viable pero requiere atención en factores específicos como la regulación o la competencia local."}
                    </p>
                </div>

                <button onClick={() => window.alert('Descargando PDF... (Simulación)')} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-slate-600">
                    📄 Guardar PDF
                </button>
            </div>

            {/* 2. Factores Clave */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.factors.map((factor, idx) => (
                    <div key={idx} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-slate-300">{factor.name}</h4>
                            <span className={`text-sm font-bold ${factor.score > 75 ? 'text-green-400' : factor.score > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {Math.round(factor.score)}/100
                            </span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full mb-3 overflow-hidden">
                            <div className={`h-full rounded-full ${factor.score > 75 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${factor.score}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-400">{factor.details}</p>
                    </div>
                ))}
            </div>

            {/* 3. Proyecciones Financieras */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    💰 Proyecciones Financieras Estimadas
                    <span className="text-[10px] bg-blue-900 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-normal ml-2">PRELIMINAR</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-xs uppercase mb-1">CAPEX Estimado</div>
                        <div className="text-xl font-bold text-white">${(result.financial.capex.total / 1000).toFixed(0)}k USD</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-xs uppercase mb-1">Payback</div>
                        <div className="text-xl font-bold text-blue-400">{result.financial.metrics.payback_years} años</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-xs uppercase mb-1">IRR Proyectado</div>
                        <div className="text-xl font-bold text-green-400">{result.financial.metrics.irr}%</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-xs uppercase mb-1">Punto de Eq.</div>
                        <div className="text-xl font-bold text-white">{result.financial.metrics.break_even_months} meses</div>
                    </div>
                </div>

                <div className="text-xs text-slate-500 text-center italic">
                    * Estimaciones basadas en benchmarks globales de LarvaLINK. No constituye asesoría financiera oficial.
                </div>
            </div>

            {/* 4. Impacto Ambiental */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-900/40 to-slate-900 p-6 rounded-xl border border-green-500/20">
                    <h3 className="font-bold text-white mb-4">🌍 Impacto Anual</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">CO2</div>
                            <div>
                                <div className="text-2xl font-bold text-white">{result.impact.co2eq_avoided_year.toLocaleString()} tons</div>
                                <div className="text-xs text-slate-400">CO2eq evitado</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">H2O</div>
                            <div>
                                <div className="text-2xl font-bold text-white">{result.impact.water_saved_m3.toLocaleString()} m³</div>
                                <div className="text-xs text-slate-400">Agua ahorrada vs ganadería</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Final */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-center items-center text-center">
                    <h3 className="font-bold text-white text-lg mb-2">Desarrolla este proyecto con LarvaLINK</h3>
                    <p className="text-sm text-slate-400 mb-6">Ofrecemos tecnología, consultoría y acceso a capital para hacer realidad esta planta.</p>
                    <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-green-900/50 w-full md:w-auto transform hover:-translate-y-1 transition-transform">
                        Solicitar Consultoría Experta
                    </button>
                    <button onClick={onRestart} className="mt-4 text-sm text-slate-500 hover:text-white underline">
                        Iniciar nuevo análisis
                    </button>
                </div>
            </div>

        </div>
    );
};
