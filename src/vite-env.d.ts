/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COPERNICUS_CLIENT_ID: string;
    readonly VITE_COPERNICUS_CLIENT_SECRET: string;
    readonly VITE_COPERNICUS_AUTH_URL: string;
    readonly VITE_COPERNICUS_TOKEN_URL: string;
    readonly VITE_STAC_API_URL: string;
    readonly VITE_ODATA_API_URL: string;
    readonly VITE_OPENEO_API_URL: string;
    readonly VITE_SENTINEL_HUB_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_ENV: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
