/**
 * Cliente de autenticación OAuth2 para Copernicus Data Space
 */

import axios from 'axios';
import { COPERNICUS_CONFIG } from './config';
import type { TokenResponse, AuthState } from '@/types';

class AuthClient {
    private accessToken: string | null = null;
    private expiresAt: number | null = null;
    private refreshToken: string | null = null;

    /**
     * Obtiene un token de acceso usando client credentials
     */
    async getAccessToken(): Promise<string> {
        // Si ya tenemos un token válido, lo retornamos
        if (this.accessToken && this.expiresAt && Date.now() < this.expiresAt - 60000) {
            return this.accessToken;
        }

        // Si tenemos refresh token, intentamos refrescar
        if (this.refreshToken) {
            try {
                return await this.refreshAccessToken();
            } catch {
                // Si falla el refresh, obtenemos un nuevo token
                console.warn('Failed to refresh token, getting new one');
            }
        }

        // Obtenemos un nuevo token
        return await this.authenticate();
    }

    /**
     * Autentica con Copernicus usando client credentials
     */
    async authenticate(): Promise<string> {
        const tokenUrl = `${COPERNICUS_CONFIG.AUTH_URL}${COPERNICUS_CONFIG.TOKEN_ENDPOINT}`;

        const params = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: COPERNICUS_CONFIG.CLIENT_ID,
            client_secret: COPERNICUS_CONFIG.CLIENT_SECRET,
        });

        try {
            const response = await axios.post<TokenResponse>(tokenUrl, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            this.setTokenData(response.data);
            return this.accessToken!;
        } catch (error) {
            console.error('Authentication failed:', error);
            throw new Error('Failed to authenticate with Copernicus Data Space');
        }
    }

    /**
     * Refresca el token de acceso
     */
    async refreshAccessToken(): Promise<string> {
        if (!this.refreshToken) {
            throw new Error('No refresh token available');
        }

        const tokenUrl = `${COPERNICUS_CONFIG.AUTH_URL}${COPERNICUS_CONFIG.TOKEN_ENDPOINT}`;

        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: COPERNICUS_CONFIG.CLIENT_ID,
            refresh_token: this.refreshToken,
        });

        const response = await axios.post<TokenResponse>(tokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        this.setTokenData(response.data);
        return this.accessToken!;
    }

    /**
     * Almacena los datos del token
     */
    private setTokenData(data: TokenResponse): void {
        this.accessToken = data.access_token;
        this.expiresAt = Date.now() + data.expires_in * 1000;
        this.refreshToken = data.refresh_token || null;
    }

    /**
     * Cierra la sesión
     */
    logout(): void {
        this.accessToken = null;
        this.expiresAt = null;
        this.refreshToken = null;
    }

    /**
     * Verifica si está autenticado
     */
    isAuthenticated(): boolean {
        return !!(this.accessToken && this.expiresAt && Date.now() < this.expiresAt);
    }

    /**
     * Obtiene el estado de autenticación
     */
    getAuthState(): AuthState {
        return {
            isAuthenticated: this.isAuthenticated(),
            accessToken: this.accessToken,
            expiresAt: this.expiresAt,
            refreshToken: this.refreshToken,
        };
    }

    /**
     * Crea headers de autorización
     */
    getAuthHeaders(): { Authorization: string } | Record<string, never> {
        if (!this.accessToken) {
            return {};
        }
        return {
            Authorization: `Bearer ${this.accessToken}`,
        };
    }
}

// Exportamos una instancia singleton
export const authClient = new AuthClient();
export default authClient;
