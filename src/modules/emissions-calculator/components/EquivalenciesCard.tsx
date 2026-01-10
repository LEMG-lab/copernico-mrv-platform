import React from 'react';

interface EquivalenciesCardProps {
    data: {
        trees: number;
        car_km: number;
        homes: number;
        flights: number;
    };
}

export const EquivalenciesCard: React.FC<EquivalenciesCardProps> = ({ data }) => {
    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>🌱</span> Equivalencias de Impacto
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {/* Arboles */}
                <div className="bg-slate-700/30 p-3 rounded-lg flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">🌳</span>
                    <span className="text-xl font-bold text-green-400">{data.trees.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">Árboles / año</span>
                </div>

                {/* Autos */}
                <div className="bg-slate-700/30 p-3 rounded-lg flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">🚗</span>
                    <span className="text-xl font-bold text-blue-400">{(data.car_km / 1000).toFixed(1)}k</span>
                    <span className="text-xs text-slate-400">Km en auto</span>
                </div>

                {/* Hogares */}
                <div className="bg-slate-700/30 p-3 rounded-lg flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">🏠</span>
                    <span className="text-xl font-bold text-yellow-400">{data.homes.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">Hogares energizados</span>
                </div>

                {/* Vuelos */}
                <div className="bg-slate-700/30 p-3 rounded-lg flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">✈️</span>
                    <span className="text-xl font-bold text-purple-400">{data.flights.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">Vuelos CDMX-NY</span>
                </div>
            </div>
        </div>
    );
};
