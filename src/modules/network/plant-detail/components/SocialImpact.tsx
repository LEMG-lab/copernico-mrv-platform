import React from 'react';
import { PlantDetail } from '../types/plantDetail.types';
import { KPICard } from './KPICard';
import { Users, Building, Coins, GraduationCap, Briefcase, Factory } from 'lucide-react';

interface SocialImpactProps {
    plant: PlantDetail;
}

export const SocialImpact: React.FC<SocialImpactProps> = ({ plant }) => {
    const { social_impact } = plant;

    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Impacto Social y Gobernanza</h2>
                    <p className="text-slate-400 text-sm">Desarrollo comunitario y laboral</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Employment */}
                <div className="space-y-4">
                    <KPICard
                        title="Empleos Directos"
                        value={social_impact.direct_jobs}
                        icon={Briefcase}
                        color="purple"
                    />
                    <KPICard
                        title="Empleos Indirectos"
                        value={social_impact.indirect_jobs}
                        icon={Users}
                        color="purple"
                        subtitle="Cadena de suministro"
                    />
                </div>

                {/* Economic */}
                <div className="space-y-4">
                    <KPICard
                        title="Salario vs Mínimo"
                        value={`${social_impact.avg_salary_vs_minimum}x`}
                        icon={Coins}
                        color="green"
                        subtitle="Ingreso digno garantizado"
                    />
                    <KPICard
                        title="Proveedores Locales"
                        value={social_impact.local_suppliers}
                        icon={Factory}
                        color="green"
                        subtitle="Desarrollo económico local"
                    />
                </div>

                {/* Community */}
                <div className="space-y-4">
                    <KPICard
                        title="Comunidades Beneficiadas"
                        value={social_impact.communities_benefited}
                        icon={Building}
                        color="blue"
                    />
                    <KPICard
                        title="Horas Capacitación"
                        value={social_impact.training_hours}
                        icon={GraduationCap}
                        color="blue"
                        subtitle="Formación técnica"
                    />
                </div>
            </div>
        </section>
    );
};
