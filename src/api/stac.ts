/**
 * Cliente STAC API para Copernicus Data Space
 * 
 * STAC (SpatioTemporal Asset Catalog) es un estándar para describir
 * y catalogar datos geoespaciales.
 */

import axios, { AxiosInstance } from 'axios';
import { COPERNICUS_CONFIG } from './config';
import { authClient } from './auth';
import type {
    STACCollection,
    STACItem,
    STACSearchParams,
    STACSearchResponse,
    STACLink,
} from '@/types';

class STACClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: COPERNICUS_CONFIG.STAC_API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor para añadir token de autenticación
        this.client.interceptors.request.use(async (config) => {
            try {
                const token = await authClient.getAccessToken();
                config.headers.Authorization = `Bearer ${token}`;
            } catch {
                // Algunas peticiones STAC pueden funcionar sin auth
                console.warn('Proceeding without authentication');
            }
            return config;
        });
    }

    /**
     * Obtiene todas las colecciones disponibles
     */
    async getCollections(): Promise<STACCollection[]> {
        const response = await this.client.get<{ collections: STACCollection[] }>('/collections');
        return response.data.collections;
    }

    /**
     * Obtiene una colección específica por ID
     */
    async getCollection(collectionId: string): Promise<STACCollection> {
        const response = await this.client.get<STACCollection>(`/collections/${collectionId}`);
        return response.data;
    }

    /**
     * Busca items en el catálogo STAC
     */
    async search(params: STACSearchParams): Promise<STACSearchResponse> {
        const response = await this.client.post<STACSearchResponse>('/search', params);
        return response.data;
    }

    /**
     * Obtiene un item específico
     */
    async getItem(collectionId: string, itemId: string): Promise<STACItem> {
        const response = await this.client.get<STACItem>(
            `/collections/${collectionId}/items/${itemId}`
        );
        return response.data;
    }

    /**
     * Obtiene todos los items de una colección con paginación
     */
    async getItems(
        collectionId: string,
        params?: { limit?: number; bbox?: number[]; datetime?: string }
    ): Promise<STACSearchResponse> {
        const response = await this.client.get<STACSearchResponse>(
            `/collections/${collectionId}/items`,
            { params }
        );
        return response.data;
    }

    /**
     * Busca imágenes Sentinel-2 con bajo porcentaje de nubes
     */
    async searchSentinel2(options: {
        bbox: number[];
        startDate: string;
        endDate: string;
        maxCloudCover?: number;
        limit?: number;
    }): Promise<STACItem[]> {
        const { bbox, startDate, endDate, maxCloudCover = 20, limit = 10 } = options;

        const searchParams: STACSearchParams = {
            collections: ['SENTINEL-2'],
            bbox,
            datetime: `${startDate}/${endDate}`,
            limit,
            query: {
                'eo:cloud_cover': {
                    lte: maxCloudCover,
                },
            },
            sortby: [{ field: 'datetime', direction: 'desc' }],
        };

        const response = await this.search(searchParams);
        return response.features;
    }

    /**
     * Busca imágenes SAR de Sentinel-1
     */
    async searchSentinel1(options: {
        bbox: number[];
        startDate: string;
        endDate: string;
        limit?: number;
    }): Promise<STACItem[]> {
        const { bbox, startDate, endDate, limit = 10 } = options;

        const searchParams: STACSearchParams = {
            collections: ['SENTINEL-1'],
            bbox,
            datetime: `${startDate}/${endDate}`,
            limit,
            sortby: [{ field: 'datetime', direction: 'desc' }],
        };

        const response = await this.search(searchParams);
        return response.features;
    }

    /**
     * Sigue un link de paginación
     */
    async followLink(link: STACLink): Promise<STACSearchResponse> {
        const response = await this.client.get<STACSearchResponse>(link.href);
        return response.data;
    }

    /**
     * Obtiene la URL de quicklook (preview) de un item
     */
    getQuicklookUrl(item: STACItem): string | null {
        const quicklookAsset = item.assets['thumbnail'] || item.assets['overview'] || item.assets['quicklook'];
        return quicklookAsset?.href || null;
    }

    /**
     * Obtiene la URL de descarga de un asset específico
     */
    getAssetDownloadUrl(item: STACItem, assetKey: string): string | null {
        const asset = item.assets[assetKey];
        return asset?.href || null;
    }
}

// Exportamos una instancia singleton
export const stacClient = new STACClient();
export default stacClient;
