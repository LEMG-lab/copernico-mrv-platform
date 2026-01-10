import React from 'react';
import { Investor } from '../types/investor.types';

interface PortfolioSummaryProps {
    investor: Investor;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ investor }) => {
    const { investment } = investor;

    // Calcular ROI simple como ejemplo
    const currentVal = investment.current_valuation || 0;
    const entryVal = investment.valuation_at_entry || 1;
    const roi = ((currentVal - entryVal) / entryVal) * 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Inversión Total</div>
                <div className="text-2xl font-bold text-slate-800 mb-1">${(investment.amount_usd / 1000000).toFixed(1)}M USD</div>
                <div className="text-xs text-slate-400 capitalize">{investment.instrument} • {new Date(investment.date).getFullYear()}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Valoración Actual</div>
                <div className="text-2xl font-bold text-slate-800 mb-1">${(currentVal / 1000000).toFixed(1)}M USD post-money</div>
                <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 w-fit px-1.5 py-0.5 rounded">
                    ↗ +{roi.toFixed(1)}% vs Entry
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="22 7 15 7 15 14"></polyline></svg>
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">IRR Esperado</div>
                <div className="text-2xl font-bold text-slate-800 mb-1">{investment.expected_irr}%</div>
                <div className="text-xs text-slate-400">Exit target: {investment.expected_exit_year}</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h10"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Impact Score</div>
                <div className="text-2xl font-bold text-green-600 mb-1">94/100</div>
                <div className="text-xs text-slate-400">Top 5% del Portafolio</div>
                <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
            </div>
        </div>
    );
};
