import React, { useState } from 'react';
import { notificationService } from '../../../services/notificationService';

export const AlertsConfiguration: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({
        telegramBotToken: '',
        telegramChatId: '',
        emailServiceId: '',
        emailTemplateId: '',
        emailPublicKey: '',
        emailTo: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        notificationService.updateConfig(config);
        alert('Configuración guardada (Sesión actual). Prueba enviando una alerta de prueba.');
    };

    const handleTestKey = async () => {
        const result = await notificationService.broadcastAlert(
            "Prueba de Configuración",
            "Esta es una prueba de conexión desde el Dashboard de LarvaLINK. Si recibes esto, la integración funciona correctamente."
        );

        let msg = "Resultados:\n";
        msg += `Telegram: ${result.telegram ? '✅ Enviado' : '❌ Falló (Revisa credenciales)'}\n`;
        msg += `Email: ${result.email ? '✅ Enviado' : '❌ Falló (Revisa credenciales)'}`;

        alert(msg);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 bg-slate-800 p-2 rounded-full border border-slate-600 hover:bg-slate-700 transition"
                title="Configurar Alertas"
            >
                🔔
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[2000] backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Configuración de Alertas Reales</h3>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30 text-[10px] text-blue-200">
                        Para que las alertas lleguen realmente, ingresa tus credenciales de API.
                        Estos datos solo se guardan en memoria por seguridad.
                    </div>

                    {/* Telegram Section */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-1">Telegram</h4>
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Bot Token</label>
                            <input
                                name="telegramBotToken"
                                value={config.telegramBotToken}
                                onChange={handleChange}
                                type="password"
                                placeholder="123456:ABC-DEF1234..."
                                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Chat ID</label>
                            <input
                                name="telegramChatId"
                                value={config.telegramChatId}
                                onChange={handleChange}
                                placeholder="-100123456789"
                                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                        </div>
                    </div>

                    {/* EmailJS Section */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-1">Email (via EmailJS)</h4>
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Service ID</label>
                            <input
                                name="emailServiceId"
                                value={config.emailServiceId}
                                onChange={handleChange}
                                placeholder="service_xyz"
                                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Template ID</label>
                            <input
                                name="emailTemplateId"
                                value={config.emailTemplateId}
                                onChange={handleChange}
                                placeholder="template_xyz"
                                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Public Key</label>
                            <input
                                name="emailPublicKey"
                                value={config.emailPublicKey}
                                onChange={handleChange}
                                placeholder="user_xyz"
                                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 block mb-1">Email Destino</label>
                            <input
                                name="emailTo"
                                value={config.emailTo}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded text-xs font-bold"
                    >
                        GUARDAR
                    </button>
                    <button
                        onClick={handleTestKey}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-xs font-bold"
                    >
                        PROBAR
                    </button>
                </div>
            </div>
        </div>
    );
};
