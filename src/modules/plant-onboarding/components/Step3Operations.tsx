import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { WASTE_TYPES_INFO, PRODUCT_TYPES_INFO } from '../data/onboardingConfig';
import { WasteType, ProductType } from '../types/onboarding.types';

export const Step3Operations: React.FC = () => {
    const { operations, updateOperations, setStep, saveProgress } = useOnboarding();

    const toggleWaste = (type: WasteType) => {
        const current = operations.waste_types || [];
        const updated = current.includes(type)
            ? current.filter(t => t !== type)
            : [...current, type];
        updateOperations({ waste_types: updated });
    };

    const toggleProduct = (type: ProductType) => {
        const current = operations.products || [];
        const updated = current.includes(type)
            ? current.filter(t => t !== type)
            : [...current, type];
        updateOperations({ products: updated });
    };

    const handleNext = () => {
        if (!operations.capacity_tons_day || !operations.current_utilization || (operations.waste_types?.length === 0) || (operations.products?.length === 0)) {
            alert("Por favor completa la capacidad y selecciona al menos un residuo y un producto.");
            return;
        }
        saveProgress();
        setStep('sensors');
    };

    return (
        <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Datos de Operación</h2>

            {/* Metrics Sliders */}
            <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="flex justify-between text-sm font-bold text-slate-700 mb-4">
                            <span>Capacidad de Procesamiento</span>
                            <span className="text-blue-600">{operations.capacity_tons_day || 0} tons/día</span>
                        </label>
                        <input
                            type="range"
                            min="1" max="500" step="1"
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            value={operations.capacity_tons_day || 0}
                            onChange={(e) => updateOperations({ capacity_tons_day: parseInt(e.target.value) })}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                            <span>1 ton</span>
                            <span>500 tons</span>
                        </div>
                    </div>

                    <div>
                        <label className="flex justify-between text-sm font-bold text-slate-700 mb-4">
                            <span>Utilización Actual</span>
                            <span className="text-blue-600">{operations.current_utilization || 0}%</span>
                        </label>
                        <input
                            type="range"
                            min="0" max="100" step="5"
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            value={operations.current_utilization || 0}
                            onChange={(e) => updateOperations({ current_utilization: parseInt(e.target.value) })}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-2">
                            <span>0%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 md:w-1/2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Operando desde</label>
                    <input
                        type="date"
                        className="w-full rounded-lg border-slate-300 shadow-sm"
                        value={operations.operational_since ? new Date(operations.operational_since).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateOperations({ operational_since: new Date(e.target.value).toISOString() })}
                    />
                </div>
            </div>

            {/* Waste Types */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Tipos de Residuo (Insumos) *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(Object.entries(WASTE_TYPES_INFO) as [WasteType, { label: string }][]).map(([key, info]) => (
                        <label key={key} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${operations.waste_types?.includes(key)
                                ? 'bg-green-50 border-green-200 shadow-sm'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}>
                            <input
                                type="checkbox"
                                className="rounded border-slate-300 text-green-600 focus:ring-green-500 h-5 w-5"
                                checked={operations.waste_types?.includes(key) || false}
                                onChange={() => toggleWaste(key)}
                            />
                            <span className={`text-sm ${operations.waste_types?.includes(key) ? 'font-bold text-green-800' : 'text-slate-600'}`}>
                                {info.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Products */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Productos Generados *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(Object.entries(PRODUCT_TYPES_INFO) as [ProductType, { label: string }][]).map(([key, info]) => (
                        <label key={key} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${operations.products?.includes(key)
                                ? 'bg-blue-50 border-blue-200 shadow-sm'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}>
                            <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                                checked={operations.products?.includes(key) || false}
                                onChange={() => toggleProduct(key)}
                            />
                            <span className={`text-sm ${operations.products?.includes(key) ? 'font-bold text-blue-800' : 'text-slate-600'}`}>
                                {info.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => setStep('location')}
                    className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2"
                >
                    ← Anterior
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#1E3A5F] hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                    Siguiente: Sensores →
                </button>
            </div>
        </div>
    );
};
