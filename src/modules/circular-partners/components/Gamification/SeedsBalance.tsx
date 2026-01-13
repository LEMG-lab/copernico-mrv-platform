import React from 'react';
import { Sprout, TrendingUp, Gift, History } from 'lucide-react';
import { SeedsTransaction } from '../../types/partners.types';

interface SeedsBalanceProps {
    balance: number;
    lifetimeEarned: number;
    lifetimeRedeemed: number;
    recentTransactions?: SeedsTransaction[];
    compact?: boolean;
}

const formatNumber = (n: number): string => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
};

export const SeedsBalance: React.FC<SeedsBalanceProps> = ({
    balance,
    lifetimeEarned,
    lifetimeRedeemed,
    recentTransactions = [],
    compact = false
}) => {
    if (compact) {
        return (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                <Sprout className="w-5 h-5 text-green-400" />
                <span className="font-bold text-green-400">{formatNumber(balance)}</span>
                <span className="text-xs text-green-300/70">semillas</span>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            {/* Main Balance */}
            <div className="p-5 text-center bg-gradient-to-br from-green-900/30 to-emerald-900/30">
                <Sprout className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <div className="text-4xl font-black text-green-400 mb-1">
                    {formatNumber(balance)}
                </div>
                <div className="text-green-300/70 text-sm">semillas disponibles</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 divide-x divide-slate-700 border-b border-slate-700">
                <div className="p-4 text-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <div className="font-bold text-white">{formatNumber(lifetimeEarned)}</div>
                    <div className="text-[10px] text-slate-500 uppercase">Ganadas total</div>
                </div>
                <div className="p-4 text-center">
                    <Gift className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                    <div className="font-bold text-white">{formatNumber(lifetimeRedeemed)}</div>
                    <div className="text-[10px] text-slate-500 uppercase">Canjeadas total</div>
                </div>
            </div>

            {/* Recent Transactions */}
            {recentTransactions.length > 0 && (
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <History className="w-4 h-4 text-slate-400" />
                        <h4 className="text-sm font-bold text-slate-300">Movimientos recientes</h4>
                    </div>
                    <div className="space-y-2">
                        {recentTransactions.slice(0, 5).map(tx => (
                            <div key={tx.id} className="flex items-center justify-between text-sm">
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-300 truncate">{tx.description}</p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(tx.created_at).toLocaleDateString('es-MX', {
                                            day: 'numeric', month: 'short'
                                        })}
                                    </p>
                                </div>
                                <span className={`font-bold ${tx.type === 'earn' || tx.type === 'bonus' || tx.type === 'refund'
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                    }`}>
                                    {tx.type === 'earn' || tx.type === 'bonus' || tx.type === 'refund' ? '+' : '-'}
                                    {tx.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Mock transaction generator
export const generateMockTransactions = (count: number = 10): SeedsTransaction[] => {
    const sources = [
        { type: 'earn', source: 'scan', desc: 'Escaneo en El Bajío Roma' },
        { type: 'earn', source: 'first_scan_partner', desc: 'Primera visita a Casa Oaxaca' },
        { type: 'earn', source: 'donation', desc: 'Donación de $50' },
        { type: 'earn', source: 'referral_signup', desc: 'Amigo registrado: Juan' },
        { type: 'earn', source: 'social_share', desc: 'Compartir en WhatsApp' },
        { type: 'earn', source: 'challenge_complete', desc: 'Reto semanal completado' },
        { type: 'spend', source: 'redemption', desc: 'Descuento 10% en partner' },
        { type: 'bonus', source: 'streak_bonus', desc: 'Bonus semana 4' }
    ];

    return Array.from({ length: count }, (_, i) => {
        const s = sources[Math.floor(Math.random() * sources.length)];
        const amount = s.type === 'spend'
            ? -(Math.floor(Math.random() * 3) + 1) * 100
            : (Math.floor(Math.random() * 5) + 1) * 10;
        return {
            id: `tx-${i}`,
            consumer_id: 'consumer-1',
            type: s.type as any,
            amount: Math.abs(amount),
            balance_after: 1000 + i * 50,
            source: s.source as any,
            description: s.desc,
            created_at: new Date(Date.now() - i * 86400000).toISOString()
        };
    });
};

export default SeedsBalance;
