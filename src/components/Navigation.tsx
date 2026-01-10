import React from 'react';
import { useUIStore } from '../stores/uiStore';
import { translations } from '../i18n/translations';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
    const { theme, language, toggleTheme, setLanguage } = useUIStore();
    const t = translations[language] || translations['es'] || {};
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo + Home Button */}
                    <div className="flex items-center gap-4">
                        {/* Home Button - Always visible except on home page */}
                        {!isHome && (
                            <Link
                                to="/"
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                                aria-label="Ir al inicio"
                                title="Ir al inicio"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </Link>
                        )}

                        {/* LarvaLINK Logo */}
                        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <img
                                src="/larvalink-logo.png"
                                alt="LarvaLINK Logo"
                                className="h-10 w-auto object-contain"
                                style={{ filter: theme === 'light' ? 'invert(1) brightness(0.3)' : 'none' }}
                            />
                        </Link>
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
