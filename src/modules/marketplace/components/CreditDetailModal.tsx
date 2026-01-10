import React from 'react';
import { Credit } from '../types/marketplace.types';

interface CreditDetailModalProps {
    credit: Credit;
    onClose: () => void;
}

export const CreditDetailModal: React.FC<CreditDetailModalProps> = ({ credit, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-[#0F172A] border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row animate-fade-in-up">

                <buttononClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10">
                ✕
            </button>

            {/* Left Column: Visuals */}
            <div className="md:w-1/3 bg-slate-800 p-6 flex flex-col gap-6">
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 relative border border-slate-700 group">
                    {/* Simulated Satellite View */}
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-98.845,19.575,15,0/600x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsIn0.Kn')] bg-cover bg-center opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>

                    <div className="absolute bottom-4 left-4">
                        <div className="text-xs font-bold text-green-400 mb-1 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            En Vivo
                        </div>
                        <div className="text-white font-bold text-lg">{credit.plant.name}</div>
                        <div className="text-slate-400 text-xs">{credit.plant.region}, {credit.plant.country}</div>
                    </div>
                </div>

                {/* Verification Badges */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Prueba de Impacto</h4>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">Nivel</span>
                            <span className="text-green-400 font-bold bg-green-900/30 px-2 py-0.5 rounded border border-green-500/30">
                                {credit.verification.level === 'full' ? 'AUDITADO 3RO' : 'VERIFICADO'}
                            </span>
                        </div>

                        <div className="border-t border-slate-700 pt-2">
                            <div className="text-[10px] text-slate-500 font-mono mb-1">Hash Satelital (Sentinel-2)</div>
                            <div className="text-[10px] text-slate-300 font-mono bg-slate-950 p-1.5 rounded truncate">
                                {credit.verification.satellite_hash}
                            </div>
                        </div>

                        {credit.verification.iot_hash && (
                            <div>
                                <div className="text-[10px] text-slate-500 font-mono mb-1">Hash Sensores IoT</div>
                                <div className="text-[10px] text-slate-300 font-mono bg-slate-950 p-1.5 rounded truncate">
                                    {credit.verification.iot_hash}
                                </div>
                            </div>
                        )}

                        <div className="text-xs text-center pt-2">
                            <a href="#" className="text-blue-400 hover:text-blue-300 underline decoration-dotted">
                                Verificar en Global Force Chain ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Details & Purchase */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded text-xs font-bold uppercase">
                                Vintage {credit.vintage}
                            </span>
                            <span className="text-slate-500 text-xs">ID: {credit.id}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-1">Créditos {credit.type === 'carbon' ? 'de Carbono' : credit.type} Certificados</h2>
                        <p className="text-slate-400 text-sm">Metodología: <span className="text-slate-200">{credit.verification.methodology}</span></p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-blue-400">${credit.price_per_unit}</div>
                        <div className="text-slate-500 text-xs uppercase font-bold">USD / {credit.unit}</div>
                    </div>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-white">{credit.quantity.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Disponibles</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-white">{credit.plant.rating} ★</div>
                        <div className="text-[10px] text-slate-400 uppercase">Rating Planta</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-white">{credit.metadata.sdg_alignment.length}</div>
                        <div className="text-[10px] text-slate-400 uppercase">ODS Impactados</div>
                    </div>
                </div>

                {/* SDGs */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-white mb-3">Objetivos de Desarrollo Sostenible (ODS)</h3>
                    <div className="flex gap-2">
                        {credit.metadata.sdg_alignment.map(sdg => (
                            <div key={sdg} className="w-10 h-10 rounded bg-white text-slate-900 font-bold flex items-center justify-center text-sm shadow-lg" title={`ODS ${sdg}`}>
                                {sdg}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1"></div>

                {/* Purchase Action */}
                <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-300 font-medium">Cantidad a comprar</span>
                        <div className="flex items-center gap-2">
                            <input type="number" defaultValue="100" className="bg-slate-900 border border-slate-600 rounded p-1 text-white w-20 text-center font-mono" />
                            <span className="text-slate-500 text-sm">{credit.unit}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-700 mb-4">
                        <span className="text-slate-400">Total Estimado</span>
                        <span className="text-2xl font-bold text-white">$2,800.00 USD</span>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-colors shadow-lg shadow-blue-900/20">
                            Comprar Créditos
                        </button>
                        <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold border border-slate-600 transition-colors">
                            🛒
                        </button>
                    </div>
                    <div className="text-center mt-3 text-[10px] text-slate-500">
                        Transacción segura vía Stripe o Cripto (USDC). Comisión incluye cert. digital.
                    </div>
                </div>

            </div>
        </div>
    </div >
  );
};
