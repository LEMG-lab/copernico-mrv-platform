import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { translations } from '../i18n/translations';

export const ExecutiveSummary: React.FC = () => {
    const { language } = useUIStore();
    const t = translations[language];

    const StatItem = ({ value, label, trend }: { value: string, label: string, trend?: string }) => (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</div>
            {trend && <div className="text-xs text-green-500 mt-2 font-bold">{trend}</div>}
        </div>
    );

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                {t.executiveSummary}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        {t.summaryText}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-700">BioTech</span>
                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold border border-green-200 dark:border-green-700">Regenerative Ag</span>
                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-700">Carbon Credits</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <StatItem value="3" label={t.stats.plants} trend="+1 Planned (Q4)" />
                    <StatItem value="1,642" label={t.stats.processed} trend="▲ 12% MoM" />
                    <StatItem value="2,847" label={t.stats.avoided} trend="Verified IPCC" />
                    <StatItem value="+75%" label={t.stats.ndvi} trend="Sentinel-2 Confirmed" />
                </div>
            </div>

            <div className="text-[10px] text-slate-400 dark:text-slate-500 italic text-right">
                {language === 'es' ? 'Datos actualizados: T4 2025 • Fuente: LarvaLINK Chain Oracle' : 'Data updated: Q4 2025 • Source: LarvaLINK Chain Oracle'}
            </div>
        </div>
    );
};
