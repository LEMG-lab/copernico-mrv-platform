import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';

export const WelcomeScreen: React.FC = () => {
    const { startOnboarding, isLoading } = useOnboarding();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-fade-in-up">
                <div className="bg-[#1E3A5F] p-8 text-center text-white">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                        LL
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Únete a la Red LarvaLINK</h1>
                    <p className="text-blue-200">La primera red global de bioconversión verificada por satélite.</p>
                </div>

                <div className="p-8 md:p-12">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
                        <h3 className="font-bold text-[#1E3A5F] mb-4">Al unirte obtendrás:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-slate-700 text-sm">Certificación automática de créditos (Carbono, Circularidad, Biodiversidad).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-slate-700 text-sm">Verificación satelital de tu impacto vía Copernicus Sentinel-2.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-slate-700 text-sm">Acceso directo al marketplace global de compradores.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="text-slate-700 text-sm">Dashboard operativo con analítica en tiempo real.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                            ⏱️ Tiempo estimado: 30 minutos
                        </div>

                        <button
                            onClick={() => startOnboarding()}
                            disabled={isLoading}
                            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Iniciando...' : 'Comenzar Registro →'}
                        </button>

                        <p className="text-slate-400 text-sm mt-4">
                            ¿Ya tienes cuenta? <a href="#" className="text-blue-600 font-bold hover:underline">Iniciar sesión</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
