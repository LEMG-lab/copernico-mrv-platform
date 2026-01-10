import React from 'react';
import { Navigation } from '../components/Navigation';
import { ExecutiveSummary } from '../components/ExecutiveSummary';
import { ModuleCard } from '../components/ModuleCard';
import { useUIStore } from '../stores/uiStore';
import { translations } from '../i18n/translations';

const InvestorDashboard: React.FC = () => {
    const { language } = useUIStore();
    const t = translations[language];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pb-20 transition-colors duration-300">
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
                    <ModuleCard
                        title={t.modules.terralink.title}
                        description={t.modules.terralink.desc}
                        actionText={t.modules.terralink.action}
                        linkTo="/terralink"
                        icon="🌱"
                        gradient="from-green-400 to-emerald-600"
                    />
                    <ModuleCard
                        title={t.modules.emissions.title}
                        description={t.modules.emissions.desc}
                        actionText={t.modules.emissions.action}
                        linkTo="/emissions"
                        icon="💨"
                        gradient="from-blue-400 to-cyan-600"
                    />
                    <ModuleCard
                        title={t.modules.network.title}
                        description={t.modules.network.desc}
                        actionText={t.modules.network.action}
                        linkTo="/network"
                        icon="🌍"
                        gradient="from-purple-400 to-indigo-600"
                    />
                    <ModuleCard
                        title={t.modules.marketplace.title}
                        description={t.modules.marketplace.desc}
                        actionText={t.modules.marketplace.action}
                        linkTo="/marketplace"
                        icon="🪙"
                        gradient="from-yellow-400 to-orange-600"
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
