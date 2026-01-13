import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Navigation';
import {
    Sprout, Trophy, Gift, History, MapPin, Star, ChevronRight,
    TrendingUp, Award, Target, Zap, Heart, ArrowUp, ArrowDown,
    CheckCircle, Lock, Clock, QrCode, Share2, Users, Flame
} from 'lucide-react';
import { REDEEMABLE_ITEMS, CONSUMER_LEVELS, getLevelByXp } from '../data/seedsConfig';
import { SeedsBalance } from '../components/Gamification/SeedsBalance';
import { AchievementCard } from '../components/Gamification/AchievementCard';

import { consumerService } from '../services/consumerService';
import { gamificationService } from '../services/gamificationService';
import { Consumer, SeedsTransaction, Achievement, RedeemableItem, Challenge } from '../types/partners.types';

type TabType = 'overview' | 'history' | 'achievements' | 'rewards';

export const ConsumerPortalPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // State
    const [consumer, setConsumer] = useState<Consumer | null>(null);
    const [transactions, setTransactions] = useState<SeedsTransaction[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [rewards, setRewards] = useState<RedeemableItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, txData, achData, rewardData] = await Promise.all([
                    consumerService.getProfile(),
                    consumerService.getTransactions(),
                    gamificationService.getAchievements(),
                    gamificationService.getRewards()
                ]);
                setConsumer(profileData);
                setTransactions(txData);
                setAchievements(achData);
                setRewards(rewardData);
            } catch (error) {
                console.error('Error loading portal data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: 'Resumen', icon: Sprout },
        { id: 'history', label: 'Historial', icon: History },
        { id: 'achievements', label: 'Logros', icon: Trophy },
        { id: 'rewards', label: 'Canjear', icon: Gift }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!consumer) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                Error al cargar perfil. Por favor inicia sesión.
            </div>
        );
    }

    // Calculate progress display
    const xpProgress = ((consumer.level.xp_current) / (consumer.level.xp_next_level)) * 100;

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-20">
            <Navigation />

            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>

                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        {/* Avatar & Level */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-slate-700 overflow-hidden bg-slate-800">
                                <img
                                    src={consumer.avatar_url || `https://ui-avatars.com/api/?name=${consumer.name}&background=random`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${consumer.level.current === 'eco_legend' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-green-500/20 text-green-400 border-green-500/50'}`}>
                                    Nvl {consumer.level.current.replace('eco_', '').toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl font-bold text-white mb-1">{consumer.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-400 mb-3">
                                <span className="flex items-center gap-1">
                                    <Trophy className="w-3 h-3 text-yellow-400" />
                                    {consumer.level.xp_current} XP
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {consumer.impact.unique_partners} lugares
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {consumer.referrals_count} referidos
                                </span>
                            </div>

                            {/* XP Bar */}
                            <div className="max-w-xs mx-auto md:mx-0">
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>Progreso de nivel</span>
                                    <span>{consumer.level.xp_current} / {consumer.level.xp_next_level} XP</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${xpProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Seeds Balance */}
                        <div className="text-right">
                            <div className="text-3xl font-black text-green-400">{consumer.seeds.balance.toLocaleString()}</div>
                            <div className="text-xs text-green-300/70">🌱 semillas</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {
                    activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Impact Stats */}
                            <section>
                                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                    Mi Impacto Ambiental
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { icon: Sprout, value: `${consumer.impact.total_kg_supported.toFixed(1)}`, unit: 'kg', label: 'Residuos desviados', color: 'text-green-400' },
                                        { icon: TrendingUp, value: `${consumer.impact.total_co2_avoided_kg.toFixed(0)}`, unit: 'kg', label: 'CO2 evitado', color: 'text-emerald-400' },
                                        { icon: Heart, value: `$${(consumer.seeds.lifetime_redeemed * 0.5).toFixed(0)}`, unit: '', label: 'Donado a causas', color: 'text-pink-400' },
                                        { icon: MapPin, value: consumer.impact.unique_partners, unit: '', label: 'Comercios visitados', color: 'text-cyan-400' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                                            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                                            <div className="text-xl font-black text-white">
                                                {stat.value}<span className="text-sm font-normal text-slate-400">{stat.unit}</span>
                                            </div>
                                            <div className="text-xs text-slate-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Active Challenges */}
                            <section>
                                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-orange-400" />
                                    Retos Activos
                                </h2>
                                <div className="space-y-3">
                                    {/* Fallback to mock logic for now since activeChallenges isn't fully in consumer object yet */}
                                    {consumer.current_challenges?.map((challengeId, i) => {
                                        // Mock lookup for rendering purpose
                                        const challenge = {
                                            name: 'Escaneo del Día',
                                            description: 'Escanea al menos 1 partner hoy',
                                            ends_at: new Date(Date.now() + 86400000).toISOString(),
                                            progress: { current: 0, target: 1 },
                                            seeds_reward: 20
                                        };
                                        const progress = (challenge.progress.current / challenge.progress.target) * 100;
                                        const daysLeft = Math.ceil((new Date(challenge.ends_at).getTime() - Date.now()) / 86400000);
                                        return (
                                            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-white">{challenge.name}</h3>
                                                        <p className="text-xs text-slate-400">{challenge.description}</p>
                                                    </div>
                                                    <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded">
                                                        <Clock className="w-3 h-3" /> {daysLeft}d
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-slate-400">
                                                        {challenge.progress.current}/{challenge.progress.target}
                                                    </span>
                                                    <span className="text-xs text-green-400 font-bold">
                                                        +{challenge.seeds_reward} 🌱
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Recent Activity */}
                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <History className="w-5 h-5 text-purple-400" />
                                        Actividad Reciente
                                    </h2>
                                    <button
                                        onClick={() => setActiveTab('history')}
                                        className="text-sm text-blue-400 hover:underline"
                                    >
                                        Ver todo
                                    </button>
                                </div>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-xl divide-y divide-slate-700">
                                    {transactions.slice(0, 5).map(tx => (
                                        <div key={tx.id} className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'earn' || tx.type === 'bonus' ? 'bg-green-500/20' : 'bg-red-500/20'
                                                    }`}>
                                                    {tx.type === 'earn' || tx.type === 'bonus' ? (
                                                        <ArrowUp className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <ArrowDown className="w-4 h-4 text-red-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white">{tx.description}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {new Date(tx.created_at).toLocaleDateString('es-MX', {
                                                            day: 'numeric', month: 'short'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`font-bold ${tx.type === 'earn' || tx.type === 'bonus' ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                                {tx.type === 'earn' || tx.type === 'bonus' ? '+' : '-'}{tx.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Referral Banner */}
                            <section className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-5">
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl">🎁</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white mb-1">Invita amigos y gana semillas</h3>
                                        <p className="text-sm text-purple-200/70">
                                            Gana 100 🌱 por cada amigo que se registre con tu código
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-slate-900/50 rounded-lg px-4 py-2 font-mono font-bold text-purple-300 text-lg">
                                            {consumer.referral_code}
                                        </div>
                                        <button className="mt-2 text-xs text-purple-400 flex items-center gap-1 mx-auto hover:underline">
                                            <Share2 className="w-3 h-3" /> Compartir
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )
                }

                {
                    activeTab === 'history' && (
                        <div className="space-y-4">
                            <SeedsBalance
                                balance={consumer.seeds.balance}
                                lifetimeEarned={consumer.seeds.lifetime_earned}
                                lifetimeRedeemed={consumer.seeds.lifetime_redeemed}
                                recentTransactions={transactions}
                            />

                            {/* Full Transaction List */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
                                <div className="p-4 border-b border-slate-700">
                                    <h3 className="font-bold text-white">Todas las transacciones</h3>
                                </div>
                                <div className="divide-y divide-slate-700/50">
                                    {transactions.map(tx => (
                                        <div key={tx.id} className="flex items-center justify-between p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'earn' ? 'bg-green-500/20' :
                                                    tx.type === 'bonus' ? 'bg-yellow-500/20' :
                                                        tx.type === 'spend' ? 'bg-red-500/20' : 'bg-blue-500/20'
                                                    }`}>
                                                    {tx.type === 'earn' && <Sprout className="w-5 h-5 text-green-400" />}
                                                    {tx.type === 'bonus' && <Zap className="w-5 h-5 text-yellow-400" />}
                                                    {tx.type === 'spend' && <Gift className="w-5 h-5 text-red-400" />}
                                                    {tx.type === 'refund' && <ArrowUp className="w-5 h-5 text-blue-400" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{tx.description}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {new Date(tx.created_at).toLocaleDateString('es-MX', {
                                                            weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`font-bold ${tx.type === 'earn' || tx.type === 'bonus' || tx.type === 'refund'
                                                    ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    {tx.type === 'earn' || tx.type === 'bonus' || tx.type === 'refund' ? '+' : '-'}{tx.amount}
                                                </span>
                                                <p className="text-xs text-slate-500">Balance: {tx.balance_after}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    activeTab === 'achievements' && (
                        <div className="space-y-6">
                            {/* Unlocked */}
                            <section>
                                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                    Logros Desbloqueados ({achievements.filter(a => a.unlocked).length})
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {achievements.filter(a => a.unlocked).map((achievement, i) => (
                                        <AchievementCard key={i} achievement={achievement as any} size="sm" />
                                    ))}
                                </div>
                            </section>

                            {/* In Progress */}
                            <section>
                                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-slate-400" />
                                    Próximos Logros
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {achievements.filter(a => !a.unlocked).slice(0, 6).map((achievement, i) => (
                                        <AchievementCard key={i} achievement={achievement as any} size="sm" />
                                    ))}
                                </div>
                            </section>
                        </div>
                    )
                }

                {
                    activeTab === 'rewards' && (
                        <div className="space-y-6">
                            {/* Balance reminder */}
                            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Sprout className="w-8 h-8 text-green-400" />
                                    <div>
                                        <p className="font-bold text-white">Tu balance disponible</p>
                                        <p className="text-xs text-green-300/70">Canjea por recompensas o dona a causas</p>
                                    </div>
                                </div>
                                <div className="text-3xl font-black text-green-400">
                                    {consumer.seeds.balance.toLocaleString()} 🌱
                                </div>
                            </div>

                            {/* Rewards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {rewards.map((item, i) => {
                                    const canAfford = consumer.seeds.balance >= item.seeds_cost;
                                    return (
                                        <div
                                            key={i}
                                            className={`bg-slate-800/50 border rounded-xl p-4 transition-all ${canAfford
                                                ? 'border-slate-700 hover:border-green-500/50'
                                                : 'border-slate-800 opacity-60'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="text-3xl">{item.image_url}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-white">{item.name}</h3>
                                                        <span className={`text-xs px-2 py-0.5 rounded ${item.category === 'discount' ? 'bg-blue-500/20 text-blue-400' :
                                                            item.category === 'donation' ? 'bg-pink-500/20 text-pink-400' :
                                                                item.category === 'experience' ? 'bg-purple-500/20 text-purple-400' :
                                                                    'bg-green-500/20 text-green-400'
                                                            }`}>
                                                            {item.category === 'discount' ? 'Descuento' :
                                                                item.category === 'donation' ? 'Donación' :
                                                                    item.category === 'experience' ? 'Experiencia' : 'Producto'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 mb-3">{item.description}</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-green-400">
                                                            {item.seeds_cost.toLocaleString()} 🌱
                                                        </span>
                                                        <button
                                                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${canAfford
                                                                ? 'bg-green-500 hover:bg-green-400 text-white'
                                                                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                                                }`}
                                                            disabled={!canAfford}
                                                        >
                                                            {canAfford ? 'Canjear' : 'Insuficiente'}
                                                        </button>
                                                    </div>
                                                    {item.quantity_available !== undefined && item.quantity_available < 50 && (
                                                        <p className="text-xs text-orange-400 mt-2">
                                                            ⚡ Quedan {item.quantity_available} disponibles
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Donation CTA */}
                            <div className="bg-gradient-to-r from-pink-900/50 to-red-900/50 border border-pink-500/30 rounded-xl p-5 text-center">
                                <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                                <h3 className="font-bold text-white text-lg mb-2">Dona tus semillas a una buena causa</h3>
                                <p className="text-sm text-pink-200/70 mb-4">
                                    Cada 100 semillas = $10 MXN para reforestación y educación ambiental
                                </p>
                                <Link
                                    to="/donate"
                                    className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white font-bold px-6 py-2 rounded-xl transition-all"
                                >
                                    Donar semillas <Heart className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    )
                }

                {/* Bottom CTA */}
                <div className="mt-8 text-center">
                    <p className="text-slate-400 mb-3">¿Visitaste un comercio circular?</p>
                    <Link
                        to="/partners"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
                    >
                        <QrCode className="w-5 h-5" />
                        Escanear QR y ganar semillas
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </main >
        </div >
    );
};

export default ConsumerPortalPage;
