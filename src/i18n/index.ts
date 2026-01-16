import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

// Get saved language from localStorage or default to Spanish
const savedLanguage = localStorage.getItem('larvalink-language') || 'es';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: translations.es },
            en: { translation: translations.en }
        },
        lng: savedLanguage,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false
        }
    });

// Helper to change language and persist
export const changeLanguage = (lang: 'es' | 'en') => {
    localStorage.setItem('larvalink-language', lang);
    i18n.changeLanguage(lang);
};

export default i18n;
