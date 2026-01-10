import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { DocumentUploader } from './DocumentUploader';

export const Step5Verification: React.FC = () => {
    const { documents, updateDocuments, setStep, saveProgress } = useOnboarding();

    const handleDocumentUpload = (key: string, fileName: string) => {
        // Mock update
        updateDocuments({
            [key]: {
                file_name: fileName,
                status: 'approved',
                uploaded_at: new Date().toISOString()
            }
        });
    };

    const handlePhotoUpload = (fileName: string) => {
        const current = documents.facility_photos || [];
        if (current.length >= 4) return;
        updateDocuments({
            facility_photos: [...current, { file_name: fileName, status: 'approved', uploaded_at: new Date().toISOString() } as any]
        });
    };

    const handleNext = () => {
        if (!documents.business_license || (documents.facility_photos?.length || 0) < 1) { // Min 1 photo for mock ease
            alert("Sube tu licencia de operación y al menos 1 foto.");
            return;
        }
        saveProgress();
        setStep('plan');
    };

    return (
        <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Documentos de Verificación</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Legales y Permisos</h3>
                    <div className="space-y-4">
                        <DocumentUploader
                            label="Licencia de Operación / Acta *"
                            isUploaded={!!documents.business_license}
                            uploadedFileName={documents.business_license?.file_name}
                            onUpload={(name) => handleDocumentUpload('business_license', name)}
                        />
                        <DocumentUploader
                            label="Permiso Ambiental"
                            isUploaded={!!documents.environmental_permit}
                            uploadedFileName={documents.environmental_permit?.file_name}
                            onUpload={(name) => handleDocumentUpload('environmental_permit', name)}
                        />
                        <DocumentUploader
                            label="Permiso Sanitario"
                            isUploaded={!!documents.sanitary_permit}
                            uploadedFileName={documents.sanitary_permit?.file_name}
                            onUpload={(name) => handleDocumentUpload('sanitary_permit', name)}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Evidencia Visual</h3>
                    <p className="text-xs text-slate-500 mb-4">Sube fotos claras de: Recepción de materia prima, Zona de Bio-reactores, Cosecha y Producto final.</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {[1, 2, 3, 4].map(i => {
                            const photo = documents.facility_photos?.[i - 1];
                            if (photo) {
                                return (
                                    <div key={i} className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border border-green-200 relative">
                                        <div className="text-2xl">📸</div>
                                        <div className="absolute top-1 right-1 text-green-500 bg-white rounded-full">✓</div>
                                    </div>
                                )
                            }
                            return (
                                <div key={i} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
                                    <span className="text-slate-300 text-sm">Foto {i}</span>
                                </div>
                            )
                        })}
                    </div>

                    <DocumentUploader
                        label="Subir Fotos de Instalación"
                        subLabel={`${documents.facility_photos?.length || 0}/4 subidas`}
                        onUpload={handlePhotoUpload}
                    />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                    <h4 className="font-bold text-blue-900 mb-1">📹 Videollamada de Verificación</h4>
                    <p className="text-sm text-blue-800">Recomendamos agendar una llamada rápida de 15 min para mostrar tu planta en vivo. Esto acelera tu aprobación a 24 horas.</p>
                </div>
                <button className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-sm border border-blue-200 whitespace-nowrap hover:bg-blue-50">
                    📅 Agendar para después
                </button>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                    onClick={() => setStep('sensors')}
                    className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2"
                >
                    ← Anterior
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#1E3A5F] hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                >
                    Siguiente: Plan →
                </button>
            </div>
        </div>
    );
};
