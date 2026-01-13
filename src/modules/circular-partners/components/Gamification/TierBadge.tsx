import React from 'react';
import { PartnerTier } from '../../types/partners.types';
import { TIER_CONFIG } from '../../data/tierConfig';
import { Medal, Crown, Award, Star, Gem } from 'lucide-react';

interface TierBadgeProps {
    tier: PartnerTier;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    showIcon?: boolean;
    showName?: boolean;
}

const TIER_ICONS: Record<PartnerTier, React.ElementType> = {
    bronze: Medal,
    silver: Medal,
    gold: Award,
    platinum: Crown,
    champion: Gem
};

const SIZE_CLASSES = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
};

const ICON_SIZES = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
};

export const TierBadge: React.FC<TierBadgeProps> = ({
    tier,
    size = 'sm',
    showIcon = true,
    showName = true
}) => {
    const config = TIER_CONFIG[tier];
    const Icon = TIER_ICONS[tier];
    const textColor = tier === 'platinum' || tier === 'silver' ? '#1a1a2e' : '#fff';

    return (
        <span
            className={`inline-flex items-center gap-1 font-bold rounded-full ${SIZE_CLASSES[size]}`}
            style={{
                background: config.gradient,
                color: textColor
            }}
        >
            {showIcon && <Icon className={ICON_SIZES[size]} />}
            {showName && config.name}
        </span>
    );
};

export default TierBadge;
