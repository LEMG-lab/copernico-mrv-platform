import React from 'react';

interface BlockchainRegistryProps {
    hash: string;
    timestamp: string;
    status: 'pending' | 'verifying' | 'verified';
    txHash?: string;
    blockNumber?: number;
    onVerify: () => void;
}

export const BlockchainRegistry: React.FC<BlockchainRegistryProps> = ({
    hash,
    timestamp,
    status = 'pending',
    txHash,
    blockNumber,
    onVerify
}) => {
    return (
        <div className="mt-8 pt-6 border-t border-slate-700">
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>Registro Immutable (LarvaLINK Chain)</span>
                {status === 'verified' && <span className="text-green-500 text-[10px] border border-green-500/50 px-1 rounded">verificado</span>}
            </h4>

            <div className="bg-slate-900/50 p-4 rounded border border-slate-700/50 font-mono text-xs flex flex-col md:flex-row justify-between md:items-center gap-4 relative overflow-hidden">
                {/* Background Pattern for Verified */}
                {status === 'verified' && (
                    <div className="absolute inset-0 bg-green-900/5 pointer-events-none"></div>
                )}

                <div className="flex-1 space-y-2 z-10">
                    <div>
                        <div className="text-slate-500 mb-1 flex items-center gap-1">
                            Hash de Integridad (SHA-256)
                            {status === 'pending' && <span className="text-yellow-500 text-[10px] ml-2">⚠ Pendiente de firma</span>}
                        </div>
                        <div className={`break-all ${status === 'verified' ? 'text-green-400' : 'text-slate-400'}`}>
                            {hash}
                        </div>
                    </div>

                    {status === 'verified' && txHash && (
                        <div className="pt-2 border-t border-slate-800/50">
                            <div className="text-slate-500 mb-1">Transaction Hash (L2 Rollup)</div>
                            <div className="text-blue-400 break-all">{txHash}</div>
                        </div>
                    )}
                </div>

                <div className="text-right md:min-w-[200px] z-10 flex flex-col items-end gap-2">
                    <div>
                        <div className="text-slate-500 mb-1">Timestamp UTC</div>
                        <div className="text-slate-300">{new Date(timestamp).toUTCString()}</div>
                    </div>

                    {status === 'verified' && blockNumber && (
                        <div>
                            <div className="text-slate-500 mb-1">Bloque #</div>
                            <div className="text-slate-300">#{blockNumber}</div>
                        </div>
                    )}

                    <div className="mt-2">
                        {status === 'pending' && (
                            <button
                                onClick={onVerify}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-[10px] font-bold tracking-wide transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
                            >
                                ⛓ FIRMAR Y VERIFICAR
                            </button>
                        )}

                        {status === 'verifying' && (
                            <div className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded text-[10px] font-bold flex items-center gap-2 border border-slate-600">
                                <span className="w-3 h-3 border-2 border-t-white border-slate-600 rounded-full animate-spin"></span>
                                CONFIRMANDO TX...
                            </div>
                        )}

                        {status === 'verified' && (
                            <a href="#" className="text-blue-400 hover:text-blue-300 inline-block text-[10px] flex items-center gap-1 justify-end">
                                <span>↗</span> Ver en Explorer
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
