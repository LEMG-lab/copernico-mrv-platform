import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { LocationPicker } from './LocationPicker';

export const Step2Location: React.FC = () => {
    const { location, updateLocation, setStep, saveProgress } = useOnboarding();

    const handleLocationSelect = (lat: number, lng: number) => {
        updateLocation({
            coordinates: { lat, lng },
            country: 'Mexico', // Autodetect mock
            website: 'Americas/Mexico_City' // timezone mock field reuse or add timezone to type if needed. Type has timezone.
        });
        // Also update address fields with mock reverse geocode if needed
    };

    const handleNext = () => {
        if (!location.address || !location.city || !location.coordinates) {
            alert("Por favor completa la dirección y ubicación en el mapa.");
            return;
        }
        saveProgress();
        setStep('operations');
    };

    return (
        <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Ubicación de la Planta</h2>
            <p className="text-slate-500 mb-6">Necesitamos la ubicación exacta para la verificación satelital.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Map Column */}
                <div className="order-2 lg:order-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pinpoint Exacto *</label>
                    <LocationPicker
                        lat={location.coordinates?.lat}
                        lng={location.coordinates?.lng}
                        onLocationSelect={handleLocationSelect}
                    />
                    <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg mt-4 flex items-start gap-2">
                        <span className="text-lg">🛰️</span>
                        <p>Usaremos estas coordenadas para obtener imágenes satelitales históricas de Sentinel-2 y verificar la existencia de la infraestructura.</p>
                    </div>
                </div>

                {/* Form Column */}
                <div className="order-1 lg:order-2 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Dirección Calle y Número *</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                            value={location.address || ''}
                            onChange={(e) => updateLocation({ address: e.target.value })}
                            placeholder="Ej. Carretera Federal 45 Km 10"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Ciudad *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={location.city || ''}
                                onChange={(e) => updateLocation({ city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Estado / Provincia *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={location.state || ''}
                                onChange={(e) => updateLocation({ state: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Código Postal *</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-slate-300 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                value={location.postal_code || ''}
                                onChange={(e) => updateLocation({ postal_code: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">País</label>
                            <input
                                type="text"
                                disabled
                                className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-500 shadow-sm cursor-not-allowed"
                                value={location.country || 'México'}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => setStep('basic_info')}
                    className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2"
                >
                    ← Anterior
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#1E3A5F] hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                    Siguiente: Operaciones →
                </button>
            </div>
        </div>
    );
};
