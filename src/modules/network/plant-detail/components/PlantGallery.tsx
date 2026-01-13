import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { Image, Camera, Maximize2 } from 'lucide-react';

export const PlantGallery: React.FC<{ plant: PlantDetail }> = ({ plant }) => {
    return (
        <section className="bg-slate-800/10 rounded-2xl p-0">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 px-6 pt-6">
                <Camera className="w-5 h-5 text-pink-400" />
                Galería de Operaciones
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-6">
                {/* Placeholder images using colorful divs for now as we might not have real files */}
                {plant.images.gallery.map((img, i) => (
                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-800 border border-slate-700">
                        {/* Fallback to gradient if image fails (since these are mock paths) */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${i === 0 ? 'from-green-800 to-slate-900' :
                                i === 1 ? 'from-blue-800 to-slate-900' :
                                    i === 2 ? 'from-amber-800 to-slate-900' : 'from-purple-800 to-slate-900'
                            }`} />

                        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity">
                            <Image className="w-12 h-12 text-white" />
                        </div>

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="text-xs text-white font-medium">Vista {i + 1}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
