import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../../../components/Navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    MapPin, Search, Filter, Users, Recycle, Leaf, Heart,
    ChevronRight, Star, Award, Building2, Coffee, Utensils,
    Hotel, Hospital, GraduationCap, ShoppingCart, Factory,
    Store, Cake, Wine, Dumbbell, X
} from 'lucide-react';
import { NETWORK_STATS } from '../data/mockPartners';
import { PARTNER_CATEGORIES } from '../data/partnerCategories';
import { TIER_CONFIG } from '../data/tierConfig';
import { Partner, PartnerCategory, PartnerTier } from '../types/partners.types';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons by tier
const createTierIcon = (tier: PartnerTier) => {
    const colors: Record<PartnerTier, string> = {
        champion: '#50C878',
        platinum: '#E5E4E2',
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32'
    };

    return L.divIcon({
        className: 'custom-tier-marker',
        html: `
            <div style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: ${colors[tier]};
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

// Icon mapping for categories
const CATEGORY_ICONS: Record<PartnerCategory, React.ElementType> = {
    restaurant: Utensils,
    hotel: Hotel,
    hospital: Hospital,
    school: GraduationCap,
    supermarket: ShoppingCart,
    food_factory: Factory,
    central_abasto: Store,
    catering: Cake,
    corporate_cafeteria: Building2,
    coffee_shop: Coffee,
    bakery: Cake,
    bar_club: Wine,
    event_venue: Star,
    gym_spa: Dumbbell,
    other: MapPin
};

const TierBadge: React.FC<{ tier: PartnerTier; size?: 'sm' | 'md' }> = ({ tier, size = 'sm' }) => {
    const config = TIER_CONFIG[tier];
    const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';

    return (
        <span
            className={`font-bold rounded-full ${sizeClasses}`}
            style={{
                background: config.gradient,
                color: tier === 'platinum' || tier === 'silver' ? '#1a1a2e' : '#fff'
            }}
        >
            {config.name}
        </span>
    );
};

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
    const CategoryIcon = CATEGORY_ICONS[partner.category];
    const categoryConfig = PARTNER_CATEGORIES[partner.category];

    return (
        <Link
            to={`/partners/${partner.slug}`}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-green-500/50 transition-all group"
        >
            <div className="flex items-start gap-3">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${categoryConfig.color}20` }}
                >
                    <CategoryIcon className="w-5 h-5" style={{ color: categoryConfig.color }} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white truncate group-hover:text-green-400 transition-colors">
                            {partner.trade_name}
                        </h3>
                        {partner.customer_incentive && (
                            <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                🎁 {partner.customer_incentive.value}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <TierBadge tier={partner.tier} />
                        <span>•</span>
                        <span>{partner.location.neighborhood}, {partner.location.city}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Recycle className="w-3 h-3" />
                            {(partner.metrics.lifetime.total_kg / 1000).toFixed(1)}t
                        </span>
                        <span className="flex items-center gap-1">
                            <Leaf className="w-3 h-3" />
                            {(partner.metrics.lifetime.co2_avoided_kg / 1000).toFixed(1)}t CO2
                        </span>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-green-400 transition-colors" />
            </div>
        </Link>
    );
};

const NetworkStatsBar: React.FC = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
            { icon: Building2, value: NETWORK_STATS.active_partners, label: 'Partners activos', color: 'text-blue-400' },
            { icon: Recycle, value: `${(NETWORK_STATS.total_kg_collected / 1000000).toFixed(1)}M`, label: 'kg trazados', color: 'text-green-400' },
            { icon: Leaf, value: `${(NETWORK_STATS.total_co2_avoided_kg / 1000).toFixed(0)}`, label: 'tons CO2 evitado', color: 'text-emerald-400' },
            { icon: Users, value: NETWORK_STATS.active_consumers_30d.toLocaleString(), label: 'Usuarios activos', color: 'text-cyan-400' },
            { icon: Heart, value: `$${(NETWORK_STATS.total_donations_amount / 1000).toFixed(0)}K`, label: 'Donado', color: 'text-pink-400' }
        ].map((stat, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <div className="text-lg font-black text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-500 uppercase">{stat.label}</div>
            </div>
        ))}
    </div>
);

const PartnersMap: React.FC<{ partners: Partner[] }> = ({ partners }) => {
    const navigate = useNavigate();

    // Calculate map center based on partners
    const center = useMemo(() => {
        if (partners.length === 0) return { lat: 19.4326, lng: -99.1332 }; // Default: CDMX
        const avgLat = partners.reduce((sum, p) => sum + p.location.coordinates.lat, 0) / partners.length;
        const avgLng = partners.reduce((sum, p) => sum + p.location.coordinates.lng, 0) / partners.length;
        return { lat: avgLat, lng: avgLng };
    }, [partners]);

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl h-[450px] relative overflow-hidden">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                className="rounded-xl"
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {partners.map(partner => (
                    <Marker
                        key={partner.id}
                        position={[partner.location.coordinates.lat, partner.location.coordinates.lng]}
                        icon={createTierIcon(partner.tier)}
                    >
                        <Popup>
                            <div className="min-w-[200px]">
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{partner.trade_name}</h4>
                                <p className="text-xs text-slate-600 mb-2">{partner.location.city}</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                                        style={{ background: TIER_CONFIG[partner.tier].color }}
                                    >
                                        {TIER_CONFIG[partner.tier].name}
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        {(partner.metrics.lifetime.total_kg / 1000).toFixed(1)}t
                                    </span>
                                </div>
                                <button
                                    onClick={() => navigate(`/partners/${partner.slug}`)}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1.5 px-3 rounded transition-colors"
                                >
                                    Ver detalles
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-slate-900/90 rounded-lg p-3 z-[1000]">
                <div className="text-[10px] text-slate-400 uppercase mb-2 font-bold">Tier</div>
                {(['champion', 'platinum', 'gold', 'silver', 'bronze'] as PartnerTier[]).map(tier => (
                    <div key={tier} className="flex items-center gap-2 mb-1">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: TIER_CONFIG[tier].gradient }}
                        />
                        <span className="text-xs text-slate-300">{TIER_CONFIG[tier].name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

import { partnerService } from '../services/partnerService';

// ... (imports)

export const PartnersMapPage: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
    const [selectedTier, setSelectedTier] = useState<PartnerTier | 'all'>('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await partnerService.getPartners();
                setPartners(data);
            } catch (err) {
                console.error('Failed to fetch partners:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
    }, []);

    const filteredPartners = useMemo(() => {
        return partners.filter(partner => {
            const matchesSearch = partner.trade_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.location.city.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
            const matchesTier = selectedTier === 'all' || partner.tier === selectedTier;
            return matchesSearch && matchesCategory && matchesTier;
        });
    }, [partners, searchQuery, selectedCategory, selectedTier]);

    const topCategories = Object.entries(NETWORK_STATS.by_category)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navigation />

            <main className="max-w-7xl mx-auto px-4 py-6">
                {loading ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                                        <Recycle className="w-6 h-6 text-white" />
                                    </span>
                                    Red de Comercios Certificados
                                </h1>
                                <p className="text-slate-400 mt-1">
                                    Grandes generadores comprometidos con la economía circular
                                </p>
                            </div>
                            <Link
                                to="/partners/register"
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all"
                            >
                                <Building2 className="w-4 h-4" />
                                Registrar mi negocio
                            </Link>
                        </div>

                        {/* Stats */}
                        <NetworkStatsBar />

                        {/* Search & Filters */}
                        <div className="flex flex-col md:flex-row gap-3 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o ciudad..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${showFilters ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                Filtros
                                {(selectedCategory !== 'all' || selectedTier !== 'all') && (
                                    <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        {(selectedCategory !== 'all' ? 1 : 0) + (selectedTier !== 'all' ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-white">Filtros</h3>
                                    {(selectedCategory !== 'all' || selectedTier !== 'all') && (
                                        <button
                                            onClick={() => { setSelectedCategory('all'); setSelectedTier('all'); }}
                                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                                        >
                                            <X className="w-3 h-3" /> Limpiar
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-400 uppercase mb-2 block">Categoría</label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value as PartnerCategory | 'all')}
                                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2"
                                        >
                                            <option value="all">Todas las categorías</option>
                                            {Object.entries(PARTNER_CATEGORIES).map(([key, config]) => (
                                                <option key={key} value={key}>{config.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-400 uppercase mb-2 block">Tier</label>
                                        <select
                                            value={selectedTier}
                                            onChange={(e) => setSelectedTier(e.target.value as PartnerTier | 'all')}
                                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2"
                                        >
                                            <option value="all">Todos los tiers</option>
                                            {Object.entries(TIER_CONFIG).map(([key, config]) => (
                                                <option key={key} value={key}>{config.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {topCategories.map(([catKey, count]) => {
                                const cat = PARTNER_CATEGORIES[catKey as PartnerCategory];
                                const Icon = CATEGORY_ICONS[catKey as PartnerCategory];
                                const isActive = selectedCategory === catKey;
                                return (
                                    <button
                                        key={catKey}
                                        onClick={() => setSelectedCategory(isActive ? 'all' : catKey as PartnerCategory)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${isActive
                                            ? 'text-white'
                                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                            }`}
                                        style={isActive ? { backgroundColor: cat.color } : {}}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {cat.name} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Main Content: Map + List */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Map */}
                            <div className="lg:col-span-2">
                                <PartnersMap partners={filteredPartners} />
                            </div>

                            {/* Partner List */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-white">
                                        Partners ({filteredPartners.length})
                                    </h3>
                                </div>

                                {filteredPartners.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400">
                                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        <p>No se encontraron partners</p>
                                    </div>
                                ) : (
                                    filteredPartners.map(partner => (
                                        <PartnerCard key={partner.id} partner={partner} />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Featured Partners */}
                        <section className="mt-12">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-400" />
                                Partners Destacados
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {NETWORK_STATS.top_partners.by_kg.slice(0, 3).map((top, i) => {
                                    // Try to find in loaded partners, if not loaded yet might be missing, 
                                    // but usually these are top partners so they should be in the list.
                                    const partner = partners.find(p => p.id === top.id);
                                    if (!partner) return null;
                                    return (
                                        <Link
                                            key={top.id}
                                            to={`/partners/${partner.slug}`}
                                            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 hover:border-yellow-500/50 transition-all group"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-2xl">
                                                    {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                                                </span>
                                                <TierBadge tier={partner.tier} size="md" />
                                            </div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-yellow-400 transition-colors">
                                                {partner.trade_name}
                                            </h3>
                                            <p className="text-sm text-slate-400 mb-3">{partner.location.city}</p>
                                            <div className="text-2xl font-black text-green-400">
                                                {(top.kg / 1000).toLocaleString()}t
                                            </div>
                                            <div className="text-xs text-slate-500">residuos trazados</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>

                        {/* CTA Banner */}
                        <section className="mt-12 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-2xl p-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-2xl font-black text-white mb-3">
                                    ¿Tienes un negocio que genera residuos orgánicos?
                                </h2>
                                <p className="text-slate-300 mb-6">
                                    La Ley de Economía Circular (enero 2026) requiere que grandes generadores (&gt;27 kg/día)
                                    demuestren manejo adecuado. Únete a la red y cumple automáticamente.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 mb-6">
                                    {['Cumple la ley', 'Ahorra en recolección', 'Atrae clientes', 'Mejora tu imagen ESG'].map(benefit => (
                                        <span key={benefit} className="flex items-center gap-1 text-green-400 text-sm">
                                            <span className="text-green-500">✓</span> {benefit}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    to="/partners/register"
                                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-xl transition-all"
                                >
                                    Registra tu negocio en 3 minutos
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default PartnersMapPage;
