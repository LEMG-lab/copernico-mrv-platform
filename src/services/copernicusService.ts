/**
 * Servicio de conexión con Copernicus Data Space Ecosystem
 * Especializado para LarvaLINK MRV
 */

import axios from 'axios';
import CryptoJS from 'crypto-js';
import { COPERNICUS_CONFIG } from '@/api/config';
import { EVALSCRIPTS, EvalScriptType } from '@/constants/evalscripts';

// Tipos
interface CopernicusToken {
    access_token: string;
    expires_in: number;
}

interface ImageStats {
    min: number;
    max: number;
    mean: number;
    stDev: number;
}

class CopernicusService {
    private accessToken: string | null = null;
    private tokenExpiresAt: number = 0;

    /**
     * Obtiene un token de acceso válido (OAuth2)
     */
    async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiresAt) {
            return this.accessToken;
        }

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', COPERNICUS_CONFIG.CLIENT_ID || import.meta.env.VITE_COPERNICUS_CLIENT_ID);
        params.append('client_secret', COPERNICUS_CONFIG.CLIENT_SECRET || import.meta.env.VITE_COPERNICUS_CLIENT_SECRET);

        // Usar proxy local en desarrollo para evitar CORS
        const authBaseUrl = import.meta.env.DEV ? '/auth-proxy' : (COPERNICUS_CONFIG.AUTH_URL || import.meta.env.VITE_COPERNICUS_AUTH_URL);

        try {
            const response = await axios.post<CopernicusToken>(
                `${authBaseUrl}/auth/realms/CDSE/protocol/openid-connect/token`,
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            this.accessToken = response.data.access_token;
            // Guardar expiración con margen de 60 segundos
            this.tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;

            return this.accessToken;
        } catch (error) {
            console.error('Error obteniendo token de Copernicus:', error);
            throw new Error('Falló la autenticación con Copernicus');
        }
    }

    /**
     * Obtiene una imagen satelital procesada (URL del blob)
     */
    async getSatelliteImage(
        bbox: number[], // [minLon, minLat, maxLon, maxLat]
        dateFrom: string,
        dateTo: string,
        scriptType: EvalScriptType = 'trueColor',
        width: number = 512,
        height: number = 512
    ): Promise<{ imageUrl: string; date: string; imageBlob: Blob }> {
        const token = await this.getAccessToken();
        const evalscript = EVALSCRIPTS[scriptType];

        // Usar proxy local en desarrollo para evitar CORS
        const shBaseUrl = import.meta.env.DEV ? '/sh-proxy' : (COPERNICUS_CONFIG.SENTINEL_HUB_URL || import.meta.env.VITE_SENTINEL_HUB_URL);

        const requestBody = {
            input: {
                bounds: {
                    bbox: bbox,
                    properties: {
                        crs: "http://www.opengis.net/def/crs/EPSG/0/4326"
                    }
                },
                data: [
                    {
                        type: "sentinel-2-l2a",
                        dataFilter: {
                            timeRange: {
                                from: `${dateFrom}T00:00:00Z`,
                                to: `${dateTo}T23:59:59Z`
                            },
                            mosaickingOrder: "leastCC", // Menor cobertura de nubes
                            maxCloudCoverage: 20
                        }
                    }
                ]
            },
            output: {
                width: width,
                height: height,
                responses: [
                    {
                        identifier: "default",
                        format: {
                            type: "image/png"
                        }
                    }
                ]
            },
            evalscript: evalscript
        };

        try {
            // 1. Obtener la imagen
            const response = await axios.post(
                `${shBaseUrl}/api/v1/process`,
                requestBody,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' // Sentinel Hub a veces retorna info headers aquí
                    },
                    responseType: 'blob'
                }
            );

            // Crear URL para mostrar la imagen
            const imageBlob = response.data;
            const imageUrl = URL.createObjectURL(imageBlob);

            // Nota: La fecha exacta de la imagen usada en el mosaico es compleja de extraer 
            // de esta respuesta simple, normalmente se usa la Catalog API para eso.
            // Por simplicidad usaremos la fecha final del rango o "Mosaico Reciente".

            return {
                imageUrl,
                date: dateTo,
                imageBlob
            };

        } catch (error) {
            console.error('Error procesando imagen satelital:', error);
            throw error;
        }
    }

    /**
     * Obtiene estadísticas (ej. NDVI promedio) de la zona
     */
    async getNDVIStats(
        bbox: number[],
        dateFrom: string,
        dateTo: string
    ): Promise<ImageStats> {
        const token = await this.getAccessToken();

        // Configuración para Statistical API
        const requestBody = {
            input: {
                bounds: {
                    bbox: bbox,
                    properties: { crs: "http://www.opengis.net/def/crs/EPSG/0/4326" }
                },
                data: [{
                    type: "sentinel-2-l2a",
                    dataFilter: { timeRange: { from: `${dateFrom}T00:00:00Z`, to: `${dateTo}T23:59:59Z` } }
                }]
            },
            aggregation: {
                timeRange: { from: `${dateFrom}T00:00:00Z`, to: `${dateTo}T23:59:59Z` },
                aggregationInterval: { of: "P1D" }, // Diario
                evalscript: EVALSCRIPTS.ndvi,
                width: 100,
                height: 100
            }
        };

        // Mock de respuesta por ahora ya que Statistical API requiere una config compleja
        // En producción se usaría axios.post a /api/v1/statistics

        return {
            min: 0.1,
            max: 0.8,
            mean: 0.45 + (Math.random() * 0.1), // Simulado para demo
            stDev: 0.15
        };
    }

    /**
     * Genera Hash SHA256 para verificación MRV
     */
    async generateVerificationHash(data: Blob | string | object): Promise<string> {
        let content: string;

        if (data instanceof Blob) {
            const buffer = await data.arrayBuffer();
            const wordArray = CryptoJS.lib.WordArray.create(buffer);
            return CryptoJS.SHA256(wordArray).toString();
        } else if (typeof data === 'object') {
            content = JSON.stringify(data);
        } else {
            content = String(data);
        }

        return CryptoJS.SHA256(content).toString();
    }
}

export const copernicusService = new CopernicusService();
