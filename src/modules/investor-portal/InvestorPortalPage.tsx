import React from 'react';
import { PortfolioSummary } from './components/PortfolioSummary';
import { MandateCompliance } from './components/MandateCompliance';
import { ImpactMetrics } from './components/ImpactMetrics';
import { SDGAlignment } from './components/SDGAlignment';
import { ImpactTimeline } from './components/ImpactTimeline';
import { FinancialMetrics } from './components/FinancialMetrics';
import { AlertsPanel } from './components/AlertsPanel';
import { ReportGenerator } from './components/ReportGenerator';
import {
    MOCK_INVESTOR,
    MOCK_IMPACT_CURRENT,
    MOCK_FINANCIALS,
    MOCK_SDG_CONTRIBUTIONS,
    MOCK_COMPLIANCE,
    MOCK_ALERTS,
    MOCK_IMPACT_HISTORY,
    MOCK_REPORTS
} from './data/mockInvestorData';

export const InvestorPortalPage: React.FC = () => {

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex overflow-hidden">

            {/* Main Content Scrollable */}
            <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden">

                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-4 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src={MOCK_INVESTOR.logo_url} alt="Fund Logo" className="h-10 w-10 rounded bg-slate-100 object-contain text-xs" />
                        <div>
                            <h1 className="text-xl font-bold text-[#1E3A5F]">Portal de Inversionistas</h1>
                            <div className="text-xs text-slate-500 font-medium">
                                <span className="text-slate-400">Bienvenida,</span> {MOCK_INVESTOR.contacts[0].name}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <div className="text-xs font-bold text-slate-500 uppercase">Última actualización</div>
                            <div className="text-sm font-bold text-slate-800">10 Ene 2026 • 14:30 GMT-6</div>
                        </div>
                        <button className="bg-[#1E3A5F] hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-900/20">
                            Ir al Data Room
                        </button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                    {/* 1. Resumen de Inversión */}
                    <section>
                        <PortfolioSummary investor={MOCK_INVESTOR} />
                    </section>

                    {/* 2. Cumplimiento de Mandato */}
                    <section>
                        <MandateCompliance
                            mandate={MOCK_INVESTOR.mandate}
                            complianceList={MOCK_COMPLIANCE}
                        />
                    </section>

                    {/* 3. Impacto en Tiempo Real */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-xl font-bold text-[#1E3A5F]">Impacto Verificado</h2>
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                                🛰️ COPERNICUS APPROVED
                            </span>
                        </div>
                        <ImpactMetrics metrics={MOCK_IMPACT_CURRENT} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                            <div className="lg:col-span-2">
                                <ImpactTimeline data={MOCK_IMPACT_HISTORY} />
                            </div>
                            <div className="flex flex-col gap-6">
                                {/* Mini map placeholder or something else? Let's verify prompt. Prompt said ImpactTimeline chart. We put it here. 
                                 The right column can be used for "Contribution to SDG" as per section 4 ordering but layout-wise it fits nicely side-by-side. 
                                 Wait, Prompt SECTION 4 is SDG. Let's put SDG below full width. 
                             */}
                                {/* Blockchain Verification Badge Card */}
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-center items-center text-center">
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-2xl mb-4">🔗</div>
                                    <h3 className="font-bold text-slate-800 mb-2">Trazabilidad Blockchain</h3>
                                    <p className="text-xs text-slate-500 mb-4 px-4">Cada tonelada de CO2 y residuo es tokenizada y registrada en Polygon.</p>
                                    <div className="bg-slate-50 border border-slate-200 rounded p-2 text-[10px] font-mono text-slate-600 break-all w-full mb-4">
                                        {MOCK_IMPACT_CURRENT.blockchain_hash}
                                    </div>
                                    <a href="#" className="text-blue-600 hover:underline text-xs font-bold">Ver en Explorador →</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. ODS */}
                    <section>
                        <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">Contribución a Objetivos de Desarrollo Sostenible</h2>
                        <SDGAlignment contributions={MOCK_SDG_CONTRIBUTIONS} />
                    </section>

                    {/* 5. Métricas Financieras */}
                    <section>
                        <FinancialMetrics metrics={MOCK_FINANCIALS} />
                    </section>

                    {/* 6. Reportes */}
                    <section>
                        <ReportGenerator recentReports={MOCK_REPORTS} />
                    </section>



                </main>

                {/* Footer */}
                <footer className="border-t border-slate-200 bg-white py-8 px-8 mt-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                        <div>
                            © 2026 LarvaLINK Inc. Confidential.
                        </div>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-slate-800">Soporte IR</a>
                            <a href="#" className="hover:text-slate-800">Privacidad</a>
                            <a href="#" className="hover:text-slate-800">Términos</a>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Sidebar de Alertas (Desktop) */}
            <div className="w-80 border-l border-slate-200 hidden xl:block h-screen sticky top-0 bg-white">
                <AlertsPanel alerts={MOCK_ALERTS} />
            </div>

        </div>
    );
};
