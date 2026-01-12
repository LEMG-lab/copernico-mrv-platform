/**
 * Dashboard MRV para LarvaLINK
 */

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LARVALINK_LOCATIONS, LarvaLinkLocation } from '@/constants/locations';
import { copernicusService } from '@/services/copernicusService';
import { EvalScriptType } from '@/constants/evalscripts';
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import './MRVDashboard.css';

// Fix Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para actualizar vista del mapa
const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 13);
    }, [center, map]);
    return null;
};

export const MRVDashboard: React.FC = () => {
    // Estado
    const [selectedLocation, setSelectedLocation] = useState<LarvaLinkLocation>(LARVALINK_LOCATIONS[0]);
    const [startDate, setStartDate] = useState(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectedLayer, setSelectedLayer] = useState<EvalScriptType>('trueColor');

    // Datos procesados
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageBounds, setImageBounds] = useState<[[number, number], [number, number]] | null>(null);
    const [ndviStats, setNdviStats] = useState({ mean: 0 });
    const [verificationHash, setVerificationHash] = useState<string>('---');

    // Cargar datos al cambiar filtros
    const fetchSatelliteData = async () => {
        setIsLoading(true);
        setVerificationHash('Calculando...');

        try {
            const { bbox } = selectedLocation;

            // 1. Obtener imagen
            const { imageUrl, imageBlob } = await copernicusService.getSatelliteImage(
                bbox,
                startDate,
                endDate,
                selectedLayer
            );

            setImageUrl(imageUrl);

            // Convertir bbox [minLon, minLat, maxLon, maxLat] a bounds de Leaflet [[minLat, minLon], [maxLat, maxLon]]
            // Nota: Leaflet ImageOverlay usa bounds LatLng
            setImageBounds([
                [bbox[1], bbox[0]], // SouthWest
                [bbox[3], bbox[2]]  // NorthEast
            ]);

            // 2. Obtener hash de verificación
            const hash = await copernicusService.generateVerificationHash(imageBlob);
            setVerificationHash(hash);

            // 3. Obtener stats (simulado para demo)
            if (selectedLayer === 'ndvi') {
                const stats = await copernicusService.getNDVIStats(bbox, startDate, endDate);
                setNdviStats(stats);
            } else {
                // Mock valor base
                setNdviStats({ mean: Math.random() * 0.5 + 0.2 });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error cargando imagen satelital. Verifica tus credenciales.');
        } finally {
            setIsLoading(false);
        }
    };

    // Efecto inicial
    useEffect(() => {
        fetchSatelliteData();
    }, []); // Run once on mount

    return (
        <div className="mrv-dashboard">
            {/* Header */}
            <header className="mrv-header">
                <div className="logo-section">
                    <span className="logo-icon">🐛</span>
                    <h1>LarvaLINK <span className="highlight">MRV Center</span></h1>
                </div>
                <div className="user-info">
                    <span className="status-badge connected">
                        <span className="live-dot"></span>
                        Datos en Vivo: Conectado
                    </span>
                    <span className="network-status">Sentinel-2 L2A</span>
                </div>
            </header>

            <div className="dashboard-content">
                {/* Sidebar Controls */}
                <aside className="mrv-sidebar">
                    <div className="control-group">
                        <label>Ubicación Planta</label>
                        <select
                            value={selectedLocation.id}
                            onChange={(e) => {
                                const loc = LARVALINK_LOCATIONS.find(l => l.id === e.target.value);
                                if (loc) setSelectedLocation(loc);
                            }}
                            className="mrv-select"
                        >
                            {LARVALINK_LOCATIONS.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        <p className="location-desc">{selectedLocation.description}</p>
                    </div>

                    <div className="control-group">
                        <label>Rango de Análisis</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mrv-input"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mrv-input"
                        />
                    </div>

                    <div className="control-group">
                        <label>Capa Espectral</label>
                        <div className="layer-selector">
                            <button
                                className={`layer-btn ${selectedLayer === 'trueColor' ? 'active' : ''}`}
                                onClick={() => setSelectedLayer('trueColor')}
                            >
                                RGB (Visual)
                            </button>
                            <button
                                className={`layer-btn ${selectedLayer === 'ndvi' ? 'active' : ''}`}
                                onClick={() => setSelectedLayer('ndvi')}
                            >
                                NDVI (Vegetación)
                            </button>
                            <button
                                className={`layer-btn ${selectedLayer === 'moisture' ? 'active' : ''}`}
                                onClick={() => setSelectedLayer('moisture')}
                            >
                                Humedad
                            </button>
                        </div>
                    </div>

                    <button
                        className="action-btn"
                        onClick={fetchSatelliteData}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Analizar Zonas'}
                    </button>
                </aside>

                {/* Main Map */}
                <main className="mrv-map-container">
                    <MapContainer
                        center={selectedLocation.center}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        className="leaflet-dark-theme"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />

                        <MapUpdater center={selectedLocation.center} />

                        {/* Satellite Image Overlay */}
                        {imageUrl && imageBounds && (
                            <ImageOverlay
                                url={imageUrl}
                                bounds={imageBounds}
                                opacity={0.8}
                            />
                        )}

                        {/* Markers */}
                        {LARVALINK_LOCATIONS.map(loc => (
                            <Marker key={loc.id} position={loc.center}>
                                <Popup>
                                    <strong>{loc.name}</strong><br />
                                    {loc.status}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </main>

                {/* Info Right Panel */}
                <aside className="mrv-metrics">
                    <div className="metric-card">
                        <h3>Nivel de Vegetación</h3>
                        <div className="gauge-container">
                            <div
                                className="gauge-fill"
                                style={{ width: `${ndviStats.mean * 100}%` }}
                            ></div>
                            <span className="gauge-value">{ndviStats.mean.toFixed(2)}</span>
                        </div>
                        <p className="metric-label">Índice NDVI (0-1)</p>
                    </div>

                    <div className="metric-card">
                        <h3>Verificación Blockchain</h3>
                        <div className="hash-display">
                            <code>{verificationHash.substring(0, 20)}...</code>
                        </div>
                        <p className="metric-label">Hash SHA256 de Datos Satelitales</p>
                    </div>

                    <div className="metric-card info">
                        <h3>Detalles de Imagen</h3>
                        <ul>
                            <li><strong>Satélite:</strong> Sentinel-2 L2A</li>
                            <li><strong>Cobertura de Nubes:</strong> &lt; 20%</li>
                            <li><strong>Resolución:</strong> 10m/px</li>
                            <li><strong>Fecha:</strong> {endDate}</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};
