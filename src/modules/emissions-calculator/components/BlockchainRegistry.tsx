import React from 'react';

interface BlockchainRegistryProps {
    hash: string;
    timestamp: string;
}

export const BlockchainRegistry: React.FC<BlockchainRegistryProps> = ({ hash, timestamp }) => {
    return (
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">
                Registro Immutable (LarvaLINK Chain)
            </h4>
            <div className="bg-slate-900/50 p-4 rounded border border-slate-700/50 font-mono text-xs flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <div className="text-slate-500 mb-1">Hash de Verificación SHA-256</div>
                    <div className="text-green-500 break-all">{hash}</div>
                </div>
                <div className="text-right md:min-w-[200px]">
                    <div className="text-slate-500 mb-1">Timestamp UTC</div>
                    <div className="text-slate-300">{new Date(timestamp).toUTCString()}</div>
                    <a href="#" className="text-blue-400 hover:text-blue-300 mt-1 inline-block text-[10px]">
                        ↗ Ver en Explorador de Bloques
                    </a>
                </div>
            </div>
        </div>
    );
};
