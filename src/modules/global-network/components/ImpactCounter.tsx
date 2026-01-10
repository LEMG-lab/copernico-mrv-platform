import React, { useEffect, useState } from 'react';

interface ImpactCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    decimals?: number;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({ end, duration = 2000, suffix = "", decimals = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing function: easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(ease * end);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <span className="tabular-nums">
            {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
        </span>
    );
};
