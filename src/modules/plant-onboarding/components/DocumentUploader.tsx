import React, { useState } from 'react';

interface DocumentUploaderProps {
    label: string;
    subLabel?: string;
    accept?: string;
    onUpload: (fileName: string) => void;
    isUploaded?: boolean;
    uploadedFileName?: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
    label, subLabel, accept = ".pdf,.jpg,.png", onUpload, isUploaded, uploadedFileName
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const processFile = (file: File) => {
        setUploading(true);
        // Simulate upload
        setTimeout(() => {
            setUploading(false);
            onUpload(file.name);
        }, 1500);
    };

    if (isUploaded) {
        return (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded text-green-600 font-bold text-xl">📄</div>
                    <div>
                        <div className="font-bold text-slate-700 text-sm">{label}</div>
                        <div className="text-xs text-green-700 flex items-center gap-1">
                            <span>✓ {uploadedFileName}</span>
                            <span className="text-green-400">•</span>
                            <span>Subido exitosamente</span>
                        </div>
                    </div>
                </div>
                <button className="text-xs text-slate-400 hover:text-red-500">Reemplazar</button>
            </div>
        )
    }

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 bg-slate-50'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            <div className="mb-2 text-2xl">☁️</div>
            <div className="font-bold text-slate-700 text-sm mb-1">{label}</div>
            {subLabel && <div className="text-xs text-slate-500 mb-3">{subLabel}</div>}

            {uploading ? (
                <div className="text-xs font-bold text-blue-600 animate-pulse">Subiendo...</div>
            ) : (
                <div>
                    <label className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                        Haz click para subir
                        <input type="file" className="hidden" accept={accept} onChange={handleFileChange} />
                    </label>
                    <span className="text-xs text-slate-400"> o arrastra aquí</span>
                </div>
            )}
            <div className="text-[10px] text-slate-400 mt-2">Max 10MB • PDF, JPG, PNG</div>
        </div>
    );
};
