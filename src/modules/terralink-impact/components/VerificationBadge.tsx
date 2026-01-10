import React from 'react';

interface VerificationBadgeProps {
    hash: string;
    timestamp: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ hash, timestamp }) => {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 font-mono text-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-bl">
                VERIFICADO
            </div>

            <div className="flex flex-col gap-2">
                <div>
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Blockchain Hash (SHA-256)</span>
                    <div className="flex items-center gap-2 text-green-400 break-all">
                        <span className="text-lg">🔒</span>
                        {hash}
                    </div>
                </div>

                <div className="flex justify-between text-xs text-slate-400 border-t border-slate-700 pt-2 mt-1">
                    <span>📅 Timestamp: {new Date(timestamp).toLocaleString()}</span>
                    <span>🛰️ Fuente: Copernicus Sentinel-2 L2A</span>
                    <span>✅ Registro: Global Force MRV</span>
                </div>
            </div>

            {/* Efecto de brillo al pasar mouse */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
        </div>
    );
};
