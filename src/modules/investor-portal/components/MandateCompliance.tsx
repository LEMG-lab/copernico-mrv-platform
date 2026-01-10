import React from 'react';
import { ComplianceStatus, InvestorMandate } from '../types/investor.types';

interface MandateComplianceProps {
    mandate: InvestorMandate;
    complianceList: ComplianceStatus[];
}

export const MandateCompliance: React.FC<MandateComplianceProps> = ({ complianceList }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-[#1E3A5F] px-6 py-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-lg">Cumplimiento del Mandato de Inversión</h3>
                <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded border border-green-500/30">
                    ARTICLE 9 COMPLIANT
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                        <tr>
                            <th className="px-6 py-3">Requisito</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Evidencia / Notas</th>
                            <th className="px-6 py-3 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complianceList.map((item, idx) => (
                            <tr key={idx} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${item.status === 'compliant' ? 'bg-green-50/30' :
                                    item.status === 'in_progress' ? 'bg-yellow-50/30' : 'bg-red-50/30'
                                }`}>
                                <td className="px-6 py-4 font-medium text-slate-800">
                                    {item.requirement}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold border ${item.status === 'compliant' ? 'bg-green-100 text-green-700 border-green-200' :
                                            item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                                'bg-red-100 text-red-700 border-red-200'
                                        }`}>
                                        {item.status === 'compliant' && (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        )}
                                        {item.status === 'in_progress' && (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        )}
                                        {item.status === 'compliant' ? 'CUMPLE' : item.status === 'in_progress' ? 'EN PROGRESO' : 'RIESGO'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {item.notes ? item.notes : (
                                        <span className="text-slate-400 italic">Verificado en auditoría anual</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {item.evidence_url && (
                                        <a href={item.evidence_url} className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-xs flex items-center justify-end gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            Ver Evidencia
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
