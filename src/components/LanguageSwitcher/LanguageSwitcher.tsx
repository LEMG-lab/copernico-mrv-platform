import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    return (
        <div className="language-switcher">
            <button
                className={`lang-btn ${currentLang === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
                title="Español"
                aria-label="Cambiar a Español"
            >
                {/* Mexico Flag SVG */}
                <svg viewBox="0 0 36 24" className="flag-icon">
                    <rect width="12" height="24" fill="#006847" />
                    <rect x="12" width="12" height="24" fill="#FFFFFF" />
                    <rect x="24" width="12" height="24" fill="#CE1126" />
                    {/* Simplified Eagle Emblem */}
                    <circle cx="18" cy="12" r="3" fill="#8B4513" opacity="0.8" />
                </svg>
                <span className="lang-label">ES</span>
            </button>
            <button
                className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
                title="English"
                aria-label="Switch to English"
            >
                {/* UK Flag SVG */}
                <svg viewBox="0 0 36 24" className="flag-icon">
                    {/* Background blue */}
                    <rect width="36" height="24" fill="#012169" />
                    {/* White diagonal stripes */}
                    <path d="M0,0 L36,24 M36,0 L0,24" stroke="#FFFFFF" strokeWidth="4" />
                    {/* Red diagonal stripes */}
                    <path d="M0,0 L36,24 M36,0 L0,24" stroke="#C8102E" strokeWidth="2" />
                    {/* White cross */}
                    <path d="M18,0 V24 M0,12 H36" stroke="#FFFFFF" strokeWidth="6" />
                    {/* Red cross */}
                    <path d="M18,0 V24 M0,12 H36" stroke="#C8102E" strokeWidth="4" />
                </svg>
                <span className="lang-label">EN</span>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
