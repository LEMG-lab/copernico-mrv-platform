import React, { useEffect, useRef, useState } from 'react';

interface StreetViewViewerProps {
    lat: number;
    lng: number;
    onClose: () => void;
}

export const StreetViewViewer: React.FC<StreetViewViewerProps> = ({ lat, lng, onClose }) => {
    const streetViewRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initStreetView = async () => {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

            if (!apiKey) {
                setError("Google Maps API Key no configurada (VITE_GOOGLE_MAPS_API_KEY).");
                return;
            }

            // Function to handle map initialization once script is loaded
            const handleMapInit = async () => {
                try {
                    const { StreetViewPanorama } = await google.maps.importLibrary("streetView") as google.maps.StreetViewLibrary;
                    const { StreetViewService } = await google.maps.importLibrary("streetView") as google.maps.StreetViewLibrary;

                    const service = new StreetViewService();

                    service.getPanorama({ location: { lat, lng }, radius: 5000 }, (data, status) => {
                        if (status === 'OK' && data && data.location) {
                            renderPanorama(data.location.latLng!);
                        } else {
                            // Fallback logic - If no street view nearby, show Demo location but don't block UI
                            console.warn("No Street View found nearby. Falling back to Demo.");
                            const fallbackLoc = { lat: 37.4220, lng: -122.0841 }; // Googleplex

                            service.getPanorama({ location: fallbackLoc, radius: 100 }, (d2, s2) => {
                                if (s2 === 'OK' && d2 && d2.location) {
                                    // Don't set error, just render. Maybe add a small label later.
                                    renderPanorama(d2.location.latLng!);
                                } else {
                                    setError("Error crítico: Imposible cargar Street View.");
                                }
                            });
                        }
                    });

                    function renderPanorama(pos: google.maps.LatLng | google.maps.LatLngLiteral) {
                        if (streetViewRef.current) {
                            const panorama = new StreetViewPanorama(streetViewRef.current, {
                                position: pos,
                                pov: { heading: 34, pitch: 10 },
                                zoom: 1,
                                visible: true,
                            });

                            // Force resize
                            setTimeout(() => {
                                google.maps.event.trigger(panorama, 'resize');
                            }, 500);
                        }
                    }

                } catch (err: any) {
                    console.error("[StreetView] Init Error:", err);
                    setError(`Error initializing maps: ${err.message}`);
                }
            };

            // Manual Script Injection
            if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
                // Check if script already exists to avoid duplicates
                if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
                    setTimeout(handleMapInit, 1000);
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    handleMapInit();
                };
                script.onerror = (e) => {
                    console.error("[StreetView] Script load error:", e);
                    setError("Error de red al cargar Google Maps API.");
                };
                document.head.appendChild(script);
            } else {
                handleMapInit();
            }
        };

        if (lat && lng) {
            initStreetView();
        }
    }, [lat, lng]);

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl h-[80vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <span className="text-[#3498DB]">📍</span> Street View Explorador
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 relative bg-slate-950">
                    {error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-black/50 z-10 pointer-events-none">
                            <div className="text-4xl mb-4">⚠️</div>
                            <p className="max-w-md font-bold text-white">{error}</p>
                            <p className="text-sm mt-4 opacity-50">
                                (Si ves una imagen de fondo, ignora este mensaje es solo informativo)
                            </p>
                        </div>
                    ) : null}
                    <div ref={streetViewRef} className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};
