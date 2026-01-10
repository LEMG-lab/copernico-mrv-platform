# LarvaLINK - Copernico MRV System

Sistema de Medición, Reporte y Verificación (MRV) basado en datos satelitales de Copernicus (ESA) para la industria de bioconversión de insectos.

## Tecnologías

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Mapas:** Leaflet, React-Leaflet, CartoDB Dark Matter
- **Gráficos:** Recharts
- **Estado:** Zustand
- **Datos:**
    - Sentinel-2 (NDVI, Humedad del suelo)
    - Sentinel-5P (Metano/CH4, NO2)
    - IPCC 2019 Refinement (Factores de emisión)

## Módulos

### 1. Dashboard de Inversionistas (Nuevo Home)
Resumen ejecutivo en tiempo real con métricas agregadas de impacto y navegación centralizada. Soporte multi-idioma (ES/EN) y temas Claro/Oscuro.

### 2. Impacto TerraLINK (`/terralink`)
Visualización de mejora de suelos. Compara parcelas tratadas con fertilizante LarvaLINK vs. Control usando series temporales de NDVI.

### 3. Calculadora de Emisiones (`/emissions`)
Herramienta certificada de cálculo de emisiones evitadas (metano) al desviar residuos de rellenos sanitarios. Metodología basada en GWP20.

### 4. Red Global (`/network`)
Mapa interactivo que muestra plantas de LarvaLINK, competidores (BSF) y hotspots de metano detectados por satélite para expansión estratégica.

## Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Correr servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Visitar `http://localhost:5173` (o el puerto indicado).

## Estructura de Directorios

- `src/modules/`: Contiene la lógica aislada de cada sub-sistema.
- `src/stores/`: Manejo de estado global (Tema, UI).
- `src/i18n/`: Traducciones.
- `src/components/`: Componentes compartidos de UI.

---
Sitio construido para LarvaLINK por Copernico AI.
