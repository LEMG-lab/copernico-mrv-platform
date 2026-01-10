import React from 'react';
import { Plant, RegionalMethane } from '../types/emissions.types';
import { useRegionalMethane } from '../hooks/useRegionalMethane';

interface MethaneMapContextProps {
    plant: Plant;
}

export const MethaneMapContext: React.FC<MethaneMapContextProps> = ({ plant }) => {
    const { data, loading } = useRegionalMethane(plant);

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center justify-between">
                <span>🛰️ Contexto Regional (Sentinel-5P)</span>
                <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-700">Producto: L2__CH4___</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                {/* Placeholder del Mapa - En producción sería un MapContainer de Leaflet con WMS Layer */}
                <div className="bg-black/50 rounded-lg aspect-video relative overflow-hidden group border border-slate-600">
                    {/* Generamos un gradiente simulando mapa de calor de metano */}
                    <div className="absolute inset-0 bg-opacity-50 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,0,0.4),_rgba(255,165,0,0.2),_transparent)]"></div>

                    {/* Marker de la planta */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div>
                        <span className="text-xs text-white bg-black/70 px-1 rounded mt-1">{plant.name}</span>
                    </div>

                    <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-mono">
                        Sentinel-5P TROPOMI
                    </div>
                </div>

                {/* Datos Atmosféricos */}
                <div>
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                            <div className="h-8 bg-slate-700 rounded w-1/2"></div>
                        </div>
                    ) : data ? (
                        <div className="space-y-4">
                            <div>
                                <div className="text-slate-400 text-xs uppercase tracking-wider">Metano Atmosférico Regional</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-white">{data.value_ppb}</span>
                                    <span className="text-sm text-slate-400">ppb</span>
                                </div>
                                <div className="text-xs text-slate-500">Promedio mixing ratio (partes por billón)</div>
                            </div>

                            <div className={`p-3 rounded border ${data.anomaly < 0 ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                                <div className="text-xs text-slate-400 mb-1">Tendencia vs. Promedio Histórico</div>
                                <div className={`font-bold ${data.anomaly < 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {data.anomaly > 0 ? '+' : ''}{data.anomaly}%
                                </div>
                            </div>

                            <div className="text-[10px] text-slate-500 italic border-t border-slate-700 pt-2">
                                * Nota: El satélite Sentinel-5P monitorea concentraciones atmosféricas regionales (resolución 7x5.5km).
                                No mide emisiones puntuales de la planta, sino la calidad del aire del ecosistema circundante.
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-400 text-sm">Error cargando datos satelitales.</div>
                    )}
                </div>

            </div>
        </div>
    );
};
