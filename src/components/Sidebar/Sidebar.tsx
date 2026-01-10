/**
 * Sidebar Component - Copernico
 */

import React from 'react';
import { useAppStore } from '@/stores';
import { SENTINEL_MISSIONS } from '@/api/config';
import './Sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const {
        searchFilters,
        setSearchFilters,
        collections,
        isLoading
    } = useAppStore();

    const handleCollectionToggle = (collectionId: string) => {
        const current = searchFilters.collections;
        const updated = current.includes(collectionId)
            ? current.filter(c => c !== collectionId)
            : [...current, collectionId];
        setSearchFilters({ collections: updated });
    };

    const handleDateChange = (field: 'start' | 'end', value: string) => {
        setSearchFilters({
            dateRange: { ...searchFilters.dateRange, [field]: value || null }
        });
    };

    const handleCloudCoverChange = (value: number) => {
        setSearchFilters({
            cloudCover: { ...searchFilters.cloudCover, max: value }
        });
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <span className="brand-icon">🌍</span>
                    <div>
                        <h2>Copernicus</h2>
                        <p className="text-sm text-muted">Data Space Explorer</p>
                    </div>
                </div>
                <button className="btn btn-ghost btn-icon close-btn" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            <div className="sidebar-content">
                {/* Misiones Sentinel */}
                <section className="sidebar-section">
                    <h3 className="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                        </svg>
                        Misiones Sentinel
                    </h3>

                    <div className="mission-grid">
                        {Object.entries(SENTINEL_MISSIONS).map(([key, mission]) => (
                            <button
                                key={key}
                                className={`mission-card ${searchFilters.collections.includes(key) ? 'active' : ''}`}
                                style={{ '--mission-color': mission.color } as React.CSSProperties}
                                onClick={() => handleCollectionToggle(key)}
                            >
                                <span className="mission-name">{mission.name}</span>
                                <span className="mission-desc">{mission.instruments.join(', ')}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Filtros de fecha */}
                <section className="sidebar-section">
                    <h3 className="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Rango de Fechas
                    </h3>

                    <div className="date-inputs">
                        <div className="input-group">
                            <label className="label">Fecha inicio</label>
                            <input
                                type="date"
                                className="input"
                                value={searchFilters.dateRange.start || ''}
                                onChange={(e) => handleDateChange('start', e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="label">Fecha fin</label>
                            <input
                                type="date"
                                className="input"
                                value={searchFilters.dateRange.end || ''}
                                onChange={(e) => handleDateChange('end', e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Cobertura de nubes */}
                <section className="sidebar-section">
                    <h3 className="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                        </svg>
                        Cobertura de Nubes
                    </h3>

                    <div className="cloud-slider">
                        <input
                            type="range"
                            className="slider"
                            min="0"
                            max="100"
                            value={searchFilters.cloudCover.max}
                            onChange={(e) => handleCloudCoverChange(Number(e.target.value))}
                        />
                        <div className="slider-labels">
                            <span>0%</span>
                            <span className="current-value">{searchFilters.cloudCover.max}%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </section>

                {/* Botón de búsqueda */}
                <div className="sidebar-actions">
                    <button
                        className="btn btn-primary w-full"
                        disabled={isLoading || searchFilters.collections.length === 0}
                    >
                        {isLoading ? (
                            <>
                                <div className="spinner-small" />
                                Buscando...
                            </>
                        ) : (
                            <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                Buscar Productos
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="sidebar-footer">
                <a href="https://dataspace.copernicus.eu" target="_blank" rel="noopener noreferrer" className="footer-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Copernicus Data Space
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
