import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalMap } from './components/GlobalMap';
import { NetworkStats } from './components/NetworkStats';
import { OpportunityCard } from './components/OpportunityCard';
import { METHANE_HOTSPOTS } from './data/methaneHotspots';
import { NetworkFilters, LarvaLinkPlant } from './types/network.types';
import { useNetworkStore } from '../../stores/networkStore';
import { PlantLocation } from './data/globalPlants';
import { Navigation } from '../../components/Navigation';
import { AlertsConfiguration } from './components/AlertsConfiguration';
import { PlantDetailPanel } from './components/PlantDetailPanel';
import { SynapticBackground } from '../../components/SynapticBackground';

export const GlobalNetworkDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<NetworkFilters>({
        showLarvaLink: true,
        showThirdParty: true,
        showHotspots: true,
        regions: ['Americas', 'Europe', 'Asia', 'Africa']
    });

    // Store y Estado de Edición
    const { plants, updatePlant, resetPlants } = useNetworkStore();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingPlant, setEditingPlant] = useState<PlantLocation | null>(null);
    // const [selectedPlant, setSelectedPlant] = useState<any>(null); // YA NO SE USA

    // Form State (temp)
    const [formState, setFormState] = useState<Partial<PlantLocation>>({});

    const handlePlantClick = (plant: PlantLocation) => {
        if (isEditMode) {
            setEditingPlant(plant);
            setFormState(plant);
        } else {
            console.log("Navegando a detalle de planta:", plant.id);
            navigate(`/network/plant/${plant.id}`);
        }
    };

    const handleSavePlant = () => {
        if (editingPlant && formState) {
            updatePlant(editingPlant.id, formState);
            setEditingPlant(null); // Close editor
        }
    };

    const handleInputChange = (field: keyof PlantLocation, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    // Helper para inputs de coordenadas
    const handleCoordChange = (index: 0 | 1, value: string) => {
        const newCoords = [...(formState.coordinates || [0, 0])] as [number, number];
        newCoords[index] = parseFloat(value);
        setFormState(prev => ({ ...prev, coordinates: newCoords }));
    };

    // Geocoding basico con OpenStreetMap (Nominatim)
    const handleSearchAddress = async () => {
        const { address, city, country } = formState;
        if (!city && !country) {
            alert("Ingresa al menos Ciudad y País para buscar.");
            return;
        }

        const query = `${address || ''}, ${city || ''}, ${country || ''}`;
        try {
            // Nota: User-Agent es requerido por políticas de uso de Nominatim
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const firstResult = data[0];
                const lat = parseFloat(firstResult.lat);
                const lon = parseFloat(firstResult.lon);

                setFormState(prev => ({
                    ...prev,
                    coordinates: [lat, lon]
                }));
                // Centrar mapa si se quisiera, pero por ahora solo actualizamos el form
            } else {
                alert("No se encontraron coordenadas para esa dirección.");
            }
        } catch (error) {
            console.error("Error geocodificando:", error);
            alert("Error al conectar con servicio de mapas.");
        }
    };

    const toggleFilter = (key: keyof NetworkFilters) => {
        // @ts-ignore
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-transparent font-sans text-slate-200 flex flex-col h-screen overflow-hidden relative">
            <SynapticBackground />
            <Navigation />

            {/* Header Compacto */}
            <header className="flex flex-col gap-3 mb-2 shrink-0 md:flex-row md:items-center md:justify-between md:mb-6 md:gap-4 transition-all relative z-10 px-4 md:px-0">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 flex items-center gap-2 md:gap-3">
                        <span className="text-2xl md:text-3xl">🌏</span> Red Global <span className="hidden sm:inline">de Bioconversión BSF</span>
                    </h1>

                    {/* Mobile Only Exit Logic if needed, or keep it simple */}
                </div>

                <div className="flex flex-wrap gap-2 items-center justify-between">
                    {/* Controles de Filtros Rápidos - Scrollable on very small screens if needed */}
                    <div className="flex bg-slate-800/80 backdrop-blur rounded-lg p-1 border border-slate-700 overflow-x-auto max-w-[240px] md:max-w-none custom-scrollbar">
                        <button
                            onClick={() => toggleFilter('showLarvaLink')}
                            className={`px-2 py-1 md:px-3 md:py-1.5 rounded text-[10px] md:text-xs font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${filters.showLarvaLink ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${filters.showLarvaLink ? 'bg-[#2ECC71]' : 'bg-slate-600'}`}></span>
                            LarvaLINK
                        </button>
                        <div className="w-[1px] bg-slate-700 mx-0.5 md:mx-1 shrink-0"></div>
                        <button
                            onClick={() => toggleFilter('showThirdParty')}
                            className={`px-2 py-1 md:px-3 md:py-1.5 rounded text-[10px] md:text-xs font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${filters.showThirdParty ? 'bg-[#3498DB]/20 text-[#3498DB]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${filters.showThirdParty ? 'bg-[#3498DB]' : 'bg-slate-600'}`}></span>
                            Terceros
                        </button>
                        <div className="w-[1px] bg-slate-700 mx-0.5 md:mx-1 shrink-0"></div>
                        <button
                            onClick={() => toggleFilter('showHotspots')}
                            className={`px-2 py-1 md:px-3 md:py-1.5 rounded text-[10px] md:text-xs font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${filters.showHotspots ? 'bg-[#E74C3C]/20 text-[#E74C3C]' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${filters.showHotspots ? 'bg-[#E74C3C]' : 'bg-slate-600'}`}></span>
                            Oportunidades
                        </button>
                    </div>

                    <div className="flex gap-2 ml-auto md:ml-0">
                        <button
                            onClick={() => setIsEditMode(!isEditMode)}
                            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm border transition-colors font-bold whitespace-nowrap ${isEditMode
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                                : 'bg-slate-800 text-slate-400 border-slate-600 hover:text-white'
                                }`}
                        >
                            {isEditMode ? '🛠 Activo' : '✏️ Editar'}
                        </button>
                        <a href="/" className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs md:text-sm border border-slate-600 transition-colors whitespace-nowrap">
                            Salir
                        </a>
                    </div>
                </div>
            </header>

            {/* Layout Principal: Mapa y Sidebar */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-y-auto lg:overflow-hidden pb-20 lg:pb-0 relative z-10 px-4 md:px-0">

                {/* Columna Izquierda: Mapa (Grow) */}
                <div className="flex-1 flex flex-col min-h-0 gap-4">
                    {/* Estadísticas Top */}
                    <div className="shrink-0">
                        <NetworkStats />
                    </div>

                    {/* Contenedor Mapa */}
                    <div className="h-[500px] lg:h-auto lg:flex-1 rounded-xl overflow-hidden border border-slate-700 relative bg-slate-900 shadow-2xl shrink-0 lg:shrink">
                        <GlobalMap
                            filters={filters}
                            plants={plants} // Usamos las plantas del store (dinámicas)
                            onPlantClick={handlePlantClick}
                        />

                        {/* Editor Flotante */}
                        {isEditMode && editingPlant && (
                            <div className="absolute top-4 right-4 z-[1100] bg-slate-800 p-4 rounded-xl border border-amber-500/50 shadow-2xl w-80 backdrop-blur-md bg-opacity-95">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-amber-400">Editar Planta</h3>
                                    <button onClick={() => setEditingPlant(null)} className="text-slate-400 hover:text-white">✕</button>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">Nombre de Planta</label>
                                        <input
                                            type="text"
                                            value={formState.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs text-slate-500 block mb-1">Calle y Número</label>
                                            <input
                                                type="text"
                                                value={formState.address || ''}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none"
                                                placeholder="Ej. Av. Reforma 222"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 block mb-1">C.P.</label>
                                            <input
                                                type="text"
                                                value={formState.zipCode || ''}
                                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none"
                                                placeholder="06600"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs text-slate-500 block mb-1">Ciudad</label>
                                            <input
                                                type="text"
                                                value={formState.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 block mb-1">País</label>
                                            <input
                                                type="text"
                                                value={formState.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSearchAddress}
                                        className="w-full py-1.5 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 text-xs rounded border border-blue-500/50 flex items-center justify-center gap-2 mb-2 transition-colors font-medium"
                                    >
                                        🌍 Buscar Coordenadas Automáticas
                                    </button>

                                    <div className="grid grid-cols-2 gap-2 border-t border-slate-700 pt-2 relative mt-4">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 px-2 text-[10px] text-slate-500 whitespace-nowrap">
                                            O ingresa coordenadas manuales
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 block mb-1">Latitud</label>
                                            <input
                                                type="number"
                                                value={formState.coordinates?.[0]}
                                                onChange={(e) => handleCoordChange(0, e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none font-mono text-center"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 block mb-1">Longitud</label>
                                            <input
                                                type="number"
                                                value={formState.coordinates?.[1]}
                                                onChange={(e) => handleCoordChange(1, e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm focus:border-amber-500 outline-none font-mono text-center"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <button
                                            onClick={handleSavePlant}
                                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-1.5 rounded text-sm font-bold transition-colors"
                                        >
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna Derecha: Detalles (Fijo 350px en Desktop, Full en Mobile) */}
                <div className="w-full lg:w-[350px] flex flex-col gap-6 shrink-0 lg:overflow-y-auto pr-1 custom-scrollbar">

                    <>
                        {/* DEMO DEBUG: Quick Access Button */}
                        <div className="bg-slate-800 rounded-xl p-4 border border-blue-500/50 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <h3 className="text-blue-400 font-bold mb-2 text-sm uppercase tracking-wider">🛠 Modo Desarrollador</h3>
                            <button
                                onClick={() => {
                                    // Navegación directa para debug
                                    navigate('/network/plant/ll-001');
                                }}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-bold flex items-center justify-center gap-2"
                            >
                                <span>🚀</span> Simular Selección Papalotla
                            </button>
                        </div>

                        {/* Contexto de Industria */}
                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                            <h3 className="text-white font-bold mb-3 border-b border-slate-700 pb-2">Industria Global BSF</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Plantas activas (est)</span>
                                    <span className="text-white font-mono">~45</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Capacidad Global</span>
                                    <span className="text-white font-mono">~2,500 t/d</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Share LarvaLINK (LatAm)</span>
                                    <span className="text-green-400 font-bold font-mono">6.7%</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-2 italic bg-slate-900/50 p-2 rounded">
                                    "La bioconversión representa la solución más escalable para residuos orgánicos en megaciudades."
                                    <br />— FAO Report 2024
                                </div>
                            </div>
                        </div>

                        {/* Lista Oportunidades */}
                        <div className="flex-1 flex flex-col min-h-0 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">🎯 Top Oportunidades</h3>
                                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded">Sentinel-5P</span>
                            </div>

                            <div className="space-y-3 overflow-y-auto pr-1">
                                {METHANE_HOTSPOTS.map((hotspot, idx) => (
                                    <OpportunityCard key={idx} hotspot={hotspot} rank={idx + 1} />
                                ))}
                            </div>
                        </div>

                        {/* Footer Verificación */}
                        <div className="text-[10px] text-slate-500 text-center px-4">
                            <p>Datos de red actualizados en tiempo real mediante oráculos de LarvaLINK Chain.</p>
                            <p className="mt-1">Fuentes de terceros: Informes públicos agregados.</p>
                        </div>
                    </>


                </div>
            </div>
            <AlertsConfiguration />
        </div>
    );
};

export default GlobalNetworkDashboard;
