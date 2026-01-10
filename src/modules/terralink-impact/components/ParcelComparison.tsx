import React, { useEffect, useState } from 'react';
import { ParcelComparison as ComparisonType } from '../types/parcel.types';
import { NDVITimeSeries } from './NDVITimeSeries';
import { ImprovementMetrics } from './ImprovementMetrics';
import { VerificationBadge } from './VerificationBadge';
import { ParcelMap } from './ParcelMap';
import { parcelAnalysisService } from '../services/parcelAnalysisService';

interface ParcelComparisonProps {
    result: ComparisonType;
}

export const ParcelComparison: React.FC<ParcelComparisonProps> = ({ result }) => {
    const [terralinkImg, setTerralinkImg] = useState<string>('');
    const [controlImg, setControlImg] = useState<string>('');

    // Cargar imágenes visuales al montar
    useEffect(() => {
        const loadImages = async () => {
            // Usar la última fecha disponible
            const lastDate = result.terralink.ndviHistory[result.terralink.ndviHistory.length - 1]?.date;
            if (lastDate) {
                const tImg = await parcelAnalysisService.getParcelImage(result.terralink.parcel, lastDate);
                const cImg = await parcelAnalysisService.getParcelImage(result.control.parcel, lastDate);
                setTerralinkImg(tImg);
                setControlImg(cImg);
            }
        };
        loadImages();
    }, [result]);

    return (
        <div className="flex flex-col gap-6">

            {/* SECCION SUPERIOR: MAPA Y COMPARATIVA VISUAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                {/* Mapa Geoespacial */}
                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg relative">
                    <div className="absolute top-4 left-4 z-[400] bg-slate-900/80 backdrop-blur px-3 py-1 rounded border border-slate-700 text-xs text-white">
                        📍 Tlaxcala, México
                    </div>
                    <ParcelMap
                        terralink={result.terralink.parcel}
                        control={result.control.parcel}
                        date={result.timestamp}
                    />
                </div>

                {/* Comparativa Visual Directa */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col justify-center gap-6">
                    <h3 className="text-slate-400 text-sm uppercase tracking-widest text-center mb-2">Análisis Espectral Sentinel-2</h3>

                    <div className="flex gap-4 justify-center items-center">
                        {/* TerraLINK Box */}
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="relative w-40 h-40 bg-black rounded-lg overflow-hidden border-2 border-green-500 shadow-[0_0_20px_rgba(46,204,113,0.3)]">
                                {terralinkImg ?
                                    <img src={terralinkImg} className="w-full h-full object-cover" alt="Terralink NDVI" /> :
                                    <div className="w-full h-full flex items-center justify-center text-green-500 animate-pulse">🛰️ Cargando...</div>
                                }
                                <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-green-400 font-mono">
                                    NDVI {result.terralink.currentNDVI.toFixed(2)}
                                </div>
                            </div>
                            <span className="text-green-400 font-bold">TerraLINK Bio</span>
                        </div>

                        <div className="text-slate-600 font-bold text-2xl">VS</div>

                        {/* Control Box */}
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="relative w-40 h-40 bg-black rounded-lg overflow-hidden border-2 border-slate-600 opacity-80 group-hover:opacity-100 transition-opacity">
                                {controlImg ?
                                    <img src={controlImg} className="w-full h-full object-cover grayscale-[50%]" alt="Control NDVI" /> :
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 animate-pulse">🛰️ Cargando...</div>
                                }
                                <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-slate-300 font-mono">
                                    NDVI {result.control.currentNDVI.toFixed(2)}
                                </div>
                            </div>
                            <span className="text-slate-400 font-bold">Control Std</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCION MEDIA: METRICAS Y SERIES TEMPORALES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Métricas de Mejora (1 columna) */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col justify-between">
                    <h3 className="text-white font-bold mb-6">🚀 Mejora Verificada</h3>
                    <ImprovementMetrics data={result.improvement} />
                    <div className="mt-6 pt-6 border-t border-slate-700">
                        <VerificationBadge hash={result.verificationHash} timestamp={result.timestamp} />
                    </div>
                </div>

                {/* Gráfica Evolutiva (2 columnas) */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 lg:col-span-2">
                    <h3 className="text-white font-bold mb-4">📈 Evolución Fenológica Comparativa (6 Meses)</h3>
                    <NDVITimeSeries
                        terralinkHistory={result.terralink.ndviHistory}
                        controlHistory={result.control.ndviHistory}
                    />
                </div>
            </div>

        </div>
    );
};
