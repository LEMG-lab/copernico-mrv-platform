import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Navigation';
import {
    Recycle, Leaf, TrendingUp, Users, Heart, Calendar,
    QrCode, Award, Gift, ChevronRight, Download, Share2,
    Flame, Target, Trophy, Clock, Package, Truck,
    CheckCircle, AlertCircle, Star, Medal
} from 'lucide-react';
import { MOCK_PARTNERS, MOCK_DELIVERIES } from '../data/mockPartners';
import { TIER_CONFIG } from '../data/tierConfig';
import { PARTNER_CHALLENGES } from '../data/achievementsConfig';

// Mock: Use first partner as "logged in" partner
const currentPartner = MOCK_PARTNERS[0];
const tierConfig = TIER_CONFIG[currentPartner.tier];

const StatCard: React.FC<{
    icon: React.ElementType;
    value: string | number;
    label: string;
    change?: number;
    color: string;
}> = ({ icon: Icon, value, label, change, color }) => (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-start justify-between">
            <Icon className={`w-5 h-5 ${color}`} />
            {change !== undefined && (
                <span className={`text-xs font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change >= 0 ? '+' : ''}{change}%
                </span>
            )}
        </div>
        <div className="text-2xl font-black text-white mt-2">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
    </div>
);

const ChallengeCard: React.FC<{ challenge: typeof PARTNER_CHALLENGES[0]; progress: number }> = ({ challenge, progress }) => {
    const percentage = Math.min((progress / challenge.target) * 100, 100);
    const isComplete = progress >= challenge.target;

    return (
        <div className={`bg-slate-800/50 border rounded-xl p-4 ${isComplete ? 'border-green-500/50' : 'border-slate-700'}`}>
            <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isComplete ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                    {isComplete ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                        <Target className="w-5 h-5 text-slate-400" />
                    )}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">{challenge.name}</h4>
                    <p className="text-xs text-slate-400">{challenge.description}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${challenge.type === 'weekly' ? 'bg-blue-500/20 text-blue-400' :
                    challenge.type === 'monthly' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {challenge.type === 'weekly' ? 'Semanal' : challenge.type === 'monthly' ? 'Mensual' : 'Especial'}
                </span>
            </div>
            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{progress}/{challenge.target}</span>
                <span className="text-green-400">+{challenge.xp_reward} XP</span>
            </div>
        </div>
    );
};

const DeliveryRow: React.FC<{ delivery: typeof MOCK_DELIVERIES[0] }> = ({ delivery }) => (
    <div className="flex items-center gap-4 py-3 border-b border-slate-700/50 last:border-0">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${delivery.status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
            }`}>
            {delivery.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
                <Clock className="w-5 h-5 text-yellow-400" />
            )}
        </div>
        <div className="flex-1">
            <div className="font-bold text-white text-sm">
                {new Date(delivery.collected_at).toLocaleDateString('es-MX', {
                    weekday: 'short', day: 'numeric', month: 'short'
                })}
            </div>
            <div className="text-xs text-slate-400">{delivery.plant_name}</div>
        </div>
        <div className="text-right">
            <div className="font-bold text-green-400">{delivery.weight_kg} kg</div>
            <div className="text-xs text-slate-500">{delivery.impact.co2_avoided_kg.toFixed(1)} kg CO2</div>
        </div>
    </div>
);

export const PartnerDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'deliveries' | 'achievements' | 'qr'>('overview');

    const monthlyData = currentPartner.metrics.current_month;
    const lifetimeData = currentPartner.metrics.lifetime;
    const gamification = currentPartner.gamification;

    const xpProgress = (gamification.xp_current / gamification.xp_next_level) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navigation />

            <main className="max-w-5xl mx-auto px-4 py-6">
                {/* Partner Header */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <span className="text-2xl">♻️</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-white">{currentPartner.trade_name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span
                                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                                        style={{
                                            background: tierConfig.gradient,
                                            color: currentPartner.tier === 'platinum' || currentPartner.tier === 'silver' ? '#1a1a2e' : '#fff'
                                        }}
                                    >
                                        {tierConfig.name}
                                    </span>
                                    <span className="text-xs text-slate-400">Nivel {gamification.level}</span>
                                </div>
                            </div>
                        </div>

                        {/* XP Progress */}
                        <div className="flex-1 max-w-xs">
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-400">XP</span>
                                <span className="text-green-400">{gamification.xp_current}/{gamification.xp_next_level}</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                    style={{ width: `${xpProgress}%` }}
                                />
                            </div>
                        </div>

                        {/* Streak */}
                        <div className="flex items-center gap-2 bg-orange-500/10 rounded-lg px-3 py-2">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <div>
                                <div className="font-bold text-white text-sm">{currentPartner.metrics.streak.current_weeks}</div>
                                <div className="text-[10px] text-orange-400">semanas</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'overview', label: 'Resumen', icon: TrendingUp },
                        { id: 'deliveries', label: 'Entregas', icon: Truck },
                        { id: 'achievements', label: 'Logros', icon: Trophy },
                        { id: 'qr', label: 'Mi QR', icon: QrCode }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <>
                        {/* Monthly Stats */}
                        <section className="mb-8">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                Este Mes
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard icon={Recycle} value={`${monthlyData.total_kg.toLocaleString()} kg`} label="Residuos trazados" change={12} color="text-green-400" />
                                <StatCard icon={Leaf} value={`${monthlyData.co2_avoided_kg.toLocaleString()} kg`} label="CO2 evitado" change={15} color="text-emerald-400" />
                                <StatCard icon={Users} value={monthlyData.scans} label="Escaneos QR" change={8} color="text-cyan-400" />
                                <StatCard icon={Heart} value={`$${monthlyData.donations_amount.toLocaleString()}`} label="Donaciones" change={23} color="text-pink-400" />
                            </div>
                        </section>

                        {/* Active Challenges */}
                        <section className="mb-8">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-yellow-400" />
                                Retos Activos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PARTNER_CHALLENGES.slice(0, 4).map((challenge, i) => (
                                    <ChallengeCard
                                        key={challenge.id}
                                        challenge={challenge}
                                        progress={Math.floor(Math.random() * challenge.target * 1.2)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Rankings */}
                        <section className="mb-8">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Medal className="w-5 h-5 text-yellow-400" />
                                Tus Rankings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { rank: currentPartner.metrics.rankings.city_rank, total: currentPartner.metrics.rankings.city_total, label: currentPartner.location.city, color: 'text-blue-400' },
                                    { rank: currentPartner.metrics.rankings.category_rank, total: currentPartner.metrics.rankings.category_total, label: 'Restaurantes', color: 'text-purple-400' },
                                    { rank: currentPartner.metrics.rankings.national_rank, total: currentPartner.metrics.rankings.national_total, label: 'Nacional', color: 'text-green-400' }
                                ].map((r, i) => (
                                    <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                                        <div className={`text-3xl font-black ${r.color}`}>#{r.rank}</div>
                                        <div>
                                            <div className="font-bold text-white">{r.label}</div>
                                            <div className="text-xs text-slate-400">de {r.total} partners</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {activeTab === 'deliveries' && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Package className="w-5 h-5 text-green-400" />
                                Historial de Entregas
                            </h2>
                            <button className="text-sm text-blue-400 hover:underline flex items-center gap-1">
                                <Download className="w-4 h-4" /> Exportar
                            </button>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
                            <div className="grid grid-cols-3 gap-4 text-center py-4 border-b border-slate-700">
                                <div>
                                    <div className="text-2xl font-black text-white">{lifetimeData.deliveries}</div>
                                    <div className="text-xs text-slate-400">Total entregas</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-green-400">{(lifetimeData.total_kg / 1000).toFixed(1)}t</div>
                                    <div className="text-xs text-slate-400">Total kg</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white">{currentPartner.metrics.averages.kg_per_delivery}</div>
                                    <div className="text-xs text-slate-400">Promedio/entrega</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                {[...MOCK_DELIVERIES, ...MOCK_DELIVERIES, ...MOCK_DELIVERIES].slice(0, 10).map((d, i) => (
                                    <DeliveryRow key={i} delivery={{ ...d, collected_at: new Date(Date.now() - i * 86400000).toISOString() }} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'achievements' && (
                    <section>
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            Logros Desbloqueados ({gamification.achievements.length})
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {gamification.achievements.map((achievement, i) => (
                                <div key={i} className="bg-slate-800/50 border border-green-500/30 rounded-xl p-4 text-center">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                                        <Star className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">{achievement.name}</h4>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {new Date(achievement.unlocked_at || '').toLocaleDateString('es-MX')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-slate-400" />
                            Próximos Logros
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: "Partner del Mes", description: "Sé nombrado Partner del Mes", progress: 80 },
                                { name: "Referidos x5", description: "Refiere 5 nuevos partners", progress: 60 },
                                { name: "Año Perfecto", description: "52 semanas consecutivas", progress: 50 }
                            ].map((a, i) => (
                                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                                            <Star className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{a.name}</h4>
                                            <p className="text-xs text-slate-400">{a.description}</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-500 rounded-full" style={{ width: `${a.progress}%` }} />
                                    </div>
                                    <div className="text-right text-xs text-slate-500 mt-1">{a.progress}%</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'qr' && (
                    <section>
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <QrCode className="w-5 h-5 text-blue-400" />
                            Código QR de tu negocio
                        </h2>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center mb-6">
                            <div className="bg-white p-6 rounded-xl inline-block mb-4">
                                <QrCode className="w-32 h-32 text-slate-800" />
                            </div>
                            <p className="font-mono text-lg text-white font-bold mb-2">{currentPartner.qr_short_code}</p>
                            <p className="text-slate-400 text-sm mb-4">
                                Muestra este código en tu establecimiento para que tus clientes escaneen y verifiquen tu compromiso ambiental
                            </p>
                            <div className="flex justify-center gap-3">
                                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-4 py-2 rounded-lg transition-all">
                                    <Download className="w-4 h-4" /> Descargar PNG
                                </button>
                                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-lg transition-all">
                                    <Share2 className="w-4 h-4" /> Compartir
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-5">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <Gift className="w-5 h-5 text-green-400" />
                                Incentivo para clientes
                            </h3>
                            {currentPartner.customer_incentive ? (
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-green-300">{currentPartner.customer_incentive.value}</span>
                                        <span className="text-xs text-slate-400">
                                            {currentPartner.customer_incentive.current_redemptions}/{currentPartner.customer_incentive.max_redemptions} canjeados
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 mb-2">{currentPartner.customer_incentive.description}</p>
                                    <p className="text-xs text-slate-500">{currentPartner.customer_incentive.terms}</p>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-slate-400 mb-3">Aún no tienes un incentivo configurado</p>
                                    <button className="bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-2 rounded-lg transition-all">
                                        Crear incentivo
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default PartnerDashboardPage;
