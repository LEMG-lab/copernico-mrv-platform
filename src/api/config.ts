/**
 * Configuración de endpoints y constantes de Copernicus Data Space
 */

export const COPERNICUS_CONFIG = {
    // Authentication
    AUTH_URL: import.meta.env.VITE_COPERNICUS_AUTH_URL || 'https://identity.dataspace.copernicus.eu',
    TOKEN_ENDPOINT: '/auth/realms/CDSE/protocol/openid-connect/token',

    // APIs
    STAC_API_URL: import.meta.env.VITE_STAC_API_URL || 'https://catalogue.dataspace.copernicus.eu/stac',
    ODATA_API_URL: import.meta.env.VITE_ODATA_API_URL || 'https://catalogue.dataspace.copernicus.eu/odata/v1',
    OPENEO_API_URL: import.meta.env.VITE_OPENEO_API_URL || 'https://openeo.dataspace.copernicus.eu',
    SENTINEL_HUB_URL: import.meta.env.VITE_SENTINEL_HUB_URL || 'https://sh.dataspace.copernicus.eu',

    // Client credentials
    CLIENT_ID: import.meta.env.VITE_COPERNICUS_CLIENT_ID || '',
    CLIENT_SECRET: import.meta.env.VITE_COPERNICUS_CLIENT_SECRET || '',
};

// Colecciones STAC disponibles
export const STAC_COLLECTIONS = {
    SENTINEL_1_GRD: 'SENTINEL-1',
    SENTINEL_2_L1C: 'SENTINEL-2',
    SENTINEL_2_L2A: 'SENTINEL-2',
    SENTINEL_3_OLCI: 'SENTINEL-3',
    SENTINEL_3_SLSTR: 'SENTINEL-3',
    SENTINEL_5P: 'SENTINEL-5P',
} as const;

// Información de misiones Sentinel
export const SENTINEL_MISSIONS = {
    'SENTINEL-1': {
        name: 'Sentinel-1',
        description: 'Radar de apertura sintética (SAR) para imágenes todo tiempo',
        instruments: ['C-SAR'],
        launchDate: '2014-04-03',
        color: '#FF6B6B',
    },
    'SENTINEL-2': {
        name: 'Sentinel-2',
        description: 'Imágenes multiespectrales de alta resolución',
        instruments: ['MSI'],
        launchDate: '2015-06-23',
        color: '#4ECDC4',
    },
    'SENTINEL-3': {
        name: 'Sentinel-3',
        description: 'Monitoreo de océanos y tierra',
        instruments: ['OLCI', 'SLSTR', 'SRAL'],
        launchDate: '2016-02-16',
        color: '#45B7D1',
    },
    'SENTINEL-5P': {
        name: 'Sentinel-5P',
        description: 'Monitoreo atmosférico y calidad del aire',
        instruments: ['TROPOMI'],
        launchDate: '2017-10-13',
        color: '#96CEB4',
    },
    'SENTINEL-6': {
        name: 'Sentinel-6',
        description: 'Altimetría del nivel del mar',
        instruments: ['Poseidon-4'],
        launchDate: '2020-11-21',
        color: '#FFEAA7',
    },
} as const;

// Configuración del mapa por defecto
export const DEFAULT_MAP_CONFIG = {
    center: [40.4168, -3.7038] as [number, number], // Madrid, España
    zoom: 5,
    maxZoom: 18,
    minZoom: 2,
};

// Capas base del mapa
export const MAP_TILE_LAYERS = {
    osm: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri',
    },
    terrain: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: 'Map data: &copy; OpenTopoMap contributors',
    },
};
