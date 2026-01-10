import React, { useState } from 'react';
import { Alert } from '../types/investor.types';

interface AlertsPanelProps {
    alerts: Alert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed right-0 top-32 bg-[#1E3A5F] text-white p-3 rounded-l-xl shadow-lg hover:pr-4 transition-all z-40"
            >
                🔔
            </button>
        )
    }

    return (
        <div className="bg-white border-l border-slate-200 h-full p-6 flex flex-col w-full animate-slide-in-right">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    🔔 Alertas y Notificaciones
                    <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">3</span>
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
                {alerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-lg border flex gap-3 ${alert.type === 'positive' ? 'bg-green-50 border-green-100' :
                            alert.type === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                                alert.type === 'critical' ? 'bg-red-50 border-red-100' :
                                    'bg-blue-50 border-blue-100'
                        }`}>
                        <div className="mt-1">
                            {alert.type === 'positive' && '🎉'}
                            {alert.type === 'warning' && '⚠️'}
                            {alert.type === 'critical' && '🚨'}
                            {alert.type === 'info' && 'ℹ️'}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">{alert.title}</h4>
                            <p className="text-xs text-slate-600 mb-2 leading-relaxed">{alert.message}</p>
                            {alert.action_url && (
                                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">
                                    Ver detalles →
                                </a>
                            )}
                            <div className="text-[10px] text-slate-400 mt-2 font-mono">
                                {new Date(alert.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-4 w-full py-2 text-sm text-slate-500 font-medium hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-colors">
                Ver historial completo
            </button>
        </div>
    );
};
