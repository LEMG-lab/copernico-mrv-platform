import React, { useEffect, useState } from 'react';
import { Parcel } from '../types/parcel.types';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { parcelAnalysisService } from '../services/parcelAnalysisService';

// Componente auxiliar para ajustar vista
function MapUpdater({ bounds }: { bounds: [number, number, number, number] }) {
    const map = useMap();
    useEffect(() => {
        // bounds: [west, south, east, north] -> leaflet: [[south, west], [north, east]]
        map.fitBounds([
            [bounds[1], bounds[0]],
            [bounds[3], bounds[2]]
        ]);
    }, [bounds, map]);
    return null;
}

interface ParcelMapProps {
    terralink: Parcel;
    control: Parcel;
    date: string; // Para cargar imagen de fondo (futuro)
}

export const ParcelMap: React.FC<ParcelMapProps> = ({ terralink, control, date }) => {
    const [terralinkImg, setTerralinkImg] = useState<string | null>(null);
    const [controlImg, setControlImg] = useState<string | null>(null);

    // Calcular bounds totales
    const totalBounds: [number, number, number, number] = [
        Math.min(terralink.coordinates.bbox[0], control.coordinates.bbox[0]),
        Math.min(terralink.coordinates.bbox[1], control.coordinates.bbox[1]),
        Math.max(terralink.coordinates.bbox[2], control.coordinates.bbox[2]),
        Math.max(terralink.coordinates.bbox[3], control.coordinates.bbox[3]),
    ];

    /* 
     * Nota: Idealmente overlays de imagenes se hacen con ImageOverlay de Leaflet,
     * pero requiere calcular latLngBounds exactos del recorte de la imagen.
     * Por simplicidad en esta demo, dibujamos los polígonos vectoriales
     * y mostramos la imagen "visual" en un popup o al lado (en el dashboard layout).
     * Aquí el mapa es para contexto geoespacial.
     */

    return (
        <MapContainer
            style={{ height: '100%', width: '100%', background: '#0F172A' }}
            zoom={14}
            center={[terralink.coordinates.center[1], terralink.coordinates.center[0]]}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <MapUpdater bounds={totalBounds} />

            {/* TerraLINK Polygon - Verde */}
            <Polygon
                positions={[
                    [terralink.coordinates.bbox[1], terralink.coordinates.bbox[0]],
                    [terralink.coordinates.bbox[3], terralink.coordinates.bbox[0]],
                    [terralink.coordinates.bbox[3], terralink.coordinates.bbox[2]],
                    [terralink.coordinates.bbox[1], terralink.coordinates.bbox[2]]
                ]}
                pathOptions={{ color: '#2ECC71', fillColor: '#2ECC71', fillOpacity: 0.2 }}
            >
                <Popup>
                    <div className="text-slate-800">
                        <strong>{terralink.name}</strong><br />
                        Cultivo: {terralink.crop}<br />
                        Tratamiento: TerraLINK (Bio)
                    </div>
                </Popup>
            </Polygon>

            {/* Control Polygon - Gris */}
            <Polygon
                positions={[
                    [control.coordinates.bbox[1], control.coordinates.bbox[0]],
                    [control.coordinates.bbox[3], control.coordinates.bbox[0]],
                    [control.coordinates.bbox[3], control.coordinates.bbox[2]],
                    [control.coordinates.bbox[1], control.coordinates.bbox[2]]
                ]}
                pathOptions={{ color: '#95A5A6', fillColor: '#95A5A6', fillOpacity: 0.2 }}
            >
                <Popup>
                    <div className="text-slate-800">
                        <strong>{control.name}</strong><br />
                        Cultivo: {control.crop}<br />
                        Tratamiento: Control (Tradicional)
                    </div>
                </Popup>
            </Polygon>

        </MapContainer>
    );
};
