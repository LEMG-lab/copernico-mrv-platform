import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNetworkStore } from '../../../stores/networkStore';
import { Navigation } from '../../../components/Navigation';
import { PlantLocation, LarvaLinkPlant } from '../types/network.types';
import { ArrowLeft, CheckCircle, Globe, Leaf, TrendingUp, Users, Activity, Hexagon } from 'lucide-react';

// --- MOCK KPI CALCULATOR ---
const calculateSDGMetrics = (plant: PlantLocation) => {
    // Base capacity in tons per day. If not available, assume 10 t/d for calculation
    const capacity = 'capacity_tpd' in plant ? (plant as LarvaLinkPlant).capacity_tpd : 10;
    const annualCapacity = capacity * 300; // 300 operating days

    return [
        {
            sdg: 13,
            title: "Acción por el Clima",
            description: "Reducción directa de emisiones de metano al evitar la descomposición en vertederos.",
            metrics: [
                { label: "Emisiones Evitadas", value: (annualCapacity * 0.85).toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: "tCO2e/año" },
                { label: "Equivalente en Autos", value: (annualCapacity * 0.18).toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: "autos/año" }
            ],
            color: "from-green-500 to-emerald-700",
            icon: <Globe className="w-8 h-8 text-white" />
        },
        {
            sdg: 12,
            title: "Producción y Consumo Responsables",
            description: "Cierre de ciclo de nutrientes mediante bioconversión industrial de residuos orgánicos.",
            metrics: [
                { label: "Residuos Valorizados", value: annualCapacity.toLocaleString(), unit: "tons/año" },
                { label: "Circularidad", value: "98.5%", unit: "Eficacia" }
            ],
            color: "from-orange-500 to-amber-700",
            icon: <Leaf className="w-8 h-8 text-white" />
        },
        {
            sdg: 2,
            title: "Hambre Cero",
            description: "Producción de biofertilizante de alta calidad para regenerar suelos agrícolas.",
            metrics: [
                { label: "Biofertilizante", value: (annualCapacity * 0.3).toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: "tons/año" },
                { label: "Suelo Regenerado", value: (annualCapacity * 1.2).toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: "hectáreas" }
            ],
            color: "from-yellow-500 to-yellow-700",
            icon: <Activity className="w-8 h-8 text-white" />
        },
        {
            sdg: 11,
            title: "Ciudades Sostenibles",
            description: "Infraestructura descentralizada para la gestión de residuos urbanos.",
            metrics: [
                { label: "Hogares Atendidos", value: (capacity * 250).toLocaleString(), unit: "familias" },
                { label: "Camiones Evitados", value: (annualCapacity / 15).toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: "viajes/año" }
            ],
            color: "from-blue-500 to-indigo-700",
            icon: <Users className="w-8 h-8 text-white" />
        }
    ];
};

// Colección de imágenes "MetaBioconversion 3.0" (Larvas, Blockchain, Tech, Biofertilizantes)
const PLANT_HERO_IMAGES = [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200", // Lab/Biotech
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200", // AI/Neural Network
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200", // Nature/Forest
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", // Chip/Circuit
    "https://images.unsplash.com/photo-1625246333195-56ce72a09c87?auto=format&fit=crop&q=80&w=1200", // AgTech/Drone
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", // Clean Factory
    "https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=1200", // Data Vis
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200", // Biology Green
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200", // Abstract Shapes
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"  // Earth Network
];

export const PlantDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { plants } = useNetworkStore();

    const plant = plants.find(p => p.id === id);
    const sdgMetrics = useMemo(() => plant ? calculateSDGMetrics(plant) : [], [plant]);

    if (!plant) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Planta no encontrada</h2>
                    <p className="text-slate-400 mb-4">ID: {id}</p>
                    <button onClick={() => navigate('/network')} className="bg-blue-600 px-4 py-2 rounded">
                        Volver al mapa
                    </button>
                </div>
            </div>
        );
    }

    // Selección determinística basada en el ID (siempre la misma img para la misma planta)
    // Usamos el código ASCII del último caracter del ID para elegir índice
    const imageIndex = (id?.charCodeAt(id.length - 1) || 0) % PLANT_HERO_IMAGES.length;
    const heroImage = PLANT_HERO_IMAGES[imageIndex];

    const isVerified = plant.status === 'active' || plant.status === 'operational' || plant.status === 'verified';

    return (
        <div className="min-h-screen bg-[#0F172A] font-sans text-slate-200 pb-20">
            <Navigation />

            {/* Header / Hero Section */}
            <div className="h-64 md:h-80 w-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent z-10" />
                <img
                    src={heroImage}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-30"
                />

                <div className="absolute bottom-0 left-0 w-full z-20 px-4 md:px-12 pb-8">
                    <button
                        onClick={() => navigate('/network')}
                        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm w-fit text-sm font-medium border border-slate-700 hover:border-slate-500"
                    >
                        <ArrowLeft size={16} /> Volver al Mapa Global
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${plant.type === 'larvalink'
                                    ? 'bg-green-500/20 text-green-400 border-green-500/50'
                                    : 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                                    }`}>
                                    {plant.type === 'larvalink' ? 'LarvaLINK Operated' : 'Third Party / Partner'}
                                </span>
                                {isVerified && (
                                    <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/30">
                                        <CheckCircle size={12} /> Verificado On-Chain
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">{plant.name}</h1>
                            <p className="text-lg text-slate-400 flex items-center gap-2">
                                <span className="fi fi-mx"></span> {/* Flag placeholder */}
                                {plant.city}, {plant.country}
                            </p>
                        </div>

                        {/* Quick Stats Header */}
                        <div className="flex gap-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-md">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Capacidad</p>
                                <p className="text-2xl font-bold text-white font-mono">
                                    {'capacity_tpd' in plant ? (plant as LarvaLinkPlant).capacity_tpd : '~10'} <span className="text-sm font-sans font-normal text-slate-500">t/día</span>
                                </p>
                            </div>
                            <div className="w-[1px] bg-slate-700"></div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Status</p>
                                <p className="text-2xl font-bold text-white uppercase">{plant.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="px-4 md:px-12 mt-8 space-y-12 max-w-7xl mx-auto">

                {/* IMPACTO ODS SECTION */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg shadow-purple-900/20">
                            <Globe className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Impacto ODS</h2>
                            <p className="text-slate-400">Contribución cuantificada a los Objetivos de Desarrollo Sostenible de la ONU</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sdgMetrics.map((sdg) => (
                            <div key={sdg.sdg} className="group relative bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl overflow-hidden">
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${sdg.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <span className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br ${sdg.color}`}>
                                        {sdg.sdg}
                                    </span>
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${sdg.color} shadow-lg`}>
                                        {sdg.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 relative z-10 min-h-[56px] flex items-center">
                                    {sdg.title}
                                </h3>

                                <p className="text-sm text-slate-400 mb-6 min-h-[60px] relative z-10">
                                    {sdg.description}
                                </p>

                                <div className="space-y-4 relative z-10 bg-slate-900/50 mx-[-24px] mb-[-24px] p-6 border-t border-slate-700/50 group-hover:bg-slate-900/30 transition-colors">
                                    {sdg.metrics.map((metric, idx) => (
                                        <div key={idx}>
                                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{metric.label}</p>
                                            <p className="text-2xl font-mono font-bold text-white group-hover:scale-105 transition-transform origin-left">
                                                {metric.value} <span className="text-xs font-sans font-normal text-slate-500">{metric.unit}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* BLOCKCHAIN VERIFICATION SECTION */}
                <section className="bg-slate-800/30 rounded-3xl border border-slate-700/50 overflow-hidden">
                    <div className="grid md:grid-cols-3">
                        <div className="p-8 md:p-12 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <Hexagon className="text-emerald-400 w-6 h-6" />
                                <h2 className="text-2xl font-bold text-white">Verificación Transparente</h2>
                            </div>
                            <p className="text-slate-300 mb-8 max-w-2xl text-lg leading-relaxed">
                                Cada tonelada de residuo procesado y cada crédito de carbono generado por esta planta es registrado inmutablemente en la Blockchain de LarvaLINK. Esto garantiza trazabilidad total desde el origen del residuo hasta el impacto final.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row md:items-center gap-4 justify-between group cursor-pointer hover:border-emerald-500/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:text-emerald-300">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold">Última Prueba de Existencia</p>
                                            <p className="text-white font-mono text-sm truncate max-w-[200px] md:max-w-none">
                                                0x7f82...3a9c • Bloque #18452901
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://dev-explorer.globalforce.io/transaction/edecd62439b625b7e9829554ddcebb434733989358a7bb66641c98e72ffcada4"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-400 text-sm font-bold hover:underline px-4 flex items-center gap-1"
                                    >
                                        Ver en Explorador <span className="text-lg">↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-700/50">
                            <h3 className="text-white font-bold mb-6">Compliance & Certificaciones</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                                    <span>ISO 14001:2015 Certificado</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                                    <span>Metodología IPCC 2019 Aprobada</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                                    <span>Auditoría de Terceros (Vianova)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ADDITIONAL DETAILS GRID */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-6">Detalles Operativos</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between border-b border-slate-700 pb-4">
                                <span className="text-slate-400">Tipo de Tecnología</span>
                                <span className="text-white font-medium">Bioconversión BSFL V3.2</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-700 pb-4">
                                <span className="text-slate-400">Fecha de Inicio</span>
                                <span className="text-white font-medium">Noviembre 2023</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-700 pb-4">
                                <span className="text-slate-400">Turnos Operativos</span>
                                <span className="text-white font-medium">24/7 (3 Turnos)</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-700 pb-4">
                                <span className="text-slate-400">Personal</span>
                                <span className="text-white font-medium">~12 Empleados Directos</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-6">Insumos y Productos</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-400 text-sm">Residuo Orgánico (Input)</span>
                                    <span className="text-white text-sm font-bold">100%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-orange-500 h-full w-full"></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Origen: Mercados de Abastos, Agroindustria</p>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-400 text-sm">Biofertilizante (Output)</span>
                                    <span className="text-emerald-400 text-sm font-bold">~30%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[30%]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-400 text-sm">Proteína de Insecto (Output)</span>
                                    <span className="text-blue-400 text-sm font-bold">~5%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[5%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-400 text-sm">Humedad Evaporada</span>
                                    <span className="text-cyan-400 text-sm font-bold">~65%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-cyan-500 h-full w-[65%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-20"></div> {/* Spacer */}
            </main>
        </div>
    );
};
