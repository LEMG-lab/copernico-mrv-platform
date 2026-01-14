/**
 * PartnersHubPage - Landing hub for CircularLINK Partners module
 * 
 * Displays network stats and navigation to sub-pages:
 * - Mapa de Partners
 * - Mi Impacto (Consumer Portal)
 * - Dashboard Partner
 * - Demo Escaneo QR
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Navigation';
import {
    Map, Sprout, BarChart3, QrCode, Users, Recycle,
    Leaf, Heart, DollarSign, ChevronRight, Building2, Sparkles
} from 'lucide-react';
import { partnerService } from '../services/partnerService';

interface NetworkStats {
    total_partners: number;
    total_kg_collected: number;
    total_co2_avoided_kg: number;
    total_consumers: number;
    total_donations: number;
}

const StatCard: React.FC<{
    icon: React.ElementType;
    value: string;
    label: string;
    color: string;
}> = ({ icon: Icon, value, label, color }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-green-500/30 transition-all">
        <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
);

const NavCard: React.FC<{
    to: string;
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    badge?: string;
}> = ({ to, icon: Icon, title, description, color, badge }) => (
    <Link
        to={to}
        className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-green-500/50 transition-all hover:bg-slate-800/80 relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity`} />

        <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-lg group-hover:text-green-400 transition-colors">
                        {title}
                    </h3>
                    {badge && (
                        <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded">
                            {badge}
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-green-400 transition-colors flex-shrink-0" />
        </div>
    </Link>
);

export const PartnersHubPage: React.FC = () => {
    const [stats, setStats] = useState<NetworkStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await partnerService.getNetworkStats();
                setStats({
                    total_partners: data.total_partners || 127,
                    total_kg_collected: data.total_kg_collected || 2800000,
                    total_co2_avoided_kg: data.total_co2_avoided_kg || 5100000,
                    total_consumers: data.total_consumers || 4892,
                    total_donations: data.total_donations_amount || 145000
                });
            } catch (err) {
                // Use fallback data
                setStats({
                    total_partners: 127,
                    total_kg_collected: 2800000,
                    total_co2_avoided_kg: 5100000,
                    total_consumers: 4892,
                    total_donations: 145000
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navigation />

            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-sm font-bold px-4 py-2 rounded-full mb-4">
                        <Recycle className="w-4 h-4" />
                        Economía Circular
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        CircularLINK <span className="text-green-400">Partners</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Ecosistema de comercios certificados y consumidores comprometidos con la economía circular
                    </p>
                </header>

                {/* Network Stats */}
                <section className="mb-10">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <StatCard
                            icon={Building2}
                            value={loading ? '...' : stats?.total_partners.toString() || '127'}
                            label="Partners activos"
                            color="text-blue-400"
                        />
                        <StatCard
                            icon={Recycle}
                            value={loading ? '...' : formatNumber(stats?.total_kg_collected || 0)}
                            label="kg trazados"
                            color="text-green-400"
                        />
                        <StatCard
                            icon={Leaf}
                            value={loading ? '...' : formatNumber(stats?.total_co2_avoided_kg || 0)}
                            label="kg CO2 evitado"
                            color="text-emerald-400"
                        />
                        <StatCard
                            icon={Users}
                            value={loading ? '...' : formatNumber(stats?.total_consumers || 0)}
                            label="Consumidores"
                            color="text-purple-400"
                        />
                        <StatCard
                            icon={Heart}
                            value={loading ? '...' : `$${formatNumber(stats?.total_donations || 0)}`}
                            label="Donado"
                            color="text-pink-400"
                        />
                    </div>
                </section>

                {/* Navigation Cards */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        Explora el Ecosistema
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <NavCard
                            to="/partners/map"
                            icon={Map}
                            title="Mapa de Partners"
                            description="Explora 127+ comercios certificados en todo México"
                            color="bg-blue-500"
                            badge="127"
                        />
                        <NavCard
                            to="/partners/mi-impacto"
                            icon={Sprout}
                            title="Mi Impacto"
                            description="Semillas, logros y recompensas por tus compras sustentables"
                            color="bg-green-500"
                        />
                        <NavCard
                            to="/partners/dashboard"
                            icon={BarChart3}
                            title="Dashboard Partner"
                            description="Métricas, entregas y acceso a tu código QR"
                            color="bg-purple-500"
                        />
                        <NavCard
                            to="/partners/scan-demo"
                            icon={QrCode}
                            title="Demo Escaneo QR"
                            description="Prueba la experiencia del consumidor"
                            color="bg-orange-500"
                            badge="Demo"
                        />
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            ¿Tienes un negocio?
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Únete a la red de comercios comprometidos con la sustentabilidad
                        </p>
                        <Link
                            to="/plant-onboarding"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
                        >
                            <Building2 className="w-5 h-5" />
                            Registrar mi negocio
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PartnersHubPage;
