import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';

export const SuccessScreen: React.FC = () => {
    const { appId } = useOnboarding();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 text-center">

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 text-green-600 animate-bounce">
                    ✓
                </div>

                <h1 className="text-3xl font-bold text-slate-800 mb-2">¡Bienvenido a la Red LarvaLINK!</h1>
                <p className="text-slate-500 mb-8 max-w-lg mx-auto">Tu solicitud <span className="font-mono text-xs bg-slate-100 p-1 rounded">{appId}</span> ha sido recibida exitosamente y está en proceso de verificación automática.</p>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-left max-w-lg mx-auto mb-8">
                    <h3 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wider">Próximos Pasos:</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="mt-0.5">
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-sm">Registro completado</div>
                                <div className="text-xs text-slate-500">Tus datos han sido guardados de forma segura.</div>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-0.5">
                                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-slate-400 text-xs">2</div>
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-sm">Verificación de Documentos</div>
                                <div className="text-xs text-slate-500">Nuestro equipo legal revisará tu licencia en 24-48hrs.</div>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-0.5">
                                <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-slate-400 text-xs">3</div>
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-sm">Verificación Satelital</div>
                                <div className="text-xs text-slate-500">Copernicus Sentinel analizará tu ubicación automáticamente.</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => window.location.href = '/'} // En un dashboard real iría al dashboard de la planta
                        className="bg-[#1E3A5F] hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
                    >
                        Ir a mi Dashboard Provisorio
                    </button>
                    <button className="bg-white hover:bg-slate-50 text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors border border-blue-200 shadow-sm">
                        Agendar Videollamada
                    </button>
                </div>

            </div>
        </div>
    );
};
