import React from 'react';

interface LocationPickerProps {
    lat?: number;
    lng?: number;
    onLocationSelect: (lat: number, lng: number) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ lat, lng, onLocationSelect }) => {
    return (
        <div className="bg-slate-100 rounded-xl h-64 w-full flex items-center justify-center relative overflow-hidden border-2 border-dashed border-slate-300 group cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => onLocationSelect(19.4326, -99.1332)} // Simular selección CDMX al click
        >
            {lat && lng ? (
                <div className="bg-slate-200 w-full h-full flex flex-col items-center justify-center">
                    <div className="text-4xl">📍</div>
                    <div className="text-xs font-mono text-slate-600 mt-2 bg-white/80 px-2 py-1 rounded">
                        {lat.toFixed(4)}, {lng.toFixed(4)}
                    </div>
                    <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
                </div>
            ) : (
                <div className="text-center text-slate-500">
                    <div className="text-4xl mb-2 opacity-50">🗺️</div>
                    <p className="font-bold">Haz click para seleccionar ubicación en el mapa</p>
                    <p className="text-xs">(Simulación)</p>
                </div>
            )}
        </div>
    )
}
