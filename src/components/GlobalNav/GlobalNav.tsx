import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Home,
    Globe,
    Satellite,
    Leaf,
    Recycle,
    FileText,
    ShoppingBag,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import { translations } from '../../i18n/translations';
import './GlobalNav.css';

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    children?: NavItem[];
}

const GlobalNav: React.FC = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { i18n } = useTranslation();
    const lang = (i18n.language || 'es') as 'es' | 'en';
    const t = translations[lang];

    const navItems: NavItem[] = [
        { label: t.nav?.dashboard || 'Dashboard', path: '/', icon: <Home className="w-4 h-4" /> },
        { label: t.nav?.network || 'Network', path: '/network', icon: <Globe className="w-4 h-4" /> },
        { label: t.nav?.mrv || 'MRV', path: '/mrv', icon: <Satellite className="w-4 h-4" /> },
        { label: t.nav?.terralink || 'TerraLINK', path: '/terralink', icon: <Leaf className="w-4 h-4" /> },
        { label: t.nav?.circularlink || 'CircularLINK', path: '/partners', icon: <Recycle className="w-4 h-4" /> },
        { label: t.nav?.dataRoom || 'Data Room', path: '/data-room', icon: <FileText className="w-4 h-4" /> },
        { label: t.nav?.marketplace || 'Marketplace', path: '/marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <nav className="global-nav">
                <div className="global-nav-container">
                    {/* Logo */}
                    <Link to="/" className="global-nav-logo">
                        <img
                            src="/larvalink-logo.png"
                            alt="LarvaLINK"
                            className="global-nav-logo-img"
                        />
                        <span className="global-nav-logo-text">
                            LarvaLINK
                            <span className="global-nav-logo-badge">MRV</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="global-nav-links">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`global-nav-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    {/* Mobile Menu Button */}
                    <button
                        className="global-nav-mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="global-nav-mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
                    <div className="global-nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="global-nav-mobile-header">
                            <img
                                src="/larvalink-logo.png"
                                alt="LarvaLINK"
                                className="global-nav-mobile-logo"
                            />
                            <span className="global-nav-mobile-title">LarvaLINK</span>
                            <LanguageSwitcher />
                        </div>
                        <div className="global-nav-mobile-links">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`global-nav-mobile-link ${isActive(item.path) ? 'active' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalNav;
