import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { MapWithStreetView } from './MapWithStreetView';
import { CorporateInfo } from './CorporateInfo';

interface LocationSectionProps {
    plant: PlantDetail;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ plant }) => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MapWithStreetView plant={plant} />
                </div>
                <div className="lg:col-span-1">
                    <CorporateInfo plant={plant} />
                </div>
            </div>
        </section>
    );
};
