import React, { useState } from 'react';
import { LeaderboardEntry, PartnerTier, ConsumerLevel } from '../../types/partners.types';
import { TierBadge } from './TierBadge';
import { Trophy, ChevronUp, ChevronDown, Minus, Medal, User } from 'lucide-react';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
    title?: string;
    currentUserId?: string;
    showRankChange?: boolean;
    maxVisible?: number;
}

const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="text-sm text-slate-500 font-bold">#{rank}</span>;
};

const getRankChangeIcon = (change: number) => {
    if (change > 0) return <ChevronUp className="w-4 h-4 text-green-400" />;
    if (change < 0) return <ChevronDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-500" />;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({
    entries,
    title = "Leaderboard",
    currentUserId,
    showRankChange = true,
    maxVisible = 10
}) => {
    const [showAll, setShowAll] = useState(false);
    const visibleEntries = showAll ? entries : entries.slice(0, maxVisible);

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white">{title}</h3>
                <span className="text-xs text-slate-400 ml-auto">{entries.length} participantes</span>
            </div>

            {/* Entries */}
            <div className="divide-y divide-slate-700/50">
                {visibleEntries.map((entry, i) => (
                    <div
                        key={entry.id}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${entry.is_current_user || entry.id === currentUserId
                                ? 'bg-green-500/10 border-l-2 border-green-500'
                                : 'hover:bg-slate-700/30'
                            }`}
                    >
                        {/* Rank */}
                        <div className="w-8 flex-shrink-0 text-center">
                            {getRankIcon(entry.rank)}
                        </div>

                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                            {entry.avatar_url ? (
                                <img src={entry.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 text-slate-400" />
                            )}
                        </div>

                        {/* Name & Level */}
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-white text-sm truncate">
                                {entry.name}
                                {(entry.is_current_user || entry.id === currentUserId) && (
                                    <span className="text-green-400 text-xs ml-1">(Tú)</span>
                                )}
                            </div>
                            <div className="text-xs">
                                {/* Check if it's a partner tier or consumer level */}
                                {['bronze', 'silver', 'gold', 'platinum', 'champion'].includes(entry.level as string) ? (
                                    <TierBadge tier={entry.level as PartnerTier} size="xs" showIcon={false} />
                                ) : (
                                    <span className="text-slate-400">{entry.level}</span>
                                )}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                            <div className="font-bold text-green-400">{entry.score.toLocaleString()}</div>
                            <div className="text-[10px] text-slate-500">{entry.metric_label}</div>
                        </div>

                        {/* Rank Change */}
                        {showRankChange && (
                            <div className="w-6 flex-shrink-0 flex items-center justify-center">
                                {getRankChangeIcon(entry.change)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Show More */}
            {entries.length > maxVisible && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full py-3 text-sm text-blue-400 hover:bg-slate-700/30 transition-colors"
                >
                    {showAll ? 'Ver menos' : `Ver ${entries.length - maxVisible} más`}
                </button>
            )}
        </div>
    );
};

// Sample leaderboard data generator
export const generateMockLeaderboard = (count: number = 20): LeaderboardEntry[] => {
    const names = [
        "El Bajío Roma", "Casa Oaxaca", "CEDA Tlaxcala", "Starbucks Reforma",
        "Hospital Ángeles", "La Parroquia", "Café Tacuba", "Sanborns Polanco",
        "Hotel Condesa", "Marriott Reforma", "Vips Insurgentes", "El Cardenal",
        "Pujol", "Quintonil", "Sud 777", "Contramar", "Rosetta", "Máximo Bistrot",
        "Eno", "Lardo"
    ];
    const tiers: PartnerTier[] = ['champion', 'platinum', 'gold', 'silver', 'bronze'];

    return names.slice(0, count).map((name, i) => ({
        rank: i + 1,
        id: `partner-${i}`,
        name,
        level: tiers[Math.min(Math.floor(i / 4), 4)],
        score: Math.round(10000 * Math.pow(0.85, i)),
        metric_label: 'kg',
        change: Math.floor(Math.random() * 5) - 2,
        is_current_user: i === 2
    }));
};

export default Leaderboard;
