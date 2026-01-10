import React from 'react';
import { FinancialMetrics as MetricsType } from '../types/investor.types';

interface FinancialMetricsProps {
    metrics: MetricsType;
}

export const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ metrics }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Métricas Financieras Q4</h3>
                <div className="flex gap-2">
                    <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                        Ver P&L
                    </button>
                    <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                        Ver Cash Flow
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Operativas */}
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Resultados Operativos</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Ingresos Netos</span>
                            <div className="text-right">
                                <div className="font-bold text-slate-800">${metrics.revenue.toLocaleString()}</div>
                                <div className="text-xs text-green-500 font-bold">+{metrics.revenue_growth_yoy * 100}% YoY</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">EBITDA</span>
                            <div className="text-right">
                                <div className="font-bold text-slate-800">${metrics.ebitda.toLocaleString()}</div>
                                <div className="text-xs text-slate-400">{(metrics.ebitda / metrics.revenue * 100).toFixed(1)}% Margen</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Cash Runway</span>
                            <div className="text-right">
                                <div className="font-bold text-slate-800">{metrics.runway_months.toFixed(1)} meses</div>
                                <div className="text-xs text-slate-400">Burn: ${metrics.burn_rate.toLocaleString()}/mo</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SaaS Metrics */}
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Métricas de Plataforma (SaaS)</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">ARR (Recurrentes)</span>
                            <div className="text-right">
                                <div className="font-bold text-slate-800">${(metrics.arr! / 1000).toFixed(1)}k</div>
                                <div className="text-xs text-green-500 font-bold">↑ Crecimiento</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">LTV / CAC Ratio</span>
                            <div className="text-right">
                                <div className="font-bold text-blue-600">{metrics.ltv_cac_ratio}x</div>
                                <div className="text-xs text-slate-400">Eficiencia Alta</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 text-sm">Churn Rate</span>
                            <div className="text-right">
                                <div className="font-bold text-slate-800">{metrics.churn_rate! * 100}%</div>
                                <div className="text-xs text-green-500 font-bold">↓ Bajo control</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
