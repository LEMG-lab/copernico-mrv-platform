import React, { useState } from 'react';
import { Report } from '../types/investor.types';

interface ReportGeneratorProps {
    recentReports: Report[];
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ recentReports }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            alert("Reporte generado exitosamente y enviado a tu correo.");
        }, 2000);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-bold text-slate-800 mb-6">Centro de Reportes y Data Room</h3>

            <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                        <tr>
                            <th className="px-4 py-3">Reporte</th>
                            <th className="px-4 py-3">Periodo</th>
                            <th className="px-4 py-3">Generado</th>
                            <th className="px-4 py-3 text-right">Descarga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentReports.map(report => (
                            <tr key={report.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-800 flex items-center gap-2">
                                    <span className="text-red-500">📄</span>
                                    {report.type === 'monthly_flash' ? 'Flash Mensual' :
                                        report.type === 'quarterly' ? 'Reporte Trimestral' :
                                            report.type === 'sfdr_pai' ? 'SFDR PAI Statement' : 'Reporte Anual'}
                                </td>
                                <td className="px-4 py-3 text-slate-600">{report.period}</td>
                                <td className="px-4 py-3 text-slate-500 text-xs">{report.generated_at}</td>
                                <td className="px-4 py-3 text-right">
                                    <button className="text-blue-600 font-bold hover:underline text-xs">
                                        ⬇ PDF ({(report.file_size / 1000000).toFixed(1)} MB)
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h4 className="font-bold text-slate-700 mb-4">Generar Reporte Personalizado</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5">
                        <option>Reporte de Impacto</option>
                        <option>Reporte Financiero Completo</option>
                        <option>Cumplimiento ESG</option>
                    </select>
                    <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5">
                        <option>Último Mes</option>
                        <option>Último Trimestre</option>
                        <option>YTD (Año a la fecha)</option>
                    </select>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className={`text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2 ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isGenerating ? (
                            <>Generating...</>
                        ) : (
                            <>⚡ Generar ahora</>
                        )}
                    </button>
                </div>

                <div className="flex gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">
                    <a href="#" className="hover:text-blue-600 flex items-center gap-1">📁 Ir al Data Room Virtual</a>
                    <a href="#" className="hover:text-blue-600 flex items-center gap-1">🔒 Certificados de Seguridad</a>
                </div>
            </div>

        </div>
    );
};
