import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '../components/Navigation';
import { ExecutiveSummary } from '../components/ExecutiveSummary';
import { ModuleCard } from '../components/ModuleCard';
import { translations } from '../i18n/translations';
import { SynapticBackground } from '../components/SynapticBackground';

const InvestorDashboard: React.FC = () => {
    const { i18n } = useTranslation();
    const language = (i18n.language || 'es') as 'es' | 'en';
    const t = translations[language];

    const handlePrint = () => {
        window.print();
    };

    if (!t) {
        console.error('Translation error', { language, translations });
        return <div className="p-10 text-red-500">Error loading translations for language: {language}</div>;
    }

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300 relative overflow-hidden">
            <SynapticBackground />
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
                {/* Hero */}
                <div className="text-center mb-12 fade-in">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.heroSubtitle}
                    </p>
                </div>

                {/* Executive Summary */}
                <div className="mb-12 animate-fade-in-up">
                    <ExecutiveSummary />
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <ModuleCard
                        title={t.modules.terralink.title}
                        description={t.modules.terralink.desc}
                        actionText={t.modules.terralink.action}
                        linkTo="/terralink"
                        icon="🌱"
                        gradient="from-emerald-500 to-green-700"
                    />
                    <ModuleCard
                        title="CircularLINK Partners"
                        description="Red de comercios certificados, consumidores y sistema de recompensas por economía circular"
                        actionText="Explorar Red →"
                        linkTo="/partners"
                        icon="♻️"
                        gradient="from-green-600 to-emerald-700"
                    />
                    <ModuleCard
                        title={t.modules.network.title}
                        description={t.modules.network.desc}
                        actionText={t.modules.network.action}
                        linkTo="/network"
                        icon="🌍"
                        gradient="from-lime-600 to-green-800"
                    />
                    <ModuleCard
                        title={t.modules.plantOnboarding.title}
                        description={t.modules.plantOnboarding.desc}
                        actionText={t.modules.plantOnboarding.action}
                        linkTo="/plant-onboarding"
                        icon="🏭"
                        gradient="from-amber-600 to-yellow-700"
                    />
                    <ModuleCard
                        title={t.modules.marketplace.title}
                        description={t.modules.marketplace.desc}
                        actionText={t.modules.marketplace.action}
                        linkTo="/marketplace"
                        icon="🪙"
                        gradient="from-emerald-400 to-teal-500"
                    />
                    <ModuleCard
                        title={t.modules.viability.title}
                        description={t.modules.viability.desc}
                        actionText={t.modules.viability.action}
                        linkTo="/viability"
                        icon="🧮"
                        gradient="from-cyan-700 to-teal-800"
                    />
                    <ModuleCard
                        title={t.modules.investorPortal.title}
                        description={t.modules.investorPortal.desc}
                        actionText={t.modules.investorPortal.action}
                        linkTo="/investor-portal"
                        icon="💼"
                        gradient="from-slate-700 to-slate-900"
                    />
                    <ModuleCard
                        title={t.modules.alerts?.title || "Centro de Alertas"}
                        description={t.modules.alerts?.desc || "Monitoreo de alertas operativas, compliance y oportunidades en tiempo real"}
                        actionText={t.modules.alerts?.action || "Ver Alertas"}
                        linkTo="/alerts"
                        icon="🔔"
                        gradient="from-red-700 to-orange-800"
                    />
                    <ModuleCard
                        title={t.modules.emissions.title}
                        description={t.modules.emissions.desc}
                        actionText={t.modules.emissions.action}
                        linkTo="/emissions"
                        icon="💨"
                        gradient="from-teal-500 to-emerald-600"
                    />
                </div>

                {/* Footer / Data Sources */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center pb-8">
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest">{t.sources}</h4>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Copernicus Sentinel-2 & 5P (ESA)
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            IPCC 2019 Refinement + AR6
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Global Force Blockchain
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handlePrint}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
                        >
                            <span>📄</span> {t.actions.download}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard;
