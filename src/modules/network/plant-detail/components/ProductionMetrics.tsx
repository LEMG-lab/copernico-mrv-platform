import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { KPICard } from './KPICard';
import { Settings, BarChart3, Recycle, RefreshCw, Beef, Droplets, Sprout, Bug } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface ProductionMetricsProps {
    plant: PlantDetail;
}

export const ProductionMetrics: React.FC<ProductionMetricsProps> = ({ plant }) => {
    const { operations, production } = plant;

    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Métricas de Producción</h2>
                    <p className="text-slate-400 text-sm">Periodo: {production.period}</p>
                </div>
            </div>

            {/* Operational KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <KPICard
                    title="Capacidad de Procesamiento"
                    value={`${operations.capacity_tons_day} t/día`}
                    icon={Settings}
                    color="slate"
                    subtitle="Maxima instalada"
                />
                <KPICard
                    title="Utilización Actual"
                    value={`${operations.current_utilization}%`}
                    icon={BarChart3}
                    color="blue"
                    progress={operations.current_utilization}
                    subtitle="Eficiencia operativa"
                />
                <KPICard
                    title="Residuos Procesados"
                    value={`${formatNumber(production.waste_processed_tons)} t`}
                    icon={Recycle}
                    color="orange"
                    subtitle="En este periodo"
                />
                <KPICard
                    title="Tasa de Conversión"
                    value={`${(production.conversion_rate * 100).toFixed(1)}%`}
                    icon={RefreshCw}
                    color="green"
                    subtitle="Bioconversión eficiente"
                />
            </div>

            {/* Product Output */}
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Producción (Yield)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="ProLINK (Harina)"
                    value={`${formatNumber(production.protein_produced_kg / 1000)} t`}
                    icon={Beef}
                    color="blue"
                />
                <KPICard
                    title="LipiLINK (Aceite)"
                    value={`${formatNumber(production.oil_produced_liters)} L`}
                    icon={Droplets}
                    color="orange"
                />
                <KPICard
                    title="TerraLINK (Frass)"
                    value={`${formatNumber(production.frass_produced_kg / 1000)} t`}
                    icon={Sprout}
                    color="green"
                />
                <KPICard
                    title="Larva Viva"
                    value={`${formatNumber(production.live_larvae_kg / 1000)} t`}
                    icon={Bug}
                    color="slate"
                />
            </div>
        </section>
    );
};
