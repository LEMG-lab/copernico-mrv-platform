import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GLOBAL_PLANTS, PlantLocation } from '../modules/global-network/data/globalPlants';

interface NetworkState {
    plants: PlantLocation[];
    updatePlant: (id: string, updates: Partial<PlantLocation>) => void;
    addPlant: (plant: PlantLocation) => void;
    deletePlant: (id: string) => void;
    // Reset to default
    resetPlants: () => void;
}

export const useNetworkStore = create<NetworkState>()(
    persist(
        (set) => ({
            plants: GLOBAL_PLANTS,
            updatePlant: (id, updates) => set((state) => ({
                plants: state.plants.map((p) =>
                    p.id === id ? { ...p, ...updates } : p
                ),
            })),
            addPlant: (plant) => set((state) => ({
                plants: [...state.plants, plant],
            })),
            deletePlant: (id) => set((state) => ({
                plants: state.plants.filter((p) => p.id !== id),
            })),
            resetPlants: () => set({ plants: GLOBAL_PLANTS }),
        }),
        {
            name: 'larvalink-network-storage', // Save changes to localStorage so they persist on refresh
        }
    )
);
