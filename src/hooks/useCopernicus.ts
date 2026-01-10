/**
 * Hook para interactuar con Copernicus Data Space
 */

import { useState, useCallback } from 'react';
import { stacClient, authClient } from '@/api';
import { useAppStore } from '@/stores';
import type { STACItem, STACSearchParams } from '@/types';

export function useCopernicus() {
    const [error, setError] = useState<string | null>(null);
    const {
        setLoading,
        setSearchResults,
        setCollections,
        addNotification,
        searchFilters
    } = useAppStore();

    /**
     * Autentica con Copernicus
     */
    const authenticate = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await authClient.authenticate();
            addNotification({
                type: 'success',
                message: '✅ Conectado a Copernicus Data Space',
            });
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error de autenticación';
            setError(message);
            addNotification({
                type: 'error',
                message: `❌ ${message}`,
            });
            return false;
        } finally {
            setLoading(false);
        }
    }, [setLoading, addNotification]);

    /**
     * Carga las colecciones disponibles
     */
    const loadCollections = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const collections = await stacClient.getCollections();
            setCollections(collections);
            return collections;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error cargando colecciones';
            setError(message);
            addNotification({
                type: 'error',
                message: `❌ ${message}`,
            });
            return [];
        } finally {
            setLoading(false);
        }
    }, [setLoading, setCollections, addNotification]);

    /**
     * Busca productos en el catálogo
     */
    const search = useCallback(async (params?: Partial<STACSearchParams>) => {
        setLoading(true);
        setError(null);
        try {
            const searchParams: STACSearchParams = {
                collections: params?.collections || searchFilters.collections,
                bbox: params?.bbox || searchFilters.bbox || undefined,
                datetime: params?.datetime || (searchFilters.dateRange.start && searchFilters.dateRange.end
                    ? `${searchFilters.dateRange.start}/${searchFilters.dateRange.end}`
                    : undefined),
                limit: params?.limit || 20,
                query: {
                    'eo:cloud_cover': {
                        lte: searchFilters.cloudCover.max,
                        gte: searchFilters.cloudCover.min,
                    },
                    ...params?.query,
                },
            };

            const response = await stacClient.search(searchParams);
            setSearchResults(response.features);

            addNotification({
                type: 'success',
                message: `🛰️ ${response.features.length} productos encontrados`,
            });

            return response.features;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error en la búsqueda';
            setError(message);
            addNotification({
                type: 'error',
                message: `❌ ${message}`,
            });
            return [];
        } finally {
            setLoading(false);
        }
    }, [setLoading, setSearchResults, addNotification, searchFilters]);

    /**
     * Busca imágenes Sentinel-2 en un área y rango de fechas
     */
    const searchSentinel2 = useCallback(async (
        bbox: number[],
        startDate: string,
        endDate: string,
        maxCloudCover = 20
    ): Promise<STACItem[]> => {
        setLoading(true);
        setError(null);
        try {
            const items = await stacClient.searchSentinel2({
                bbox,
                startDate,
                endDate,
                maxCloudCover,
                limit: 20,
            });
            setSearchResults(items);
            addNotification({
                type: 'success',
                message: `🛰️ ${items.length} imágenes Sentinel-2 encontradas`,
            });
            return items;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error buscando Sentinel-2';
            setError(message);
            addNotification({
                type: 'error',
                message: `❌ ${message}`,
            });
            return [];
        } finally {
            setLoading(false);
        }
    }, [setLoading, setSearchResults, addNotification]);

    /**
     * Obtiene los detalles de un item
     */
    const getItemDetails = useCallback(async (
        collectionId: string,
        itemId: string
    ): Promise<STACItem | null> => {
        setLoading(true);
        setError(null);
        try {
            const item = await stacClient.getItem(collectionId, itemId);
            return item;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error obteniendo detalles';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    return {
        error,
        authenticate,
        loadCollections,
        search,
        searchSentinel2,
        getItemDetails,
        isAuthenticated: authClient.isAuthenticated(),
    };
}

export default useCopernicus;
