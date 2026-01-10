import { useState, useEffect } from 'react';
import { networkDataService } from '../services/networkDataService';

export const useNetworkStats = () => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const data = networkDataService.getNetworkStats();
        setStats(data);
    }, []);

    return stats;
};
