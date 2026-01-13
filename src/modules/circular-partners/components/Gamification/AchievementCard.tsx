import React from 'react';
import { Achievement } from '../../types/partners.types';
import { Star, Lock, CheckCircle } from 'lucide-react';

interface AchievementCardProps {
    achievement: Achievement;
    size?: 'sm' | 'md' | 'lg';
}

const RARITY_COLORS = {
    common: { bg: 'bg-slate-500/20', border: 'border-slate-500/30', text: 'text-slate-400' },
    uncommon: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400' },
    rare: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
    epic: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
    legendary: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' }
};

const SIZE_CONFIG = {
    sm: { container: 'p-3', icon: 'w-8 h-8', title: 'text-xs', desc: 'text-[10px]' },
    md: { container: 'p-4', icon: 'w-12 h-12', title: 'text-sm', desc: 'text-xs' },
    lg: { container: 'p-5', icon: 'w-16 h-16', title: 'text-base', desc: 'text-sm' }
};

export const AchievementCard: React.FC<AchievementCardProps> = ({
    achievement,
    size = 'md'
}) => {
    const rarityStyle = RARITY_COLORS[achievement.rarity];
    const sizeStyle = SIZE_CONFIG[size];

    return (
        <div
            className={`${sizeStyle.container} rounded-xl border transition-all ${achievement.unlocked
                    ? `${rarityStyle.bg} ${rarityStyle.border}`
                    : 'bg-slate-800/30 border-slate-700/50 opacity-60'
                }`}
        >
            <div className="flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className={`${sizeStyle.icon} rounded-full flex items-center justify-center mb-2 ${achievement.unlocked ? rarityStyle.bg : 'bg-slate-700/50'
                    }`}>
                    {achievement.unlocked ? (
                        <Star className={`w-1/2 h-1/2 ${rarityStyle.text}`} />
                    ) : (
                        <Lock className="w-1/2 h-1/2 text-slate-500" />
                    )}
                </div>

                {/* Info */}
                <h4 className={`font-bold text-white ${sizeStyle.title} mb-1`}>
                    {achievement.name}
                </h4>
                <p className={`text-slate-400 ${sizeStyle.desc} mb-2 line-clamp-2`}>
                    {achievement.description}
                </p>

                {/* Progress or Date */}
                {achievement.unlocked ? (
                    <span className={`flex items-center gap-1 ${sizeStyle.desc} ${rarityStyle.text}`}>
                        <CheckCircle className="w-3 h-3" />
                        {achievement.unlocked_at && new Date(achievement.unlocked_at).toLocaleDateString('es-MX', {
                            day: 'numeric', month: 'short'
                        })}
                    </span>
                ) : achievement.progress ? (
                    <div className="w-full">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
                            <div
                                className="h-full bg-slate-500 rounded-full"
                                style={{ width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }}
                            />
                        </div>
                        <span className={`${sizeStyle.desc} text-slate-500`}>
                            {achievement.progress.current}/{achievement.progress.target}
                        </span>
                    </div>
                ) : null}

                {/* Reward */}
                {(achievement.xp_reward > 0 || achievement.seeds_reward > 0) && (
                    <div className={`flex items-center gap-2 mt-2 ${sizeStyle.desc}`}>
                        {achievement.xp_reward > 0 && (
                            <span className="text-green-400">+{achievement.xp_reward} XP</span>
                        )}
                        {achievement.seeds_reward > 0 && (
                            <span className="text-emerald-400">+{achievement.seeds_reward} 🌱</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AchievementCard;
