/**
 * HomePage - Landing page de LarvaLINK MRV
 */

import React, { useEffect, useState } from 'react';
import { useCopernicus } from '@/hooks';
import { useAppStore } from '@/stores';
import { SENTINEL_MISSIONS } from '@/api/config';
import { SynapticBackground } from '../../components/SynapticBackground';
import './HomePage.css';

export const HomePage: React.FC = () => {
    // ... hooks ...
    const { authenticate, loadCollections, isAuthenticated } = useCopernicus();
    const { collections, isLoading, addNotification } = useAppStore();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            // Intentar cargar colecciones al inicio (sin auth para demo)
            loadCollections().catch(() => {
                addNotification({
                    type: 'info',
                    message: '💡 Configura tus credenciales para conectar con Copernicus',
                });
            });
        }
    }, [initialized, loadCollections, addNotification]);

    const handleConnect = async () => {
        await authenticate();
        await loadCollections();
    };

    return (
        <div className="home-page relative overflow-hidden">
            <SynapticBackground />

            {/* MetaBioconversion 3.0 Header */}
            <header className="relative z-50 bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#0f172a] border-b border-emerald-900/30 shadow-2xl backdrop-blur-sm bg-opacity-90">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-900 to-green-950 border border-emerald-500/30 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-overlay"></div>
                                <span className="text-2xl relative z-10 drop-shadow-lg">🧬</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-white tracking-tight"
                                style={{ textShadow: '0 2px 10px rgba(16, 185, 129, 0.2)' }}>
                                MetaBioconversion <span className="font-light text-emerald-400">3.0</span>
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="h-0.5 w-8 bg-emerald-500/50 rounded-full"></span>
                                <p className="text-[10px] font-bold text-emerald-300/80 tracking-[0.2em] uppercase">
                                    Sustentabilidad • Cambio Climático
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status/Metrics Section - Visual only */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="text-right">
                            <div className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-bold">Network Status</div>
                            <div className="flex items-center justify-end gap-2 text-emerald-100 font-mono text-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Online
                            </div>
                        </div>
                        <div className="h-8 w-px bg-emerald-800/50"></div>
                        <div className="text-right">
                            <div className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-bold">Carbon Offset</div>
                            <div className="text-white font-mono text-sm">2,847 tCO2e</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero relative z-10">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge badge-primary">🛰️ Observación Terrestre</span>
                    </div>

                    <h1 className="hero-title">
                        Explora la Tierra desde el espacio con{' '}
                        <span className="gradient-text">Copernicus</span>
                    </h1>

                    <p className="hero-description">
                        Accede a petabytes de datos satelitales de las misiones Sentinel de la ESA.
                        Visualiza, analiza y descarga imágenes de observación terrestre de alta resolución.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleConnect}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner-small" />
                                    Conectando...
                                </>
                            ) : isAuthenticated ? (
                                <>
                                    <span className="status-connected" />
                                    Conectado
                                </>
                            ) : (
                                <>Conectar con Copernicus</>
                            )}
                        </button>

                        <a
                            href="https://dataspace.copernicus.eu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            Más información
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="earth-container">
                        <div className="earth">
                            <div className="earth-glow" />
                        </div>
                        <div className="satellite satellite-1">🛰️</div>
                        <div className="satellite satellite-2">🛰️</div>
                        <div className="satellite satellite-3">📡</div>
                    </div>
                </div>
            </section>

            {/* Missions Section */}
            <section className="missions-section">
                <h2 className="section-heading">Misiones Sentinel</h2>
                <p className="section-subtitle">
                    Las misiones Sentinel son la columna vertebral del programa Copernicus
                </p>

                <div className="missions-grid">
                    {Object.entries(SENTINEL_MISSIONS).map(([key, mission]) => (
                        <div
                            key={key}
                            className="mission-card-large"
                            style={{ '--mission-color': mission.color } as React.CSSProperties}
                        >
                            <div className="mission-header">
                                <span className="mission-icon">🛰️</span>
                                <h3>{mission.name}</h3>
                            </div>
                            <p className="mission-description">{mission.description}</p>
                            <div className="mission-meta">
                                <span className="mission-tag">{mission.instruments.join(' • ')}</span>
                                <span className="mission-date">Lanzado: {mission.launchDate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-heading">Características</h2>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Búsqueda Avanzada</h3>
                        <p>Busca productos por ubicación, fecha, cobertura de nubes y más usando la API STAC.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🗺️</div>
                        <h3>Visualización Interactiva</h3>
                        <p>Explora imágenes satelitales directamente en el mapa con capas personalizables.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚙️</div>
                        <h3>Procesamiento en la Nube</h3>
                        <p>Ejecuta análisis complejos usando openEO sin necesidad de descargar los datos.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📥</div>
                        <h3>Descarga de Datos</h3>
                        <p>Descarga productos completos o recortes personalizados de cualquier área de interés.</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stat-card">
                    <span className="stat-value">40+ PB</span>
                    <span className="stat-label">Datos disponibles</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">6</span>
                    <span className="stat-label">Misiones Sentinel</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">Global</span>
                    <span className="stat-label">Cobertura</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">Gratis</span>
                    <span className="stat-label">Acceso abierto</span>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-card">
                    <h2>¿Listo para explorar?</h2>
                    <p>Crea una cuenta gratuita en Copernicus Data Space para acceder a todos los datos.</p>
                    <a
                        href="https://dataspace.copernicus.eu/registration"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-lg"
                    >
                        Crear cuenta gratuita
                    </a>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
