import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvestorDashboard from './pages/InvestorDashboard';
import { TerraLinkDashboard } from './modules/terralink-impact';
import { EmissionsCalculatorDashboard } from './modules/emissions-calculator';
import { GlobalNetworkDashboard } from './modules/global-network';
import { MarketplacePage, SellerDashboard } from './modules/marketplace';
import { OnboardingWizard } from './modules/plant-onboarding';
import { ViabilityCalculatorPage } from './modules/viability-calculator';
import { InvestorPortalPage } from './modules/investor-portal';
import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Dashboard Principal de Inversionistas */}
                <Route path="/" element={<InvestorDashboard />} />

                {/* Módulos Específicos */}
                <Route path="/terralink" element={<TerraLinkDashboard />} />
                <Route path="/emissions" element={<EmissionsCalculatorDashboard />} />
                <Route path="/network" element={<GlobalNetworkDashboard />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/marketplace/seller" element={<SellerDashboard />} />
                <Route path="/plant-onboarding" element={<OnboardingWizard />} />
                <Route path="/viability" element={<ViabilityCalculatorPage />} />
                <Route path="/investor-portal" element={<InvestorPortalPage />} />

                {/* Redirecciones de compatibilidad si es necesario */}
                <Route path="/terralink-impact" element={<TerraLinkDashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
