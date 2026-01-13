import React from 'react';
import { ProductionMetrics } from './ProductionMetrics';
import { EnvironmentalImpact } from './EnvironmentalImpact';
import { SocialImpact } from './SocialImpact';

export const MetricsSection: React.FC<{ plant: any }> = ({ plant }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
            <ProductionMetrics plant={plant} />
            <EnvironmentalImpact plant={plant} />

            <div className="relative z-10 bg-slate-900/50 rounded-3xl p-8 border border-slate-800/50">
                <SocialImpact plant={plant} />
            </div>
        </div>
    );
};
