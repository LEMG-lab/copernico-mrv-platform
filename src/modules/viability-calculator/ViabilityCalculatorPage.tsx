import React, { useState } from 'react';
import { LocationPicker } from './components/LocationPicker';
import { ParameterForm } from './components/ParameterForm';
import { ResultsView } from './components/ResultsView';
import { Location, ProjectParameters, ViabilityResult } from './types/viability.types';
import { viabilityService } from './services/viabilityService';

type WizardStep = 'location' | 'params' | 'analysis' | 'results';

export const ViabilityCalculatorPage: React.FC = () => {
    const [step, setStep] = useState<WizardStep>('location');
    const [location, setLocation] = useState<Location | null>(null);
    const [params, setParams] = useState<ProjectParameters | null>(null);
    const [result, setResult] = useState<ViabilityResult | null>(null);

    const handleLocationSelect = (loc: Location) => {
        setLocation(loc);
        setStep('params');
        window.scrollTo(0, 0);
    };

    const handleParamsSubmit = async (p: ProjectParameters) => {
        setParams(p);
        setStep('analysis');

        if (location) {
            try {
                const res = await viabilityService.calculateViability(location, p);
                setResult(res);
                setTimeout(() => {
                    setStep('results');
                    window.scrollTo(0, 0);
                }, 2000); // Mínimo tiempo de carga para UX
            } catch (e) {
                console.error(e);
                alert("Error calculando viabilidad");
                setStep('params');
            }
        }
    };

    const handleRestart = () => {
        setStep('location');
        setLocation(null);
        setParams(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] pb-20 font-sans text-slate-200">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-800 py-6">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Calculadora de Viabilidad BSF 🧮</h1>
                    <p className="text-slate-400">Evalúa el potencial de una planta de bioconversión en tu ubicación en minutos.</p>
                </div>
            </header>

            {/* Stepper Progress */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between relative mb-12">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-0"></div>
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 -z-0`}
                        style={{ width: step === 'location' ? '0%' : step === 'params' ? '33%' : step === 'analysis' ? '66%' : '100%' }}></div>

                    {[
                        { id: 'location', label: '1. Ubicación' },
                        { id: 'params', label: '2. Proyecto' },
                        { id: 'analysis', label: '3. Análisis' },
                        { id: 'results', label: '4. Resultados' }
                    ].map((s, i) => {
                        const isActive = step === s.id;
                        const isCompleted = ['location', 'params', 'analysis', 'results'].indexOf(step) > i;

                        return (
                            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors
                                    ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/50' :
                                        isCompleted ? 'bg-slate-900 border-blue-600 text-blue-500' : 'bg-slate-900 border-slate-700 text-slate-500'}
                                `}>
                                    {isCompleted ? '✓' : i + 1}
                                </div>
                                <span className={`text-xs font-bold ${isActive || isCompleted ? 'text-white' : 'text-slate-600'}`}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-1 md:p-8 min-h-[400px]">

                    {step === 'location' && (
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                    )}

                    {step === 'params' && (
                        <ParameterForm
                            onSubmit={handleParamsSubmit}
                            onBack={() => setStep('location')}
                        />
                    )}

                    {step === 'analysis' && (
                        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                            <div className="relative w-24 h-24 mb-6">
                                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-3xl">🛰️</div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Analizando datos satelitales...</h2>
                            <p className="text-slate-400">Consultando Copernicus Climate Data Store y bases de datos locales.</p>

                            <div className="mt-8 text-sm text-slate-500 font-mono">
                                <div className="mb-1 text-green-400">✓ Temperatura Superficial (LST) obtenida</div>
                                <div className="mb-1 text-green-400">✓ Disponibilidad de biomasa calculada</div>
                                <div className="animate-pulse text-blue-400">● Evaluando competencia regional...</div>
                            </div>
                        </div>
                    )}

                    {step === 'results' && result && (
                        <ResultsView result={result} onRestart={handleRestart} />
                    )}

                </div>
            </div>
        </div>
    );
};
