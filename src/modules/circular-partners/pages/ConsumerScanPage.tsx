import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../../../components/Navigation';
import {
    CheckCircle, Leaf, Recycle, TreePine, Award, Heart,
    Share2, Facebook, MessageCircle, Copy, ExternalLink,
    Sprout, Star, Gift, ChevronRight, MapPin, Sparkles
} from 'lucide-react';
import { getPartnerBySlug, MOCK_PARTNERS } from '../data/mockPartners';
import { PARTNER_CATEGORIES } from '../data/partnerCategories';
import { TIER_CONFIG } from '../data/tierConfig';
import { SEEDS_CONFIG } from '../data/seedsConfig';
import { Partner } from '../types/partners.types';

// Simulated scan data
const simulateScanData = () => ({
    seeds_earned: SEEDS_CONFIG.earning.scan_qr.base,
    is_first_visit: Math.random() > 0.7,
    estimated_kg: Math.round(Math.random() * 2 + 0.5),
    scan_count_today: Math.floor(Math.random() * 5) + 1
});

const ConfettiEffect: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute w-3 h-3 animate-bounce"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'][i % 4],
                    borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    animation: `fall ${2 + Math.random() * 2}s ease-in forwards`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    transform: `rotate(${Math.random() * 360}deg)`
                }}
            />
        ))}
        <style>{`
            @keyframes fall {
                to {
                    transform: translateY(120vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `}</style>
    </div>
);

const ImpactCard: React.FC<{ icon: React.ElementType; value: string; label: string; color: string }> =
    ({ icon: Icon, value, label, color }) => (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
            <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
            <div className="text-xl font-black text-white">{value}</div>
            <div className="text-[10px] text-slate-500 uppercase">{label}</div>
        </div>
    );

const NearbyPartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
    const categoryConfig = PARTNER_CATEGORIES[partner.category] || { color: '#95A5A6', name: 'Otro' };
    return (
        <Link
            to={`/partners/${partner.slug}`}
            className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:border-green-500/50 transition-all"
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${categoryConfig.color}20` }}
            >
                <span className="text-lg">♻️</span>
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-sm truncate">{partner.trade_name}</h4>
                <p className="text-xs text-slate-400">{partner.location.neighborhood}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600" />
        </Link>
    );
};

export const ConsumerScanPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const [showConfetti, setShowConfetti] = useState(true);
    const [copiedCode, setCopiedCode] = useState(false);
    const [donationAmount, setDonationAmount] = useState<number | null>(null);

    // Find partner by QR short code
    const partner = MOCK_PARTNERS.find(p => p.qr_short_code === code);
    const scanData = simulateScanData();

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!partner) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-xl font-bold text-white mb-2">Código no encontrado</h1>
                    <p className="text-slate-400 mb-6">El código QR "{code}" no corresponde a ningún partner registrado.</p>
                    <Link
                        to="/partners"
                        className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl"
                    >
                        <MapPin className="w-4 h-4" /> Ver mapa de partners
                    </Link>
                </div>
            </div>
        );
    }

    const categoryConfig = PARTNER_CATEGORIES[partner.category] || { color: '#95A5A6', name: 'Otro' };
    const tierConfig = TIER_CONFIG[partner.tier] || { color: '#CD7F32', name: 'Bronce', gradient: 'linear-gradient(135deg, #CD7F32, #B87333)' };
    const totalSeeds = scanData.seeds_earned + (scanData.is_first_visit ? SEEDS_CONFIG.earning.first_scan_partner.base : 0);

    const copyIncentiveCode = () => {
        if (partner.customer_incentive?.redemption_code) {
            navigator.clipboard.writeText(partner.customer_incentive.redemption_code);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
        }
    };

    const shareUrl = `${window.location.origin}/scan/${code}`;
    const shareText = `¡Acabo de apoyar la economía circular en ${partner.trade_name}! 🌱♻️`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {showConfetti && <ConfettiEffect />}

            <Navigation />

            <main className="max-w-md mx-auto px-4 py-6">
                {/* Success Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-1">
                        ¡Gracias por tu visita!
                    </h1>
                    <p className="text-slate-400">
                        Tu consumo impulsa la economía circular
                    </p>
                </div>

                {/* Partner Card */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 mb-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${categoryConfig.color}20` }}
                        >
                            <span className="text-2xl">♻️</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="font-bold text-white text-lg">{partner.trade_name}</h2>
                                <span className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded">
                                    <CheckCircle className="w-3 h-3" /> Verificado
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span
                                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                        background: tierConfig.gradient,
                                        color: partner.tier === 'platinum' || partner.tier === 'silver' ? '#1a1a2e' : '#fff'
                                    }}
                                >
                                    {tierConfig.name}
                                </span>
                                <span className="text-xs text-slate-400">{partner.location.city}</span>
                            </div>
                        </div>
                    </div>
                    <Link
                        to={`/partners/${partner.slug}`}
                        className="block mt-4 text-center text-sm text-blue-400 hover:underline"
                    >
                        Ver perfil completo →
                    </Link>
                </div>

                {/* Seeds Earned */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-5 mb-6 text-center">
                    <Sprout className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-4xl font-black text-green-400 mb-1">
                        +{totalSeeds} <span className="text-lg">semillas</span>
                    </div>
                    <p className="text-green-300/70 text-sm">
                        {scanData.is_first_visit && (
                            <span className="flex items-center justify-center gap-1">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                ¡Bonus de primera visita! (+{SEEDS_CONFIG.earning.first_scan_partner.base})
                            </span>
                        )}
                    </p>
                    <p className="text-slate-400 text-xs mt-2">
                        Canjea semillas por descuentos, productos y experiencias
                    </p>
                </div>

                {/* Customer Incentive */}
                {partner.customer_incentive && (
                    <div className="bg-slate-800/50 border border-yellow-500/30 rounded-xl p-5 mb-6">
                        <div className="flex items-start gap-3">
                            <Gift className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-bold text-white mb-1">
                                    🎁 {partner.customer_incentive.value}
                                </h3>
                                <p className="text-sm text-slate-300 mb-2">
                                    {partner.customer_incentive.description}
                                </p>
                                {partner.customer_incentive.terms && (
                                    <p className="text-xs text-slate-500 mb-3">{partner.customer_incentive.terms}</p>
                                )}
                                <button
                                    onClick={copyIncentiveCode}
                                    className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-mono font-bold px-4 py-2 rounded-lg transition-all"
                                >
                                    {partner.customer_incentive.redemption_code}
                                    {copiedCode ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Impact Attribution */}
                <section className="mb-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Tu impacto estimado</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <ImpactCard icon={Recycle} value={`${scanData.estimated_kg}kg`} label="Residuos desviados" color="text-green-400" />
                        <ImpactCard icon={Leaf} value={`${(scanData.estimated_kg * 1.8).toFixed(1)}kg`} label="CO2 evitado" color="text-emerald-400" />
                        <ImpactCard icon={TreePine} value={`${Math.ceil(scanData.estimated_kg * 0.05)}`} label="Árboles equiv." color="text-lime-400" />
                    </div>
                </section>

                {/* Donate Widget */}
                <section className="mb-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400" /> Amplifica tu impacto
                    </h3>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <p className="text-sm text-slate-300 mb-4">
                            Dona a proyectos de economía circular y gana semillas extra
                        </p>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {[20, 50, 100, 200].map(amount => (
                                <button
                                    key={amount}
                                    onClick={() => setDonationAmount(donationAmount === amount ? null : amount)}
                                    className={`py-2 rounded-lg font-bold text-sm transition-all ${donationAmount === amount
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    ${amount}
                                </button>
                            ))}
                        </div>
                        {donationAmount && (
                            <div className="flex items-center justify-between bg-pink-500/10 rounded-lg p-3 mb-3">
                                <span className="text-sm text-slate-300">
                                    Ganarás <span className="font-bold text-green-400">+{donationAmount * 2} semillas</span>
                                </span>
                                <button className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-4 py-1.5 rounded-lg text-sm transition-all">
                                    Donar ${donationAmount}
                                </button>
                            </div>
                        )}
                        <p className="text-xs text-slate-500 text-center">
                            100% va a +1AC y proyectos verificados
                        </p>
                    </div>
                </section>

                {/* Share */}
                <section className="mb-8">
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Comparte y gana semillas
                    </h3>
                    <div className="flex gap-3">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            <MessageCircle className="w-5 h-5" /> WhatsApp
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            <Facebook className="w-5 h-5" /> Facebook
                        </a>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-2">
                        +{SEEDS_CONFIG.earning.social_share.base} semillas por compartir
                    </p>
                </section>

                {/* Nearby Partners */}
                <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Partners cercanos
                    </h3>
                    <div className="space-y-2">
                        {MOCK_PARTNERS.filter(p => p.id !== partner.id).slice(0, 3).map(p => (
                            <NearbyPartnerCard key={p.id} partner={p} />
                        ))}
                    </div>
                    <Link
                        to="/partners"
                        className="block mt-4 text-center text-sm text-green-400 hover:underline"
                    >
                        Ver todos los partners →
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default ConsumerScanPage;
