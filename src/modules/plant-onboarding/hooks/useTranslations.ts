/**
 * Custom translation hook that mirrors the react-i18next API
 * but uses our existing translations system with useUIStore.
 * 
 * This provides a drop-in replacement for useTranslation() in components
 * that were built with react-i18next but need to work with our simpler setup.
 */
import { translations } from '../../../i18n/translations';
import { useUIStore } from '../../../stores/uiStore';

// Helper to get nested value from object using dot notation
function getNestedValue(obj: any, path: string): string {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
        if (current === undefined || current === null) {
            return path; // Return the key as fallback
        }
        current = current[key];
    }

    return current !== undefined ? String(current) : path;
}

// Interpolate variables like {{capacity}} in strings
function interpolate(str: string, variables?: Record<string, any>): string {
    if (!variables || typeof str !== 'string') return str;

    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return variables[key] !== undefined ? String(variables[key]) : match;
    });
}

export const useTranslations = () => {
    const { language } = useUIStore();
    const currentTranslations = translations[language as keyof typeof translations] || translations['es'];

    /**
     * Translation function that mimics i18next's t() function
     * @param key - Dot-notation key like 'modules.plantOnboarding.wizard.step1.title'
     * @param options - Optional interpolation variables
     */
    const t = (key: string, options?: Record<string, any>): string => {
        const value = getNestedValue(currentTranslations, key);
        return interpolate(value, options);
    };

    return { t, language };
};

// Re-export for compatibility
export { useTranslations as useTranslation };
