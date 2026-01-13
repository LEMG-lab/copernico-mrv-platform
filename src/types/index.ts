// Stub types for legacy Copernicus integration (module deleted)
// These are used by appStore.ts but no longer needed - stubbed to prevent build errors

export interface AuthState {
    isAuthenticated: boolean;
    user: null;
    accessToken?: string | null;
}

export interface MapViewState {
    center: [number, number];
    zoom: number;
}

export interface SearchFilters {
    query: string;
    collections?: string[];
    dateRange?: { start: string; end: string };
    cloudCover?: { min: number; max: number };
}

export interface STACItem {
    id: string;
    type: string;
}

export interface STACCollection {
    id: string;
    title: string;
}

export interface AppNotification {
    id: string;
    message: string;
    type: 'info' | 'error' | 'success';
    duration?: number;
}
