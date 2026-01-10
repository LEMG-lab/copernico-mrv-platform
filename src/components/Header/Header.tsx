/**
 * Header Component - Copernico
 */

import React from 'react';
import { useAppStore } from '@/stores';
import './Header.css';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    const { isLoading, auth } = useAppStore();

    return (
        <header className="header">
            <div className="header-left">
                <button
                    className="btn btn-ghost btn-icon menu-toggle"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                <div className="header-title">
                    <span className="header-icon">🛰️</span>
                    <h1 className="header-logo">Copernico</h1>
                </div>
            </div>

            <div className="header-right">
                {isLoading && (
                    <div className="header-loading">
                        <div className="spinner-small" />
                        <span>Procesando...</span>
                    </div>
                )}

                <div className={`connection-status ${auth.isAuthenticated ? 'connected' : ''}`}>
                    <span className="status-dot" />
                    <span className="status-text">
                        {auth.isAuthenticated ? 'Conectado' : 'Desconectado'}
                    </span>
                </div>

                <button className="btn btn-ghost btn-icon" aria-label="Settings">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
