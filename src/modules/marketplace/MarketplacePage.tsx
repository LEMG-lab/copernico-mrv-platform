import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MOCK_CREDITS } from './data/mockCredits';
import { Credit } from './types/marketplace.types';
import { CreditCard } from './components/CreditCard';
import { FilterSidebar } from './components/FilterSidebar';
import { CreditDetailModal } from './components/CreditDetailModal';
import { Navigation } from '../../components/Navigation';
import { translations } from '../../i18n/translations';

export const MarketplacePage: React.FC = () => {
    const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
    const { i18n } = useTranslation();
    const lang = (i18n.language || 'es') as 'es' | 'en';
    const t = translations[lang];

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans pb-20">
            <Navigation />

            {/* Header / Nav Placeholder */}
            <div className="bg-slate-900 border-b border-slate-800 py-6 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            🛍️ {t.marketplace?.title || 'Marketplace de Impacto'}
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {t.marketplace?.subtitle || 'Adquiere activos ambientales verificados directamente de plantas de bioconversión.'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-slate-800 rounded border border-slate-700 text-sm font-bold text-slate-300 hover:text-white">
                            {t.marketplace?.myPortfolio || 'Mi Portafolio'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Market Stats Bar */}
            <div className="border-b border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                    <div className="flex flex-col">
                        <span className="text-slate-500">{t.marketplace?.volume24h || 'Volumen 24h'}</span>
                        <span className="font-bold text-green-400">$125,400 <span className="text-[10px] text-green-600">▲ 12%</span></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">{t.marketplace?.avgPrice || 'Precio Promedio (Carbon)'}</span>
                        <span className="font-bold text-blue-400">$28.50 <span className="text-slate-600">/ton</span></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">{t.marketplace?.availableCredits || 'Créditos Disponibles'}</span>
                        <span className="font-bold text-white">45,000</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">{t.marketplace?.activePlants || 'Plantas Activas'}</span>
                        <span className="font-bold text-white">12</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar Filtros */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 sticky top-24">
                        <FilterSidebar />
                    </div>
                </aside>

                {/* Grid de Créditos */}
                <main className="flex-1">

                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <input
                            type="text"
                            placeholder={t.marketplace?.searchPlaceholder || 'Buscar por planta, país o ID...'}
                            className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white w-full max-w-xs focus:ring-1 focus:ring-blue-500 outline-none"
                        />

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">{t.marketplace?.sortBy || 'Ordenar por:'}</span>
                            <select className="bg-slate-900 border border-slate-700 rounded text-xs text-white px-2 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none">
                                <option>{t.marketplace?.sortOptions?.recommended || 'Recomendados'}</option>
                                <option>{t.marketplace?.sortOptions?.priceLow || 'Precio: Menor a Mayor'}</option>
                                <option>{t.marketplace?.sortOptions?.priceHigh || 'Precio: Mayor a Menor'}</option>
                                <option>{t.marketplace?.sortOptions?.ratingHigh || 'Rating: Mayor a Menor'}</option>
                                <option>{t.marketplace?.sortOptions?.recent || 'Recientes'}</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_CREDITS.map(credit => (
                            <CreditCard
                                key={credit.id}
                                credit={credit}
                                onClick={() => setSelectedCredit(credit)}
                            />
                        ))}
                    </div>

                    {/* Pagination (Visual) */}
                    <div className="mt-10 flex justify-center gap-2">
                        <button className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-sm border border-slate-700 hover:text-white">←</button>
                        <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-900/50">1</button>
                        <button className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-sm border border-slate-700 hover:text-white">2</button>
                        <button className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-sm border border-slate-700 hover:text-white">3</button>
                        <button className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-sm border border-slate-700 hover:text-white">→</button>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {selectedCredit && (
                <CreditDetailModal credit={selectedCredit} onClose={() => setSelectedCredit(null)} />
            )}

        </div>
    );
};

export default MarketplacePage;
