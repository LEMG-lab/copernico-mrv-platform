/**
 * Tipos para Copernicus Data Space Ecosystem
 */

// =============================================
// AUTHENTICATION
// =============================================

export interface CopernicusCredentials {
    clientId: string;
    clientSecret: string;
}

export interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    token_type: string;
    scope?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    expiresAt: number | null;
    refreshToken: string | null;
}

// =============================================
// STAC (SpatioTemporal Asset Catalog)
// =============================================

export interface STACCollection {
    id: string;
    type: 'Collection';
    stac_version: string;
    stac_extensions?: string[];
    title?: string;
    description: string;
    keywords?: string[];
    license: string;
    providers?: STACProvider[];
    extent: STACExtent;
    summaries?: Record<string, unknown>;
    links: STACLink[];
}

export interface STACProvider {
    name: string;
    description?: string;
    roles?: ('licensor' | 'producer' | 'processor' | 'host')[];
    url?: string;
}

export interface STACExtent {
    spatial: {
        bbox: number[][];
    };
    temporal: {
        interval: (string | null)[][];
    };
}

export interface STACLink {
    rel: string;
    href: string;
    type?: string;
    title?: string;
}

export interface STACItem {
    id: string;
    type: 'Feature';
    stac_version: string;
    stac_extensions?: string[];
    geometry: GeoJSONGeometry;
    bbox: number[];
    properties: STACItemProperties;
    links: STACLink[];
    assets: Record<string, STACAsset>;
    collection?: string;
}

export interface STACItemProperties {
    datetime: string | null;
    start_datetime?: string;
    end_datetime?: string;
    created?: string;
    updated?: string;
    platform?: string;
    instruments?: string[];
    constellation?: string;
    mission?: string;
    gsd?: number;
    'eo:cloud_cover'?: number;
    [key: string]: unknown;
}

export interface STACAsset {
    href: string;
    type?: string;
    title?: string;
    description?: string;
    roles?: string[];
    'eo:bands'?: EOBand[];
}

export interface EOBand {
    name: string;
    common_name?: string;
    description?: string;
    center_wavelength?: number;
    full_width_half_max?: number;
}

export interface STACSearchParams {
    collections?: string[];
    ids?: string[];
    bbox?: number[];
    intersects?: GeoJSONGeometry;
    datetime?: string;
    limit?: number;
    query?: Record<string, unknown>;
    sortby?: Array<{ field: string; direction: 'asc' | 'desc' }>;
}

export interface STACSearchResponse {
    type: 'FeatureCollection';
    features: STACItem[];
    links: STACLink[];
    numberMatched?: number;
    numberReturned?: number;
    context?: {
        returned: number;
        limit: number;
        matched?: number;
    };
}

// =============================================
// GEOMETRY
// =============================================

export type GeoJSONGeometry =
    | GeoJSONPoint
    | GeoJSONLineString
    | GeoJSONPolygon
    | GeoJSONMultiPoint
    | GeoJSONMultiLineString
    | GeoJSONMultiPolygon;

export interface GeoJSONPoint {
    type: 'Point';
    coordinates: [number, number];
}

export interface GeoJSONLineString {
    type: 'LineString';
    coordinates: [number, number][];
}

export interface GeoJSONPolygon {
    type: 'Polygon';
    coordinates: [number, number][][];
}

export interface GeoJSONMultiPoint {
    type: 'MultiPoint';
    coordinates: [number, number][];
}

export interface GeoJSONMultiLineString {
    type: 'MultiLineString';
    coordinates: [number, number][][];
}

export interface GeoJSONMultiPolygon {
    type: 'MultiPolygon';
    coordinates: [number, number][][][];
}

// =============================================
// SENTINEL MISSIONS
// =============================================

export type SentinelMission =
    | 'SENTINEL-1'
    | 'SENTINEL-2'
    | 'SENTINEL-3'
    | 'SENTINEL-5P'
    | 'SENTINEL-6';

export interface SentinelProduct {
    id: string;
    name: string;
    mission: SentinelMission;
    acquisitionDate: Date;
    cloudCover?: number;
    geometry: GeoJSONPolygon;
    downloadUrl?: string;
    quicklookUrl?: string;
    size?: number;
    processingLevel?: string;
}

// =============================================
// OPENEO
// =============================================

export interface OpenEOProcess {
    id: string;
    summary?: string;
    description?: string;
    categories?: string[];
    parameters?: OpenEOParameter[];
    returns?: {
        description?: string;
        schema: Record<string, unknown>;
    };
}

export interface OpenEOParameter {
    name: string;
    description?: string;
    schema: Record<string, unknown>;
    optional?: boolean;
    default?: unknown;
}

export interface OpenEOJob {
    id: string;
    title?: string;
    description?: string;
    process: Record<string, unknown>;
    status: 'created' | 'queued' | 'running' | 'finished' | 'error' | 'canceled';
    created: string;
    updated?: string;
    progress?: number;
    costs?: number;
    budget?: number;
}

// =============================================
// APP STATE
// =============================================

export interface MapViewState {
    center: [number, number];
    zoom: number;
    bounds?: [[number, number], [number, number]];
}

export interface SearchFilters {
    collections: string[];
    dateRange: {
        start: string | null;
        end: string | null;
    };
    cloudCover: {
        min: number;
        max: number;
    };
    bbox: number[] | null;
}

export interface AppNotification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}
