import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../../../components/Navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    MapPin, Phone, Mail, Globe, Instagram, ExternalLink,
    Recycle, Leaf, TreePine, Car, Droplets, Award,
    Calendar, TrendingUp, Users, Heart, QrCode,
    ChevronRight, Shield, CheckCircle, Clock, Flame, Navigation2, Eye
} from 'lucide-react';
import { partnerService } from '../services/partnerService';
import { Partner } from '../types/partners.types';
import { PARTNER_CATEGORIES } from '../data/partnerCategories';
import { TIER_CONFIG } from '../data/tierConfig';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Get Google Street View static image URL
const getStreetViewUrl = (lat: number, lng: number, size: string = '600x300') => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return null;
    return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=${apiKey}`;
};

export const PartnerDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [partner, setPartner] = useState<Partner | null>(null);
    const [loading, setLoading] = useState(true);
    const [streetViewError, setStreetViewError] = useState(false);

    useEffect(() => {
        const fetchPartner = async () => {
            if (!slug) return;
            try {
                const data = await partnerService.getPartnerBySlug(slug);
                setPartner(data);
            } catch (err) {
                console.error('Error fetching partner:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPartner();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Partner no encontrado</h1>
                    <Link to="/partners" className="text-green-400 hover:underline">
                        ← Volver al mapa
                    </Link>
                </div>
            </div>
        );
    }

    const categoryConfig = PARTNER_CATEGORIES[partner.category] || { color: '#95A5A6', name: 'Otro' };
    const tierConfig = TIER_CONFIG[partner.tier] || { color: '#CD7F32', name: 'Bronce', gradient: 'linear-gradient(135deg, #CD7F32, #B87333)', benefits: [] };
    const streetViewUrl = getStreetViewUrl(partner.location.coordinates.lat, partner.location.coordinates.lng);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navigation />

            <main className="max-w-5xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Logo */}
                        <div
                            className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${categoryConfig.color}20` }}
                        >
                            <span className="text-4xl">♻️</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-2xl md:text-3xl font-black text-white">
                                    {partner.trade_name}
                                </h1>
                                <span
                                    className="font-bold text-sm px-3 py-1 rounded-full"
                                    style={{
                                        background: tierConfig.gradient,
                                        color: partner.tier === 'platinum' || partner.tier === 'silver' ? '#1a1a2e' : '#fff'
                                    }}
                                >
                                    {tierConfig.name}
                                </span>
                                <span className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">
                                    <CheckCircle className="w-3 h-3" /> Verificado
                                </span>
                            </div>

                            <p className="text-slate-400 mb-3">{partner.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {partner.location.neighborhood}, {partner.location.city}
                                </span>
                                <span
                                    className="flex items-center gap-1 px-2 py-0.5 rounded"
                                    style={{ backgroundColor: `${categoryConfig.color}20`, color: categoryConfig.color }}
                                >
                                    {categoryConfig.name}
                                </span>
                                {partner.metrics.streak.current_weeks > 0 && (
                                    <span className="flex items-center gap-1 text-orange-400">
                                        <Flame className="w-4 h-4" />
                                        {partner.metrics.streak.current_weeks} semanas consecutivas
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* QR */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-white p-3 rounded-xl">
                                <QrCode className="w-20 h-20 text-slate-800" />
                            </div>
                            <span className="text-xs text-slate-500 font-mono">{partner.qr_short_code}</span>
                        </div>
                    </div>
                </div>

                {/* Customer Incentive Banner */}
                {partner.customer_incentive && (
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎁</span>
                            <div>
                                <p className="font-bold text-green-300">
                                    {partner.customer_incentive.value} - {partner.customer_incentive.description}
                                </p>
                                <p className="text-xs text-green-400/70">{partner.customer_incentive.terms}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-mono font-bold text-green-400">{partner.customer_incentive.redemption_code}</p>
                            <p className="text-xs text-slate-400">
                                {partner.customer_incentive.current_redemptions}/{partner.customer_incentive.max_redemptions} canjeados
                            </p>
                        </div>
                    </div>
                )}

                {/* Location: Map + Street View */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        Ubicación
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Mini Map */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden h-[250px]">
                            <MapContainer
                                center={[partner.location.coordinates.lat, partner.location.coordinates.lng]}
                                zoom={15}
                                style={{ height: '100%', width: '100%' }}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                />
                                <Marker position={[partner.location.coordinates.lat, partner.location.coordinates.lng]}>
                                    <Popup>
                                        <div className="font-bold text-slate-900">{partner.trade_name}</div>
                                        <div className="text-sm text-slate-600">{partner.location.address}</div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        {/* Street View */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden h-[250px] relative">
                            {streetViewUrl && !streetViewError ? (
                                <>
                                    <img
                                        src={streetViewUrl}
                                        alt="Street View"
                                        className="w-full h-full object-cover"
                                        onError={() => setStreetViewError(true)}
                                    />
                                    <div className="absolute top-3 left-3 bg-slate-900/80 rounded-lg px-3 py-1.5 flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-blue-400" />
                                        <span className="text-xs font-bold text-white">Street View</span>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/@${partner.location.coordinates.lat},${partner.location.coordinates.lng},3a,75y,235h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-3 right-3 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                                    >
                                        Abrir en Google Maps <ExternalLink className="w-3 h-3" />
                                    </a>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                    <Navigation2 className="w-12 h-12 mb-3 opacity-50" />
                                    <p className="text-sm font-bold">Street View no disponible</p>
                                    <a
                                        href={`https://www.google.com/maps?q=${partner.location.coordinates.lat},${partner.location.coordinates.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 text-blue-400 hover:underline text-sm flex items-center gap-1"
                                    >
                                        Ver en Google Maps <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Address details */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            {partner.location.address}, {partner.location.neighborhood}
                        </span>
                        <span className="flex items-center gap-2">
                            <Navigation2 className="w-4 h-4 text-slate-500" />
                            {partner.location.city}, {partner.location.state}
                        </span>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${partner.location.coordinates.lat},${partner.location.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Navigation2 className="w-4 h-4" />
                            Cómo llegar
                        </a>
                    </div>
                </section>

                {/* Impact Metrics */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-400" />
                        Impacto Verificado
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Recycle, value: `${(partner.metrics.lifetime.total_kg / 1000).toFixed(1)}t`, label: 'Residuos trazados', color: 'text-green-400' },
                            { icon: Leaf, value: `${(partner.metrics.lifetime.co2_avoided_kg / 1000).toFixed(1)}t`, label: 'CO2 evitado', color: 'text-emerald-400' },
                            { icon: TreePine, value: partner.metrics.lifetime.trees_equivalent.toLocaleString(), label: 'Árboles equivalentes', color: 'text-lime-400' },
                            { icon: Car, value: partner.metrics.lifetime.cars_off_road_days.toLocaleString(), label: 'Días sin auto', color: 'text-cyan-400' },
                            { icon: Droplets, value: `${(partner.metrics.lifetime.water_saved_liters / 1000).toFixed(0)}K`, label: 'Litros de agua', color: 'text-blue-400' },
                            { icon: Calendar, value: partner.metrics.lifetime.deliveries, label: 'Entregas totales', color: 'text-purple-400' },
                            { icon: Users, value: partner.metrics.lifetime.unique_scanners.toLocaleString(), label: 'Clientes verificaron', color: 'text-pink-400' },
                            { icon: Heart, value: `$${(partner.metrics.lifetime.donations_amount / 1000).toFixed(1)}K`, label: 'Donaciones recibidas', color: 'text-red-400' }
                        ].map((metric, i) => (
                            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                                <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                                <div className="text-2xl font-black text-white">{metric.value}</div>
                                <div className="text-xs text-slate-500">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Rankings */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Rankings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { rank: partner.metrics.rankings.city_rank, total: partner.metrics.rankings.city_total, label: partner.location.city },
                            { rank: partner.metrics.rankings.category_rank, total: partner.metrics.rankings.category_total, label: categoryConfig.name },
                            { rank: partner.metrics.rankings.national_rank, total: partner.metrics.rankings.national_total, label: 'Nacional' }
                        ].map((r, i) => (
                            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                                <div className="text-3xl font-black text-white">#{r.rank}</div>
                                <div>
                                    <div className="text-sm font-bold text-slate-300">{r.label}</div>
                                    <div className="text-xs text-slate-500">de {r.total} partners</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Monthly Chart */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Historial Mensual
                    </h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        {/* Chart */}
                        <div className="flex items-end justify-between gap-3 h-48 mb-4">
                            {partner.metrics.monthly.slice(0, 6).reverse().map((m, i) => {
                                const maxKg = Math.max(...partner.metrics.monthly.slice(0, 6).map(x => x.total_kg));
                                const height = maxKg > 0 ? (m.total_kg / maxKg) * 100 : 0;
                                const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                const monthIndex = parseInt(m.month.split('-')[1]) - 1;

                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        {/* Value label */}
                                        <div className="text-xs font-bold text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {m.total_kg.toLocaleString()} kg
                                        </div>
                                        {/* Bar container */}
                                        <div className="w-full h-36 flex items-end">
                                            <div
                                                className="w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-lg transition-all duration-300 group-hover:from-green-500 group-hover:to-emerald-300 relative min-h-[8px]"
                                                style={{ height: `${Math.max(height, 5)}%` }}
                                            >
                                                {/* Tooltip on hover */}
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                    {m.total_kg.toLocaleString()} kg
                                                </div>
                                            </div>
                                        </div>
                                        {/* Month label */}
                                        <span className="text-xs font-bold text-slate-400">
                                            {monthNames[monthIndex]}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                            <div className="text-center">
                                <div className="text-lg font-black text-white">
                                    {partner.metrics.monthly.slice(0, 6).reduce((sum, m) => sum + m.total_kg, 0).toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-500">kg últimos 6 meses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-black text-green-400">
                                    {Math.round(partner.metrics.monthly.slice(0, 6).reduce((sum, m) => sum + m.total_kg, 0) / 6).toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-500">promedio mensual</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-black text-emerald-400">
                                    {partner.metrics.monthly.slice(0, 6).reduce((sum, m) => sum + m.deliveries, 0)}
                                </div>
                                <div className="text-xs text-slate-500">entregas totales</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blockchain Verification */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        Verificación Blockchain
                    </h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-slate-500 uppercase mb-1">Wallet Address</p>
                                <p className="font-mono text-sm text-slate-300 break-all">{partner.blockchain.wallet_address}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase mb-1">Verification Hash</p>
                                <p className="font-mono text-sm text-slate-300 break-all">{partner.blockchain.verification_hash}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase mb-1">Primera Transacción</p>
                                <p className="text-slate-300">{new Date(partner.blockchain.first_transaction).toLocaleDateString('es-MX')}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase mb-1">Total Transacciones</p>
                                <p className="text-slate-300">{partner.blockchain.total_transactions}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-700 flex justify-center">
                            <a
                                href={`https://explorer.globalforce.io/transaction/${partner.blockchain.verification_hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-bold"
                            >
                                Ver en Global Force Explorer <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Contacto</h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-300">
                                    {partner.location.address}, {partner.location.neighborhood}, {partner.location.city}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-300">{partner.operations.operating_hours}</span>
                            </div>
                            {partner.digital.website && (
                                <a href={partner.digital.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-400 hover:underline">
                                    <Globe className="w-5 h-5" />
                                    {partner.digital.website.replace('https://', '')}
                                </a>
                            )}
                            {partner.digital.instagram && (
                                <a href={`https://instagram.com/${partner.digital.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-pink-400 hover:underline">
                                    <Instagram className="w-5 h-5" />
                                    {partner.digital.instagram}
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* Tier Benefits */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Beneficios Tier {tierConfig.name}</h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {tierConfig.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center py-8">
                    <p className="text-slate-400 mb-4">¿Consumiste en este establecimiento?</p>
                    <Link
                        to={`/scan/${partner.qr_short_code}`}
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
                    >
                        <QrCode className="w-5 h-5" />
                        Escanear y registrar mi impacto
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default PartnerDetailPage;
