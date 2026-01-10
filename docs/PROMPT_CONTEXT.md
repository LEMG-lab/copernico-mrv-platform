# 🛰️ Prompt de Contexto - Proyecto Copernico

## Descripción del Proyecto

**Copernico** es una aplicación web que sirve como interfaz de conexión con el **Copernicus Data Space Ecosystem (CDSE)** de la Agencia Espacial Europea (ESA). 

El objetivo es proporcionar una herramienta intuitiva para:
- Explorar el catálogo de datos satelitales Sentinel
- Visualizar imágenes de observación terrestre
- Descargar productos y datasets
- Ejecutar análisis en la nube con openEO

---

## 🌐 APIs de Copernicus Data Space

### 1. STAC API (Catálogo)
- **URL**: `https://catalogue.dataspace.copernicus.eu/stac`
- **Propósito**: Búsqueda y descubrimiento de productos
- **Documentación**: https://documentation.dataspace.copernicus.eu/APIs/STAC.html

### 2. OData API (Descarga)
- **URL**: `https://catalogue.dataspace.copernicus.eu/odata/v1`
- **Propósito**: Descarga de productos completos
- **Documentación**: https://documentation.dataspace.copernicus.eu/APIs/OData.html

### 3. openEO API (Procesamiento)
- **URL**: `https://openeo.dataspace.copernicus.eu`
- **Propósito**: Procesamiento en la nube
- **Documentación**: https://documentation.dataspace.copernicus.eu/APIs/openEO/openEO.html

### 4. Sentinel Hub API (Visualización)
- **URL**: `https://sh.dataspace.copernicus.eu`
- **Propósito**: Visualización y procesamiento de imágenes
- **Documentación**: https://documentation.dataspace.copernicus.eu/APIs/SentinelHub.html

---

## 🔐 Autenticación

Copernicus usa OAuth2 con Keycloak:

```
Token URL: https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token
```

### Flujo de autenticación:
1. Registrarse en https://dataspace.copernicus.eu/
2. Crear una aplicación OAuth en el dashboard
3. Obtener `client_id` y `client_secret`
4. Usar `grant_type=client_credentials` para obtener token

---

## 🛰️ Misiones Sentinel Disponibles

| Misión | Tipo | Resolución | Uso Principal |
|--------|------|------------|---------------|
| Sentinel-1 | SAR Radar | 5-40m | Imágenes todo clima, deformación del terreno |
| Sentinel-2 | Óptico Multi-espectral | 10-60m | Vegetación, agricultura, mapeo |
| Sentinel-3 | Océano/Tierra | 300m-1km | Monitoreo oceánico, temperatura |
| Sentinel-5P | Atmosférico | 7km | Calidad del aire, gases |
| Sentinel-6 | Altimetría | N/A | Nivel del mar |

---

## 📋 Funcionalidades a Implementar

### Fase 1 - MVP ✅
- [x] Estructura del proyecto
- [x] Sistema de autenticación OAuth2
- [x] Cliente STAC API
- [x] Store de estado global
- [x] UI con tema espacial
- [x] Página de inicio

### Fase 2 - Explorador
- [ ] Mapa interactivo con Leaflet
- [ ] Dibujo de área de interés (AOI)
- [ ] Lista de resultados de búsqueda
- [ ] Preview de productos (quicklook)
- [ ] Panel de detalles del producto

### Fase 3 - Descarga y Visualización
- [ ] Descarga de productos
- [ ] Integración con Sentinel Hub para visualización
- [ ] Capas personalizables en el mapa
- [ ] Historial de descargas

### Fase 4 - Procesamiento
- [ ] Integración con openEO
- [ ] Ejecución de procesos predefinidos
- [ ] Creación de workflows personalizados
- [ ] Monitoreo de jobs

---

## 🏗️ Arquitectura

```
src/
├── api/           # Clientes API (auth, stac, openeo, sentinel-hub)
├── components/    # Componentes React reutilizables
│   ├── Header/
│   ├── Sidebar/
│   ├── Map/       # (por implementar)
│   └── ...
├── hooks/         # Custom hooks (useCopernicus, useMap, etc.)
├── pages/         # Páginas de la aplicación
│   ├── HomePage/
│   ├── ExplorePage/   # (por implementar)
│   └── ...
├── services/      # Lógica de negocio
├── stores/        # Estado global con Zustand
├── types/         # Tipos TypeScript
└── utils/         # Utilidades
```

---

## 🎨 Diseño

- **Tema**: Espacial / Dark mode
- **Colores principales**: 
  - Primary: `#00d4ff` (cyan espacial)
  - Secondary: `#7c3aed` (púrpura)
  - Background: Gradientes oscuros con efecto de estrellas
- **Tipografía**: Space Grotesk (display) + JetBrains Mono (código)
- **Efectos**: Glassmorphism, gradientes, animaciones suaves

---

## 📚 Recursos Útiles

- [Copernicus Data Space - Portal](https://dataspace.copernicus.eu/)
- [Documentación completa](https://documentation.dataspace.copernicus.eu/)
- [Copernicus Browser](https://browser.dataspace.copernicus.eu/)
- [STAC Specification](https://stacspec.org/)
- [openEO Documentation](https://openeo.org/)
- [Sentinel Hub Docs](https://docs.sentinel-hub.com/)

---

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Tests
npm test
```

---

## 💡 Notas para el Desarrollo

1. **Autenticación**: Necesitas credenciales válidas de Copernicus para hacer búsquedas autenticadas
2. **CORS**: Algunas APIs pueden necesitar proxy en desarrollo
3. **Rate Limits**: Copernicus tiene límites de tasa, implementar retry logic
4. **Datos grandes**: Los productos pueden ser muy grandes (GBs), considerar descarga parcial
5. **Mapas**: Usar Leaflet o OpenLayers para visualización geográfica
