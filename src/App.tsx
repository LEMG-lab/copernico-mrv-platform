import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvestorDashboard from './pages/InvestorDashboard';
import { MRVDashboard } from './pages/MRVDashboard';
import { TerraLinkDashboard } from './modules/terralink-impact';
import { EmissionsCalculatorDashboard } from './modules/emissions-calculator';
import { GlobalNetworkDashboard } from './modules/global-network';
import PlantDetailPage from './modules/network/plant-detail/PlantDetailPage';
import { MarketplacePage, SellerDashboard } from './modules/marketplace';
import { OnboardingWizard } from './modules/plant-onboarding';
import { ViabilityCalculatorPage } from './modules/viability-calculator';
import { InvestorPortalPage, DataRoomPage } from './modules/investor-portal';
import DocumentDetailPage from './modules/investor-portal/DocumentDetailPage';
import { AlertsPage } from './modules/alerts-system/AlertsPage';
import { PartnersMapPage } from './modules/circular-partners/pages/PartnersMapPage';
import { PartnersHubPage } from './modules/circular-partners/pages/PartnersHubPage';
import { PartnerDetailPage } from './modules/circular-partners/pages/PartnerDetailPage';
import { ConsumerScanPage } from './modules/circular-partners/pages/ConsumerScanPage';
import { PartnerDashboardPage } from './modules/circular-partners/pages/PartnerDashboardPage';
import { ConsumerPortalPage } from './modules/circular-partners/pages/ConsumerPortalPage';
import GlobalNav from './components/GlobalNav/GlobalNav';
import './App.css';

/**
 * AppLayout - Wrapper with persistent GlobalNav on all pages
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <GlobalNav />
            <main className="app-main-content">
                {children}
            </main>
        </>
    );
};

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    {/* Dashboard Principal de Inversionistas */}
                    <Route path="/" element={<InvestorDashboard />} />

                    {/* Módulos Específicos */}
                    <Route path="/terralink" element={<TerraLinkDashboard />} />
                    <Route path="/mrv" element={<MRVDashboard />} />
                    <Route path="/network/plant/:id" element={<PlantDetailPage />} />
                    <Route path="/emissions" element={<EmissionsCalculatorDashboard />} />
                    <Route path="/network" element={<GlobalNetworkDashboard />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/marketplace/seller" element={<SellerDashboard />} />
                    <Route path="/plant-onboarding" element={<OnboardingWizard />} />
                    <Route path="/viability" element={<ViabilityCalculatorPage />} />
                    <Route path="/investor-portal" element={<InvestorPortalPage />} />
                    <Route path="/data-room" element={<DataRoomPage />} />
                    <Route path="/data-room/doc/:id" element={<DocumentDetailPage />} />
                    <Route path="/alerts" element={<AlertsPage />} />

                    {/* CircularLINK Partners Hub */}
                    <Route path="/partners" element={<PartnersHubPage />} />
                    <Route path="/partners/map" element={<PartnersMapPage />} />
                    <Route path="/partners/:slug" element={<PartnerDetailPage />} />
                    <Route path="/partners/mi-impacto" element={<ConsumerPortalPage />} />
                    <Route path="/partners/dashboard" element={<PartnerDashboardPage />} />
                    <Route path="/partners/scan-demo" element={<ConsumerScanPage />} />
                    <Route path="/scan/:code" element={<ConsumerScanPage />} />

                    {/* Legacy routes redirect */}
                    <Route path="/mi-impacto" element={<ConsumerPortalPage />} />
                    <Route path="/dashboard/partner" element={<PartnerDashboardPage />} />

                    {/* Redirecciones de compatibilidad si es necesario */}
                    <Route path="/terralink-impact" element={<TerraLinkDashboard />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
};

export default App;
