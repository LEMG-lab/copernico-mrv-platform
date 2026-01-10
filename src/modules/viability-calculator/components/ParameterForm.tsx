import React, { useState } from 'react';
import { ProjectParameters, WasteSource, ProductType } from '../types/viability.types';

interface ParameterFormProps {
    initialData?: Partial<ProjectParameters>;
    onSubmit: (params: ProjectParameters) => void;
    onBack: () => void;
}

export const ParameterForm: React.FC<ParameterFormProps> = ({ initialData, onSubmit, onBack }) => {
    const [capacity, setCapacity] = useState(initialData?.capacity_tons_day || 50);
    const [sources, setSources] = useState<WasteSource[]>(initialData?.waste_sources || []);
    const [products, setProducts] = useState<ProductType[]>(initialData?.target_products || ['protein_meal', 'oil', 'frass']);

    const toggleSource = (source: WasteSource) => {
        setSources(prev => prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]);
    };

    const toggleProduct = (prod: ProductType) => {
        setProducts(prev => prev.includes(prod) ? prev.filter(p => p !== prod) : [...prev, prod]);
    };

    const handleSubmit = () => {
        onSubmit({
            capacity_tons_day: capacity,
            waste_sources: sources,
            target_products: products,
            has_land: true, // Default por brevedad UI
            has_capital: true,
            timeline: '1_year'
        });
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Capacidad Section */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Capacidad de Procesamiento Objetivo</h3>
                <div className="mb-6">
                    <input
                        type="range"
                        min="1" max="500"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer mb-4"
                    />
                    <div className="flex justify-between items-center">
                        <div className="bg-slate-900 border border-slate-600 px-4 py-2 rounded-lg text-2xl font-bold text-blue-400 font-mono">
                            {capacity} <span className="text-base font-normal text-slate-500">tons/día</span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-white uppercase">
                                {capacity < 10 ? 'Planta Piloto' : capacity < 100 ? 'Planta Mediana' : 'Planta Industrial'}
                            </div>
                            <div className="text-xs text-slate-400">
                                Equivalente a residuos de ~{(capacity * 3000).toLocaleString()} personas
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid: Fuentes y Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Fuentes */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Fuentes de Residuos</h3>
                    <div className="space-y-2">
                        {[
                            { id: 'food_markets', label: 'Centrales de Abasto' },
                            { id: 'restaurants', label: 'Restaurantes y Hoteles' },
                            { id: 'agroindustry', label: 'Agroindustria' },
                            { id: 'municipality', label: 'Recolección Municipal' },
                        ].map((item) => (
                            <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 hover:bg-slate-700/50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={sources.includes(item.id as WasteSource)}
                                    onChange={() => toggleSource(item.id as WasteSource)}
                                    className="rounded border-slate-500 bg-slate-900 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-slate-200">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Productos */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Productos a Comercializar</h3>
                    <div className="space-y-2">
                        {[
                            { id: 'protein_meal', label: 'Harina de Proteína (Alimento)' },
                            { id: 'frass', label: 'Frass (Biofertilizante)' },
                            { id: 'oil', label: 'Aceite de Insecto' },
                            { id: 'carbon_credits', label: 'Créditos de Carbono' },
                        ].map((item) => (
                            <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-700 hover:bg-slate-700/50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    checked={products.includes(item.id as ProductType)}
                                    onChange={() => toggleProduct(item.id as ProductType)}
                                    className="rounded border-slate-500 bg-slate-900 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-slate-200">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-xl border border-slate-600 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
                >
                    ← Atrás
                </button>
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-900/40 transition-all transform hover:scale-[1.02]"
                >
                    Analizar Viabilidad del Proyecto 🚀
                </button>
            </div>
        </div>
    );
};
