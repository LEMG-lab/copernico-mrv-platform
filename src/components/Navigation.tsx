import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { translations } from '../i18n/translations';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
    const { theme, language, toggleTheme, setLanguage } = useUIStore();
    const t = translations[language] || translations['es'] || {};

    return (
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                            LL
                        </div>
                        <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">
                            LarvaLINK <span className="text-slate-400 font-normal text-sm">| Investor Portal</span>
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/investor-portal"
                            className="hidden md:flex items-center gap-2 bg-[#1E3A5F] hover:bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
                        >
                            <span>🔒</span> Acceso Partners
                        </Link>

                        {/* Language Toggle */}
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded p-1">
                            <button
                                onClick={() => setLanguage('es')}
                                className={`px-2 py-1 text-xs font-bold rounded ${language === 'es' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                            >
                                ES
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-2 py-1 text-xs font-bold rounded ${language === 'en' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
