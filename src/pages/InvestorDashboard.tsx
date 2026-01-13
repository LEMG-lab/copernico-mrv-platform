import React from 'react';
import { Navigation } from '../components/Navigation';
import { ExecutiveSummary } from '../components/ExecutiveSummary';
import { ModuleCard } from '../components/ModuleCard';
import { useUIStore } from '../stores/uiStore';
import { translations } from '../i18n/translations';
import { SynapticBackground } from '../components/SynapticBackground';

const InvestorDashboard: React.FC = () => {
    const { language } = useUIStore();
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
                        title={t.modules.emissions.title}
                        description={t.modules.emissions.desc}
                        actionText={t.modules.emissions.action}
                        linkTo="/emissions"
                        icon="💨"
                        gradient="from-teal-500 to-emerald-600"
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
                        title="CircularLINK Partners"
                        description="Red de comercios certificados, consumidores y sistema de recompensas por economía circular"
                        actionText="Explorar Red →"
                        linkTo="/partners"
                        icon="♻️"
                        gradient="from-green-600 to-emerald-700"
                    />
                </div>

                {/* CircularLINK Partners Section */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-3">
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">♻️</span>
                            CircularLINK Partners
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                            Ecosistema de comercios certificados y consumidores comprometidos con la economía circular
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Partners Map */}
                        <a
                            href="/partners"
                            className="group bg-gradient-to-br from-green-900/80 to-emerald-900/80 border border-green-500/30 rounded-2xl p-5 hover:border-green-400 transition-all hover:scale-[1.02]"
                        >
                            <div className="text-3xl mb-3">🗺️</div>
                            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-green-300 transition-colors">
                                Mapa de Partners
                            </h3>
                            <p className="text-sm text-green-200/70">
                                127 comercios certificados en todo México
                            </p>
                        </a>

                        {/* Mi Impacto (Consumer Portal) */}
                        <a
                            href="/mi-impacto"
                            className="group bg-gradient-to-br from-emerald-900/80 to-teal-900/80 border border-emerald-500/30 rounded-2xl p-5 hover:border-emerald-400 transition-all hover:scale-[1.02]"
                        >
                            <div className="text-3xl mb-3">🌱</div>
                            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-emerald-300 transition-colors">
                                Mi Impacto
                            </h3>
                            <p className="text-sm text-emerald-200/70">
                                Semillas, logros y recompensas
                            </p>
                        </a>

                        {/* Partner Dashboard */}
                        <a
                            href="/dashboard/partner"
                            className="group bg-gradient-to-br from-teal-900/80 to-cyan-900/80 border border-teal-500/30 rounded-2xl p-5 hover:border-teal-400 transition-all hover:scale-[1.02]"
                        >
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-teal-300 transition-colors">
                                Dashboard Partner
                            </h3>
                            <p className="text-sm text-teal-200/70">
                                Métricas, entregas y QR
                            </p>
                        </a>

                        {/* Scan QR */}
                        <a
                            href="/scan/BAJIO01"
                            className="group bg-gradient-to-br from-lime-900/80 to-green-900/80 border border-lime-500/30 rounded-2xl p-5 hover:border-lime-400 transition-all hover:scale-[1.02]"
                        >
                            <div className="text-3xl mb-3">📱</div>
                            <h3 className="font-bold text-white text-lg mb-1 group-hover:text-lime-300 transition-colors">
                                Demo Escaneo QR
                            </h3>
                            <p className="text-sm text-lime-200/70">
                                Prueba la experiencia del consumidor
                            </p>
                        </a>
                    </div>

                    {/* Stats Banner */}
                    <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <div className="text-2xl font-black text-green-400">127</div>
                            <div className="text-xs text-slate-500">Partners activos</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-emerald-400">2.8M</div>
                            <div className="text-xs text-slate-500">kg trazados</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-teal-400">5.1M</div>
                            <div className="text-xs text-slate-500">kg CO2 evitado</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-cyan-400">4,892</div>
                            <div className="text-xs text-slate-500">Consumidores</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-pink-400">$145K</div>
                            <div className="text-xs text-slate-500">Donado</div>
                        </div>
                    </div>
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
