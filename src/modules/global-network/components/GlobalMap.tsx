import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NetworkFilters, LarvaLinkPlant, ThirdPartyPlant, MethaneHotspot } from '../types/network.types';
import { LARVALINK_PLANTS } from '../data/larvalinkPlants';
import { THIRD_PARTY_BSF_PLANTS } from '../data/thirdPartyPlants';
import { METHANE_HOTSPOTS } from '../data/methaneHotspots';

// Fix Leaflet icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos personalizados usando HTML/CSS
const createCustomIcon = (color: string, size: number = 24, pulsing: boolean = false) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 10px ${color};
      ${pulsing ? 'animation: pulse-ring 2s infinite;' : ''}
    "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2]
    });
};

const larvaLinkIcon = createCustomIcon('#2ECC71', 18, true);
const thirdPartyIcon = createCustomIcon('#3498DB', 14, false);
const hotspotIcon = createCustomIcon('#E74C3C', 30, true); // Más grande y pulsante

interface GlobalMapProps {
    filters: NetworkFilters;
}

export const GlobalMap: React.FC<GlobalMapProps> = ({ filters }) => {
    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-slate-700 relative z-0">
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%', background: '#0F172A' }}
                minZoom={2}
                className="z-0"
            >
                {/* Dark Mode Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Hotspots (Metano) */}
                {filters.showHotspots && METHANE_HOTSPOTS.map((hotspot, idx) => (
                    <React.Fragment key={`hotspot-${idx}`}>
                        {/* Visualización de la nube de metano (simulada) */}
                        <CircleMarker
                            center={[hotspot.coordinates.lat, hotspot.coordinates.lng]}
                            radius={40}
                            pathOptions={{
                                color: 'transparent',
                                fillColor: '#E74C3C',
                                fillOpacity: 0.2
                            }}
                        />
                        <Marker
                            position={[hotspot.coordinates.lat, hotspot.coordinates.lng]}
                            icon={hotspotIcon}
                        >
                            <Popup className="custom-popup bg-slate-800 text-white">
                                <div className="p-2 min-w-[200px]">
                                    <h3 className="font-bold text-red-400 mb-1">🔥 Hotspot Detectado</h3>
                                    <div className="text-lg font-bold text-white mb-2">{hotspot.name}</div>
                                    <div className="text-xs text-slate-300 mb-2">{hotspot.opportunity}</div>
                                    <div className="bg-red-900/50 p-2 rounded border border-red-500/30 text-red-200 text-xs font-mono">
                                        Anomalía CH4: {hotspot.ch4_anomaly}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}

                {/* Plantas LarvaLINK */}
                {filters.showLarvaLink && LARVALINK_PLANTS.map((plant) => (
                    <Marker
                        key={plant.id}
                        position={[plant.coordinates.lat, plant.coordinates.lng]}
                        icon={larvaLinkIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2 min-w-[200px]">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-green-400">LarvaLINK {plant.name}</h3>
                                    {plant.verified && <span className="text-[10px] bg-green-500/20 text-green-400 px-1 rounded border border-green-500/30">VERIFICADA</span>}
                                </div>
                                <div className="text-xs text-slate-300 space-y-1">
                                    <div>Status: <span className="uppercase font-bold">{plant.status}</span></div>
                                    <div>Capacidad: <b>{plant.capacity_tons_day} tons/día</b></div>
                                    <div>CO2eq Evitado: <b>{plant.co2eq_avoided_ytd} tons</b></div>
                                </div>
                                {plant.blockchain_hash && (
                                    <div className="mt-2 pt-2 border-t border-slate-700 text-[10px] text-slate-500 font-mono truncate">
                                        Hash: {plant.blockchain_hash.substring(0, 16)}...
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Plantas Terceros */}
                {filters.showThirdParty && THIRD_PARTY_BSF_PLANTS.map((plant, idx) => (
                    <Marker
                        key={`tp-${idx}`}
                        position={[plant.coordinates.lat, plant.coordinates.lng]}
                        icon={thirdPartyIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2">
                                <h3 className="font-bold text-blue-400 mb-1">Planta BSF (Tercero)</h3>
                                <div className="font-bold text-white mb-1">{plant.name}</div>
                                <div className="text-xs text-slate-400">
                                    Capacidad Est.: {plant.capacity_tons_day} t/d
                                    <br />
                                    Fuente: {plant.source}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

            {/* Leyenda Superpuesta */}
            <div className="absolute bottom-6 right-6 z-[1000] bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl text-xs space-y-3 shadow-xl">
                <div className="font-bold text-slate-300 border-b border-slate-700 pb-1 mb-2">Simbología</div>

                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2ECC71] border border-white shadow-[0_0_8px_#2ECC71]"></div>
                    <span className="text-slate-300">Red LarvaLINK</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#3498DB] border border-white"></div>
                    <span className="text-slate-300">Otros Operadores BSF</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#E74C3C] border border-white opacity-50 flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#E74C3C] rounded-full animate-ping"></div>
                    </div>
                    <span className="text-slate-300">Hotspots Metano (Oportunidad)</span>
                </div>
            </div>
        </div>
    );
};
