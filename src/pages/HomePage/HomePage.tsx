/**
 * HomePage - Landing page de Copernico
 */

import React, { useEffect, useState } from 'react';
import { useCopernicus } from '@/hooks';
import { useAppStore } from '@/stores';
import { SENTINEL_MISSIONS } from '@/api/config';
import './HomePage.css';

export const HomePage: React.FC = () => {
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
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
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
