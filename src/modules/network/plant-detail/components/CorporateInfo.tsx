import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { Building2, Globe, Mail, Phone, Users, MapPin, ExternalLink } from 'lucide-react';

interface CorporateInfoProps {
    plant: PlantDetail;
}

export const CorporateInfo: React.FC<CorporateInfoProps> = ({ plant }) => {
    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 h-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                Información Corporativa
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Razón Social</label>
                    <p className="text-white font-medium">{plant.corporate.legal_name}</p>
                    <p className="text-slate-400 text-sm mt-0.5">RFC: {plant.corporate.tax_id}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Contacto</label>
                        <div className="space-y-2">
                            {plant.corporate.website && (
                                <a href={plant.corporate.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm">
                                    <Globe className="w-3.5 h-3.5" />
                                    Website
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                            <a href={`mailto:${plant.corporate.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white text-sm">
                                <Mail className="w-3.5 h-3.5" />
                                {plant.corporate.email}
                            </a>
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <Phone className="w-3.5 h-3.5" />
                                {plant.corporate.phone}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Ubicación</label>
                        <div className="text-sm text-slate-300">
                            <p>{plant.location.address}</p>
                            <p>{plant.location.city}, {plant.location.state}</p>
                            <p>{plant.location.postal_code}, {plant.location.country}</p>

                            {plant.location.google_maps_url && (
                                <a
                                    href={plant.location.google_maps_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 mt-2 text-xs font-medium"
                                >
                                    <MapPin className="w-3 h-3" />
                                    Abrir en Google Maps
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Operación y Equipo</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="w-4 h-4 text-purple-400" />
                                <span className="text-xs text-slate-400">Empleados</span>
                            </div>
                            <span className="text-xl font-bold text-white">{plant.corporate.employees.total}</span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="w-4 h-4 text-pink-400" />
                                <span className="text-xs text-slate-400">Mujeres</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-white">{plant.corporate.employees.women_percentage}%</span>
                                <span className="text-xs text-slate-500">laboral</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
