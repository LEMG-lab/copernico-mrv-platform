import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { PlantDetail } from '../types/plantDetail.types';
import { Map as MapIcon, Globe, Navigation as NavIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix generic marker icon
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapWithStreetViewProps {
    plant: PlantDetail;
}

type ViewMode = 'map' | 'satellite' | 'street';

export const MapWithStreetView: React.FC<MapWithStreetViewProps> = ({ plant }) => {
    const [mode, setMode] = useState<ViewMode>('map');
    const { lat, lng } = plant.location.coordinates;

    const renderContent = () => {
        switch (mode) {
            case 'map':
                return (
                    <MapContainer
                        center={[lat, lng]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lat, lng]} icon={customIcon}>
                            <Popup>
                                <div className="p-2 text-center">
                                    <h3 className="font-bold text-slate-900">{plant.name}</h3>
                                    <p className="text-xs text-slate-600">{plant.location.city}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                );
            case 'satellite':
                return (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center relative overflow-hidden">
                        {plant.images.satellite ? (
                            <img
                                src={plant.images.satellite}
                                alt="Vista Satelital"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-slate-400 text-center">
                                <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>Imagen satelital no disponible</p>
                            </div>
                        )}
                        <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded text-xs text-white backdrop-blur-sm">
                            Fuente: Copernicus Sentinel-2
                        </div>
                    </div>
                );
            case 'street':
                return (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        {/* This would be an official Google Maps Embed API in prod, using iframe for demo */}
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${lat},${lng}&heading=210&pitch=10&fov=35`}
                            className="w-full h-full"
                        >
                            <div className="flex flex-col items-center text-slate-400">
                                <NavIcon className="w-12 h-12 mb-2 opacity-50" />
                                <p>Vista StreetView (Requiere API Key válida)</p>
                            </div>
                        </iframe>
                    </div>
                );
        }
    };

    return (
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 h-[400px] flex flex-col relative group">
            <div className="absolute top-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md rounded-lg p-1 border border-slate-700 shadow-xl flex gap-1">
                <button
                    onClick={() => setMode('map')}
                    className={`p-2 rounded-md transition-all ${mode === 'map' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    title="Mapa"
                >
                    <MapIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setMode('satellite')}
                    className={`p-2 rounded-md transition-all ${mode === 'satellite' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    title="Satélite"
                >
                    <Globe className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setMode('street')}
                    className={`p-2 rounded-md transition-all ${mode === 'street' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    title="Street View"
                >
                    <NavIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 w-full h-full">
                {renderContent()}
            </div>
        </div>
    );
};
