import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlantHeader } from './components/PlantHeader';
import { LocationSection } from './components/LocationSection';
import { MetricsSection } from './components/MetricsSection';
import { PlantEnvironment } from './components/PlantEnvironment';
import { PlantInventory } from './components/PlantInventory';
import { PlantStaffing } from './components/PlantStaffing';
import { PlantGallery } from './components/PlantGallery';
import { BlockchainVerification } from './components/BlockchainVerification';
import { SDGSection } from './components/SDGSection';
import { MOCK_PLANT_TEPETLAOXTOC } from './data/mockPlantData';

const PlantDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // In a real app, usePlantData hook would fetch by ID
    // For now we default to the Tepetlaoxtoc mock data for any ID, or check if it matches
    const plant = MOCK_PLANT_TEPETLAOXTOC;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!plant) {
        return <div className="p-10 text-center text-white">Planta no encontrada</div>;
    }

    return (
        <div className="min-h-screen bg-[#0F172A] pb-20">
            <PlantHeader plant={plant} />

            {/* Main Content */}
            <main className="animate-fade-in-up space-y-8">
                <LocationSection plant={plant} />

                {/* Real-time Operations Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Centro de Control Operativo</h2>
                    <PlantEnvironment plant={plant} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PlantInventory plant={plant} />
                        <div className="space-y-6">
                            <PlantStaffing plant={plant} />
                            <PlantGallery plant={plant} />
                        </div>
                    </div>
                </div>

                <MetricsSection plant={plant} />

                <BlockchainVerification plant={plant} />

                <SDGSection plant={plant} />
            </main>
        </div>
    );
};

export default PlantDetailPage;
