import React from 'react';
import { Link } from 'react-router-dom';
import { useNDVIComparison } from './hooks/useNDVIComparison';
import { ParcelComparison } from './components/ParcelComparison';
import { Navigation } from '../../components/Navigation';

export const TerraLinkDashboard: React.FC = () => {
    const { loading, comparison, error } = useNDVIComparison();

    const handleExportPDF = () => {
        // En una implementación futura, esto usaría html2canvas + jspdf
        alert("Generando PDF certificado por Larva... (Funcionalidad Simulada)");
    };

    return (
        <div className="min-h-screen bg-[#0F172A] font-sans text-slate-200">
            <Navigation />
            {/* HEADer */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-slate-700 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        TerraLINK Impact Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Validación Satelital de Eficiencia de Biofertilizantes • Zona Tlaxcala
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleExportPDF}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors border border-slate-600 font-medium"
                    >
                        📄 Exportar Reporte PDF
                    </button>
                    <Link to="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
                        Volver al Inicio
                    </Link>
                </div>
            </header>

            {/* ERROR STATE */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-8 text-center">
                    {error}
                </div>
            )}

            {/* LOADING STATE */}
            {loading && !comparison && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-green-400 animate-pulse">Analizando firmas espectrales con Copernicus...</p>
                </div>
            )}

            {/* DATA CONTENT */}
            {!loading && comparison && (
                <main className="animate-fade-in-up">
                    <ParcelComparison result={comparison} />

                    <div className="mt-8 text-center text-xs text-slate-600 max-w-2xl mx-auto">
                        * Los datos presentados son obtenidos directamente del ecosistema Copernicus Data Space.
                        El índice NDVI se calcula utilizando las bandas B04 (Rojo) y B08 (NIR) del satélite Sentinel-2.
                        La verificación blockchain asegura la inmutabilidad de este reporte para fines de auditoría.
                    </div>
                </main>
            )}
        </div>
    );
};

export default TerraLinkDashboard;
