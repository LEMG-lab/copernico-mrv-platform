import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Location } from '../types/viability.types';
import L from 'leaflet';

// Fix icons Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationPickerProps {
    onLocationSelect: (loc: Location) => void;
}

const LocationMarker: React.FC<{ setPosition: (pos: L.LatLng) => void }> = ({ setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });
    return null;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [citySearch, setCitySearch] = useState('');

    const handleConfirm = () => {
        if (position) {
            // Simulación de Reverse Geocoding
            onLocationSelect({
                lat: position.lat,
                lng: position.lng,
                country: "Mexico", // Hardcoded por simplicidad en demo
                region: "Jalisco",
                city: "Guadalajara", // Debería venir de API
                population: 5000000
            });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <label className="block text-sm font-bold text-slate-300 mb-2">Buscar Ciudad o Dirección</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        placeholder="Ej. Guadalajara, Jalisco..."
                        className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-bold">
                        Buscar
                    </button>
                </div>
            </div>

            <div className="h-[400px] rounded-xl overflow-hidden border border-slate-700 relative z-0">
                <MapContainer center={[20.65, -103.35]} zoom={5} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <LocationMarker setPosition={setPosition} />
                    {position && <Marker position={position} />}
                </MapContainer>

                {!position && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                        <div className="bg-slate-900/90 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700 text-sm">
                            Haz click en el mapa para seleccionar ubicación
                        </div>
                    </div>
                )}
            </div>

            {position && (
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex justify-between items-center">
                    <div>
                        <div className="text-xs text-blue-400 font-bold uppercase mb-1">Ubicación Seleccionada</div>
                        <div className="text-white font-mono text-sm">{position.lat.toFixed(4)}, {position.lng.toFixed(4)}</div>
                    </div>
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-900/50 animate-pulse"
                    >
                        Confirmar y Continuar →
                    </button>
                </div>
            )}
        </div>
    );
};
