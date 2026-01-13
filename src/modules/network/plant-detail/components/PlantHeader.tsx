import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Settings } from 'lucide-react';
import { PlantDetail } from '../types/plantDetail.types';

interface PlantHeaderProps {
    plant: PlantDetail;
}

export const PlantHeader: React.FC<PlantHeaderProps> = ({ plant }) => {
    return (
        <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-[100] shadow-sm supports-[backdrop-filter]:bg-slate-900/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/network"
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver a Red Global
                        </Link>
                        <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
                        <h1 className="text-xl font-bold text-white hidden sm:block truncate max-w-[200px] md:max-w-none" title={plant.name}>{plant.name}</h1>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${plant.status === 'operational' ? 'bg-green-500/10 text-green-500' :
                            plant.status === 'construction' ? 'bg-orange-500/10 text-orange-500' :
                                'bg-blue-500/10 text-blue-500'
                            }`}>
                            {plant.status === 'operational' ? 'Operativa' : plant.status}
                        </span>
                        {plant.status === 'operational' && (
                            <div className="hidden md:flex items-center gap-2 border-l border-slate-700 pl-4 ml-2">
                                <div className="text-xs text-slate-400">
                                    <span className="block font-bold text-white">{plant.operations.current_utilization}%</span>
                                    Utilización
                                </div>
                                <div className="text-xs text-slate-400">
                                    <span className="block font-bold text-white">{plant.operations.capacity_tons_day} t/día</span>
                                    Capacidad
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" title="Compartir">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" title="Descargar Ficha">
                            <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" title="Configuración">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
