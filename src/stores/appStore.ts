/**
 * Store global de la aplicación LarvaLINK MRV
 */

import { create } from 'zustand';
import type {
    AuthState,
    MapViewState,
    SearchFilters,
    STACItem,
    STACCollection,
    AppNotification
} from '@/types';
import { DEFAULT_MAP_CONFIG } from '@/api/config';

interface AppState {
    // Authentication
    auth: AuthState;
    setAuth: (auth: Partial<AuthState>) => void;
    logout: () => void;

    // Map
    mapView: MapViewState;
    setMapView: (view: Partial<MapViewState>) => void;

    // Search
    searchFilters: SearchFilters;
    setSearchFilters: (filters: Partial<SearchFilters>) => void;
    resetSearchFilters: () => void;

    // Results
    searchResults: STACItem[];
    setSearchResults: (results: STACItem[]) => void;
    selectedItem: STACItem | null;
    setSelectedItem: (item: STACItem | null) => void;

    // Collections
    collections: STACCollection[];
    setCollections: (collections: STACCollection[]) => void;

    // UI State
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;

    // Notifications
    notifications: AppNotification[];
    addNotification: (notification: Omit<AppNotification, 'id'>) => void;
    removeNotification: (id: string) => void;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    expiresAt: null,
    refreshToken: null,
};

const initialSearchFilters: SearchFilters = {
    collections: ['SENTINEL-2'],
    dateRange: {
        start: null,
        end: null,
    },
    cloudCover: {
        min: 0,
        max: 30,
    },
    bbox: null,
};

export const useAppStore = create<AppState>((set, get) => ({
    // Authentication
    auth: initialAuthState,
    setAuth: (auth) => set((state) => ({
        auth: { ...state.auth, ...auth }
    })),
    logout: () => set({ auth: initialAuthState }),

    // Map
    mapView: {
        center: DEFAULT_MAP_CONFIG.center,
        zoom: DEFAULT_MAP_CONFIG.zoom,
    },
    setMapView: (view) => set((state) => ({
        mapView: { ...state.mapView, ...view }
    })),

    // Search
    searchFilters: initialSearchFilters,
    setSearchFilters: (filters) => set((state) => ({
        searchFilters: { ...state.searchFilters, ...filters }
    })),
    resetSearchFilters: () => set({ searchFilters: initialSearchFilters }),

    // Results
    searchResults: [],
    setSearchResults: (results) => set({ searchResults: results }),
    selectedItem: null,
    setSelectedItem: (item) => set({ selectedItem: item }),

    // Collections
    collections: [],
    setCollections: (collections) => set({ collections }),

    // UI State
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    // Notifications
    notifications: [],
    addNotification: (notification) => {
        const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        set((state) => ({
            notifications: [...state.notifications, { ...notification, id }]
        }));
        // Auto-remove after duration
        if (notification.duration !== 0) {
            setTimeout(() => {
                get().removeNotification(id);
            }, notification.duration || 5000);
        }
    },
    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
    })),
}));

export default useAppStore;
