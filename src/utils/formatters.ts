/**
 * Utilidades de formateo para Copernico
 */

import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha ISO a formato legible
 */
export function formatDate(dateString: string | null, formatStr = 'dd MMM yyyy'): string {
    if (!dateString) return 'N/A';
    try {
        return format(parseISO(dateString), formatStr, { locale: es });
    } catch {
        return dateString;
    }
}

/**
 * Formatea una fecha como tiempo relativo
 */
export function formatRelativeDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    try {
        return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: es });
    } catch {
        return dateString;
    }
}

/**
 * Formatea bytes a unidades legibles
 */
export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Formatea porcentaje de nubes
 */
export function formatCloudCover(cloudCover: number | undefined): string {
    if (cloudCover === undefined || cloudCover === null) return 'N/A';
    return `${cloudCover.toFixed(1)}%`;
}

/**
 * Formatea coordenadas geográficas
 */
export function formatCoordinates(lat: number, lon: number, decimals = 4): string {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(decimals)}°${latDir}, ${Math.abs(lon).toFixed(decimals)}°${lonDir}`;
}

/**
 * Formatea un bounding box
 */
export function formatBbox(bbox: number[]): string {
    if (bbox.length !== 4) return 'Inválido';
    const [minLon, minLat, maxLon, maxLat] = bbox;
    return `[${minLon.toFixed(2)}, ${minLat.toFixed(2)}] → [${maxLon.toFixed(2)}, ${maxLat.toFixed(2)}]`;
}

/**
 * Extrae el nombre legible de un ID de producto
 */
export function formatProductId(id: string): string {
    // Ejemplo: S2A_MSIL2A_20231215T103411_N0510_R108_T30TYN_20231215T135806
    const parts = id.split('_');
    if (parts.length >= 4) {
        return `${parts[0]} - ${parts[2].substring(0, 8)}`;
    }
    return id.length > 30 ? `${id.substring(0, 27)}...` : id;
}

/**
 * Obtiene el color de la misión Sentinel
 */
export function getMissionColor(mission: string): string {
    const colors: Record<string, string> = {
        'SENTINEL-1': '#FF6B6B',
        'SENTINEL-2': '#4ECDC4',
        'SENTINEL-3': '#45B7D1',
        'SENTINEL-5P': '#96CEB4',
        'SENTINEL-6': '#FFEAA7',
    };
    return colors[mission] || '#888888';
}
