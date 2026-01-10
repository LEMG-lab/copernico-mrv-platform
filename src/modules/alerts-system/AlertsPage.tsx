// src/modules/alerts-system/AlertsPage.tsx

import React from 'react';
import { Navigation } from '../../components/Navigation';
import { AlertsDashboard } from './components/AlertsDashboard';

export const AlertsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <Navigation />
            <AlertsDashboard />
        </div>
    );
};

export default AlertsPage;
