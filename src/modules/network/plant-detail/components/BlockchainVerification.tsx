import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { ShieldCheck, Link as LinkIcon, ExternalLink, Activity, Database } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BlockchainVerificationProps {
    plant: PlantDetail;
}

export const BlockchainVerification: React.FC<BlockchainVerificationProps> = ({ plant }) => {
    const { blockchain } = plant;

    return (
        <section className="bg-slate-900 border-y border-slate-800 py-12 mb-12 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium mb-6">
                            <ShieldCheck className="w-4 h-4" />
                            Verificación Inmutable
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Transparencia Radical con Blockchain
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Cada tonelada de residuo procesado y cada kilogramo de CO2 evitado se registra de forma inmutable en la red <strong>{blockchain.network}</strong>.
                            Esto garantiza la trazabilidad total desde la recolección hasta la transformación final.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                    <Database className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Smart Contract</h4>
                                    <a
                                        href={blockchain.explorer_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-1 mt-1 font-mono"
                                    >
                                        {blockchain.contract_address}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                    <Activity className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Última Verificación</h4>
                                    <p className="text-slate-400 text-sm mt-1">
                                        {format(new Date(blockchain.last_verification), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                                    </p>
                                    <div className="text-xs text-slate-500 mt-1 font-mono break-all">
                                        Hash: {blockchain.verification_hash.substring(0, 24)}...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Viz / Animation placeholder */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
                        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 relative z-10">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                                <span className="text-slate-400 font-medium">Estado del Nodo</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-green-500 text-sm font-bold">Sincronizado</span>
                                </div>
                            </div>

                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>Bloque Actual:</span>
                                    <span className="text-blue-400">#18,245,902</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Transacciones Totales:</span>
                                    <span className="text-white">{blockchain.total_transactions}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Gas Promedio:</span>
                                    <span className="text-slate-500">1.2 Gwei</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-700">
                                <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                                    <LinkIcon className="w-4 h-4" />
                                    Ver en Explorador de Bloques
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
