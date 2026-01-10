import React from 'react';
import { Plant, LARVALINK_PLANTS } from '../types/emissions.types';

interface PlantSelectorProps {
    selectedPlant: Plant;
    onSelect: (plant: Plant) => void;
}

export const PlantSelector: React.FC<PlantSelectorProps> = ({ selectedPlant, onSelect }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <label className="block text-slate-400 text-xs uppercase font-bold mb-2">Selecciona Planta LarvaLINK</label>
                    <select
                        className="bg-slate-900 border border-slate-600 text-white text-lg rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={selectedPlant.id}
                        onChange={(e) => {
                            const plant = LARVALINK_PLANTS.find(p => p.id === e.target.value);
                            if (plant) onSelect(plant);
                        }}
                    >
                        {LARVALINK_PLANTS.map(plant => (
                            <option key={plant.id} value={plant.id}>{plant.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-6 text-sm">
                    <div>
                        <div className="text-slate-500 text-xs">Ubicación</div>
                        <div className="text-slate-300 font-medium">{selectedPlant.location}</div>
                    </div>
                    <div>
                        <div className="text-slate-500 text-xs">Capacidad</div>
                        <div className="text-slate-300 font-medium">{selectedPlant.capacity_tons_day} tons/día</div>
                    </div>
                    <div>
                        <div className="text-slate-500 text-xs">Status</div>
                        <div className={`font-medium px-2 py-0.5 rounded text-xs inline-block mt-0.5 uppercase ${selectedPlant.status === 'operativa' ? 'bg-green-500/20 text-green-400' :
                                selectedPlant.status === 'construccion' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-slate-600/20 text-slate-400'
                            }`}>
                            {selectedPlant.status}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
