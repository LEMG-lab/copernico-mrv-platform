import { create } from 'zustand';

type Theme = 'dark' | 'light';
type Language = 'es' | 'en';

interface UIState {
    theme: Theme;
    language: Language;
    toggleTheme: () => void;
    setLanguage: (lang: Language) => void;
}

export const useUIStore = create<UIState>((set) => ({
    theme: 'dark', // Default
    language: 'es', // Default

    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        // Aplicar clase al documento HTML inmediatamente
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
    }),

    setLanguage: (lang) => set({ language: lang }),
}));

// Inicializar tema al cargar
if (typeof window !== 'undefined') {
    document.documentElement.classList.add('dark');
}
