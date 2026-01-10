/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    dark: '#0F172A', // Slate 900
                    light: '#F8FAFC', // Slate 50
                    accent: '#38BDF8', // Sky 400
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.5s ease-out',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                }
            }
        },
    },
    plugins: [],
}
