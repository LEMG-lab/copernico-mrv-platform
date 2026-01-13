import { create } from 'zustand';
import { PlantLocation } from '../modules/global-network/data/globalPlants';
import { networkService } from '../modules/global-network/services/networkService';

interface NetworkState {
    plants: PlantLocation[];
    isLoading: boolean;
    error: string | null;

    fetchPlants: () => Promise<void>;
    updatePlant: (id: string, updates: Partial<PlantLocation>) => Promise<void>;

    // Legacy placeholders (podríamos implementarlos luego)
    addPlant: (plant: PlantLocation) => void;
    deletePlant: (id: string) => void;
    resetPlants: () => void;
}

export const useNetworkStore = create<NetworkState>((set, get) => ({
    plants: [],
    isLoading: false,
    error: null,

    fetchPlants: async () => {
        set({ isLoading: true, error: null });
        try {
            const plants = await networkService.getPlants();
            set({ plants, isLoading: false });
        } catch (err: any) {
            console.error("Failed to fetch plants", err);
            set({ error: err.message, isLoading: false });
        }
    },

    updatePlant: async (id, updates) => {
        // Optimistic update
        set((state) => ({
            plants: state.plants.map((p) =>
                p.id === id ? { ...p, ...updates } : p
            ),
        }));

        try {
            await networkService.updatePlant(id, updates);
        } catch (err) {
            console.error("Failed to update plant in DB", err);
            // Revert could be implemented here
        }
    },

    addPlant: (plant) => set((state) => ({
        plants: [...state.plants, plant],
    })),
    deletePlant: (id) => set((state) => ({
        plants: state.plants.filter((p) => p.id !== id),
    })),
    resetPlants: () => set({ plants: [] }), // changed behavior slightly
}));
