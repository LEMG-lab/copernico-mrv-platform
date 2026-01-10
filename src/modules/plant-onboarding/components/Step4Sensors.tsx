import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { SensorType } from '../types/onboarding.types';

const SENSOR_TYPES: { id: SensorType; label: string }[] = [
    { id: 'temperature', label: 'Temperatura' },
    { id: 'humidity', label: 'Humedad' },
    { id: 'weight_scale', label: 'Báscula' },
    { id: 'co2', label: 'CO2' },
    { id: 'camera', label: 'Cámara / Visión' },
];

export const Step4Sensors: React.FC = () => {
    const { sensors, updateSensors, setStep, saveProgress } = useOnboarding();

    const handleAddSensor = () => {
        const current = sensors.sensors || [];
        updateSensors({
            sensors: [
                ...current,
                { type: 'temperature', location_in_plant: '', serial_number: '' }
            ]
        });
    };

    const removeSensor = (index: number) => {
        const current = sensors.sensors || [];
        updateSensors({
            sensors: current.filter((_, i) => i !== index)
        });
    };

    const updateSensorField = (index: number, field: string, value: any) => {
        const current = sensors.sensors || [];
        const updated = [...current];
        updated[index] = { ...updated[index], [field]: value };
        updateSensors({ sensors: updated });
    };

    const handleNext = () => {
        // Validate sensors if has_sensors is true
        if (sensors.has_sensors && (sensors.sensors?.length === 0)) {
            alert("Si indicaste que tienes sensores, agrega al menos uno.");
            return;
        }
        saveProgress();
        setStep('verification');
    };

    return (
        <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Configuración IoT</h2>

            <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">¿Tu planta tiene sensores IoT instalados?</label>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-slate-50">
                        <input
                            type="radio"
                            name="has_sensors"
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                            checked={sensors.has_sensors === true}
                            onChange={() => updateSensors({ has_sensors: true })}
                        />
                        <div>
                            <div className="font-bold text-slate-800">Sí, tengo sensores</div>
                            <div className="text-xs text-slate-500">Puedo conectar mis dispositivos para monitoreo en tiempo real.</div>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-slate-50">
                        <input
                            type="radio"
                            name="has_sensors"
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                            checked={sensors.has_sensors === false}
                            onChange={() => updateSensors({ has_sensors: false, sensors: [] })}
                        />
                        <div>
                            <div className="font-bold text-slate-800">No, o prefiero reportar manualmente</div>
                            <div className="text-xs text-slate-500">Subiré reportes diarios o semanales via CSV/Web.</div>
                        </div>
                    </label>
                </div>
            </div>

            {sensors.has_sensors && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700">Sensores Instalados</h3>
                        <button
                            onClick={handleAddSensor}
                            className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-200"
                        >
                            + Agregar Sensor
                        </button>
                    </div>

                    {(!sensors.sensors || sensors.sensors.length === 0) ? (
                        <p className="text-center text-slate-400 text-sm py-4 italic">No has agregado sensores.</p>
                    ) : (
                        <div className="space-y-3">
                            {sensors.sensors.map((sensor, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-end md:items-center">
                                    <div className="flex-1 w-full">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Tipo</label>
                                        <select
                                            className="w-full text-sm rounded border-slate-300 py-1.5"
                                            value={sensor.type}
                                            onChange={(e) => updateSensorField(idx, 'type', e.target.value)}
                                        >
                                            {SENSOR_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ubicación</label>
                                        <input
                                            type="text"
                                            className="w-full text-sm rounded border-slate-300 py-1.5"
                                            placeholder="Ej. Zona Cría"
                                            value={sensor.location_in_plant}
                                            onChange={(e) => updateSensorField(idx, 'location_in_plant', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Serial (Opcional)</label>
                                        <input
                                            type="text"
                                            className="w-full text-sm rounded border-slate-300 py-1.5"
                                            placeholder="SN-12345"
                                            value={sensor.serial_number || ''}
                                            onChange={(e) => updateSensorField(idx, 'serial_number', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeSensor(idx)}
                                        className="text-red-400 hover:text-red-600 p-2"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 border-t border-slate-200 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Frecuencia Envío</label>
                                <select
                                    className="w-full text-sm rounded border-slate-300"
                                    value={sensors.data_frequency}
                                    onChange={(e) => updateSensors({ data_frequency: e.target.value as any })}
                                >
                                    <option value="realtime">Tiempo Real (recomendado)</option>
                                    <option value="hourly">Cada Hora</option>
                                    <option value="daily">Diario</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Integración</label>
                                <select
                                    className="w-full text-sm rounded border-slate-300"
                                    value={sensors.integration_method}
                                    onChange={(e) => updateSensors({ integration_method: e.target.value as any })}
                                >
                                    <option value="api">API REST</option>
                                    <option value="mqtt">MQTT</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {!sensors.has_sensors && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">
                    <span className="text-2xl">💡</span>
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm">Beneficios de automatizar con sensores</h4>
                        <ul className="text-xs text-blue-800 mt-1 space-y-1 list-disc pl-4">
                            <li>Verificación "Nivel Oro" (créditos valen +15%)</li>
                            <li>Alertas automáticas de anomalías</li>
                            <li>Mayor confianza ante compradores internacionales</li>
                        </ul>
                        <button className="text-xs font-bold text-blue-600 underline mt-2">
                            Ver kits de inicio de Global Force IoT
                        </button>
                    </div>
                </div>
            )}


            <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => setStep('operations')}
                    className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2"
                >
                    ← Anterior
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#1E3A5F] hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                    Siguiente: Docs →
                </button>
            </div>
        </div>
    );
};
