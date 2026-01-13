import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NetworkFilters, LarvaLinkPlant, ThirdPartyPlant, MethaneHotspot } from '../types/network.types';
import { LARVALINK_PLANTS } from '../data/larvalinkPlants';
import { THIRD_PARTY_BSF_PLANTS } from '../data/thirdPartyPlants';
import { METHANE_HOTSPOTS } from '../data/methaneHotspots';
import { GLOBAL_PLANTS } from '../data/globalPlants';
import { StreetViewViewer } from './StreetViewViewer';
import { mrvService } from '../../../services/mrvService';
import { notificationService } from '../../../services/notificationService';

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

import { PlantLocation } from '../data/globalPlants';

interface GlobalMapProps {
    filters: NetworkFilters;
    plants?: PlantLocation[];
    onPlantClick?: (plant: PlantLocation) => void;
}

export const GlobalMap: React.FC<GlobalMapProps> = ({ filters, plants, onPlantClick }) => {
    const [streetViewTarget, setStreetViewTarget] = useState<{ lat: number, lng: number } | null>(null);
    const [liveHotspots, setLiveHotspots] = useState<MethaneHotspot[]>(METHANE_HOTSPOTS);
    const alertSentRef = React.useRef(false);

    useEffect(() => {
        const fetchHotspotData = async () => {
            console.log('[GlobalMap] Buscando datos satelitales frescos para hotspots...');
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const updatedHotspots = await Promise.all(METHANE_HOTSPOTS.map(async (hotspot) => {
                // Pequeño bbox alrededor del punto (aprox 10km)
                const offset = 0.05;
                const bbox = [
                    hotspot.coordinates.lng - offset,
                    hotspot.coordinates.lat - offset,
                    hotspot.coordinates.lng + offset,
                    hotspot.coordinates.lat + offset
                ];

                const stats = await mrvService.getMethaneStats(bbox, startDate, endDate);

                // Solo añadir si encontramos datos válidos (mean > 0)
                if (stats.mean > 0) {
                    return {
                        ...hotspot,
                        live_data: {
                            ...stats,
                            last_updated: endDate
                        }
                    };
                }
                return hotspot;
            }));

            setLiveHotspots(updatedHotspots);

            // Check for Alerts
            const criticalHotspots = updatedHotspots.filter(h => h.live_data && h.live_data.mean > 1900);
            if (criticalHotspots.length > 0 && !alertSentRef.current) {
                const message = `🚨 ALERTA CRÍTICA DE METANO 🚨\n\nSe han detectado ${criticalHotspots.length} hotspots con concentraciones extremas (>1900 ppb).\n\nUbicación Principal: ${criticalHotspots[0].name}\nNivel: ${criticalHotspots[0].live_data?.mean.toFixed(2)} ppb\nAnomalía: Extrema\n\nVerificar inmediatamente en Dashboard.`;

                console.log("[GlobalMap] Triggering Alert:", message);
                await notificationService.broadcastAlert("ALERTA CRÍTICA METANO - COPERNICO", message);
                alertSentRef.current = true; // Prevent spam per session
            }
        };

        // Solo ejecutar si los hotspots están visibles para ahorrar requests
        if (filters.showHotspots) {
            fetchHotspotData();
        }
    }, [filters.showHotspots]);

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
                {/* Hotspots (Metano) */}
                {filters.showHotspots && liveHotspots.map((hotspot, idx) => (
                    <React.Fragment key={`hotspot-${idx}`}>
                        <CircleMarker
                            center={[hotspot.coordinates.lat, hotspot.coordinates.lng]}
                            radius={40}
                            pathOptions={{
                                color: 'transparent',
                                fillColor: '#E74C3C',
                                fillOpacity: 0.2
                            }}
                        />
                        {/* Sentinel-5P Methane Overlay (Simulated via Circle for MVP stability, can be upgraded to ImageOverlay with real Blob) */}
                        <CircleMarker
                            center={[hotspot.coordinates.lat, hotspot.coordinates.lng]}
                            radius={20}
                            pathOptions={{ fillColor: '#FF0', color: 'red', fillOpacity: 0.1 }}
                        />

                        <Marker
                            position={[hotspot.coordinates.lat, hotspot.coordinates.lng]}
                            icon={hotspotIcon}
                        >
                            <Popup className="custom-popup bg-slate-800 text-white">
                                <div className="p-2 min-w-[200px]">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-red-400">🔥 Hotspot Detectado</h3>
                                        {hotspot.live_data && (
                                            <span className="animate-pulse text-[10px] bg-red-500 font-bold px-1 rounded text-white">LIVE</span>
                                        )}
                                    </div>
                                    <div className="text-lg font-bold text-white mb-2">{hotspot.name}</div>
                                    <div className="text-xs text-slate-300 mb-2">{hotspot.opportunity}</div>
                                    <div className="bg-slate-900 p-2 rounded mb-2 w-full h-32 relative overflow-hidden border border-slate-700">
                                        {/* Placeholder for fetching real image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-500">
                                            Cargando datos satelitales...
                                        </div>
                                        <img
                                            src={`https://services.sentinel-hub.com/ogc/wms/bd875d85-8025-45d4-83f5-621535496660?SERVICE=WMS&REQUEST=GetMap&SHOWLOGO=false&VERSION=1.3.0&LAYERS=CH4-IN-TROPOSPHERE&CRS=CRS:84&BBOX=${hotspot.coordinates.lng - 0.1},${hotspot.coordinates.lat - 0.1},${hotspot.coordinates.lng + 0.1},${hotspot.coordinates.lat + 0.1}&WIDTH=300&HEIGHT=150&FORMAT=image/png`}
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
                                            alt="Sentinel-5P Data"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>

                                    {hotspot.live_data ? (
                                        <div className="bg-red-900/50 p-2 rounded border border-red-500/30 text-red-200 text-xs font-mono">
                                            <div className="border-b border-red-800/50 pb-1 mb-1 text-[10px] text-red-300">
                                                SENTINEL-5P (Últimos 30d):
                                            </div>
                                            <div>Concentración Media: <span className="font-bold text-white">{hotspot.live_data.mean.toFixed(2)} ppb</span></div>
                                            <div>Máximo Detectado: <span className="font-bold text-white">{hotspot.live_data.max.toFixed(2)} ppb</span></div>
                                        </div>
                                    ) : (
                                        <div className="bg-red-900/50 p-2 rounded border border-red-500/30 text-red-200 text-xs font-mono">
                                            Anomalía CH4: {hotspot.ch4_anomaly} (Histórico)
                                        </div>
                                    )}
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
                                    {plant.city && <div>📍 {plant.city}, {plant.country}</div>}
                                    <div>Status: <span className="uppercase font-bold">{plant.status}</span></div>
                                    <div>Capacidad: <b>{plant.capacity_tons_day} tons/día</b></div>
                                    <div>CO2eq Evitado: <b>{plant.co2eq_avoided_ytd} tons</b></div>
                                </div>
                                {plant.blockchain_hash && (
                                    <div className="mt-2 pt-2 border-t border-slate-700 text-[10px] text-slate-500 font-mono truncate">
                                        Hash: {plant.blockchain_hash.substring(0, 16)}...
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setStreetViewTarget({ lat: plant.coordinates.lat, lng: plant.coordinates.lng });
                                    }}
                                    className="mt-2 text-[10px] w-full bg-slate-700 hover:bg-slate-600 text-white py-1 rounded transition-colors flex items-center justify-center gap-1"
                                >
                                    <span>📍</span> Ver en Street View
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onPlantClick && onPlantClick({
                                            ...plant,
                                            type: 'partner',
                                            coordinates: [plant.coordinates.lat, plant.coordinates.lng],
                                            capacity: plant.capacity_tons_day,
                                            // @ts-ignore
                                            status: plant.status === 'operativa' ? 'operating' : plant.status === 'construccion' ? 'construction' : 'planned'
                                        } as any);
                                    }}
                                    className="mt-2 text-[10px] w-full bg-emerald-600 hover:bg-emerald-500 text-white py-1 rounded transition-colors flex items-center justify-center gap-1 font-bold"
                                >
                                    <span>🏭</span> Ver Planta
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Plantas del Store (Editables) */}
                {filters.showThirdParty && plants && plants.map((plant) => (
                    <Marker
                        key={plant.id}
                        position={[plant.coordinates[0], plant.coordinates[1]]}
                        icon={plant.type === 'partner' ? larvaLinkIcon : thirdPartyIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2 min-w-[180px]">
                                <h3 className={`font-bold mb-1 ${plant.type === 'partner' ? 'text-green-400' : 'text-blue-400'}`}>
                                    {plant.name}
                                </h3>
                                <div className="text-xs text-slate-300 space-y-1">
                                    <div>Tipo: <span className="capitalize">{plant.type}</span></div>
                                    <div>Ciudad: {plant.city}, {plant.country}</div>
                                    <div>Estatus: <span className="uppercase font-bold text-slate-200">{plant.status}</span></div>
                                    <div>Capacidad: <b>{plant.capacity} t/d</b></div>
                                    <div className="text-[10px] text-slate-500 mt-1">
                                        Lat: {plant.coordinates[0].toFixed(2)}, Lng: {plant.coordinates[1].toFixed(2)}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setStreetViewTarget({ lat: plant.coordinates[0], lng: plant.coordinates[1] });
                                        }}
                                        className="mt-2 text-[10px] w-full bg-slate-700 hover:bg-slate-600 text-white py-1 rounded transition-colors flex items-center justify-center gap-1"
                                    >
                                        <span>📍</span> Street View
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onPlantClick && onPlantClick(plant);
                                        }}
                                        className="mt-2 text-[10px] w-full bg-emerald-600 hover:bg-emerald-500 text-white py-1 rounded transition-colors flex items-center justify-center gap-1 font-bold"
                                    >
                                        <span>🏭</span> Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Plantas Terceros (Legacy List) */}
                {filters.showThirdParty && THIRD_PARTY_BSF_PLANTS.map((plant, idx) => (
                    <Marker
                        key={`tp-legacy-${idx}`}
                        position={[plant.coordinates.lat, plant.coordinates.lng]}
                        icon={thirdPartyIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2">
                                <h3 className="font-bold text-blue-400 mb-1">Planta BSF (Analizada)</h3>
                                <div className="font-bold text-white mb-1">{plant.name}</div>
                                <div className="text-xs text-slate-400">
                                    Capacidad Est.: {plant.capacity_tons_day} t/d
                                    <br />
                                    Fuente: {plant.source}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setStreetViewTarget({ lat: plant.coordinates.lat, lng: plant.coordinates.lng });
                                    }}
                                    className="mt-2 text-[10px] w-full bg-slate-700 hover:bg-slate-600 text-white py-1 rounded transition-colors flex items-center justify-center gap-1"
                                >
                                    <span>📍</span> Street View
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

            {/* Leyenda Superpuesta */}
            <div className="absolute bottom-2 right-2 lg:bottom-6 lg:right-6 z-[1000] bg-slate-900/90 backdrop-blur border border-slate-700 p-2 lg:p-4 rounded-xl text-[10px] lg:text-xs space-y-2 lg:space-y-3 shadow-xl max-w-[140px] lg:max-w-none">
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

            {streetViewTarget && (
                <StreetViewViewer
                    lat={streetViewTarget.lat}
                    lng={streetViewTarget.lng}
                    onClose={() => setStreetViewTarget(null)}
                />
            )}
        </div>
    );
};
