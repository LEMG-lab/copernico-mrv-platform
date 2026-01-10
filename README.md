# 🛰️ Copernico

**Sistema de conexión con Copernicus Data Space Ecosystem**

Copernico es una aplicación que proporciona acceso e integración con el ecosistema de datos de Copernicus de la ESA (European Space Agency), permitiendo explorar, analizar y descargar imágenes satelitales y datos de observación terrestre.

---

## 🌍 ¿Qué es Copernicus Data Space?

El **Copernicus Data Space Ecosystem (CDSE)** es un ecosistema abierto que proporciona acceso gratuito e instantáneo a una amplia gama de datos y servicios de las misiones Sentinel de Copernicus sobre la tierra, océanos y atmósfera de nuestro planeta.

### APIs Disponibles:
- **STAC API** - Catálogo de datos espaciales
- **openEO API** - Procesamiento en la nube de datos de observación terrestre
- **Sentinel Hub API** - Visualización y procesamiento de imágenes
- **OData API** - Descarga de productos

---

## 📁 Estructura del Proyecto

```
copernico/
├── src/
│   ├── api/           # Clientes API para CDSE
│   ├── components/    # Componentes React reutilizables
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Páginas de la aplicación
│   ├── services/      # Servicios de negocio
│   ├── stores/        # Estado global (Zustand)
│   ├── types/         # Definiciones TypeScript
│   └── utils/         # Utilidades y helpers
├── public/            # Archivos estáticos
├── docs/              # Documentación
├── tests/             # Tests
└── ...
```

---

## 🚀 Características Principales

- [ ] **Autenticación OAuth2** con Copernicus Data Space
- [ ] **Explorador de Catálogo** - Búsqueda de productos Sentinel
- [ ] **Visualización de mapas** con imágenes satelitales
- [ ] **Descarga de datos** - Productos completos o recortados
- [ ] **Procesamiento openEO** - Análisis en la nube
- [ ] **Dashboard** - Estadísticas y métricas

---

## 🔧 Tecnologías

- **Frontend**: React + TypeScript + Vite
- **Mapas**: Leaflet / OpenLayers
- **Estado**: Zustand
- **Estilos**: CSS moderno con variables
- **APIs**: Copernicus Data Space (STAC, openEO, Sentinel Hub)

---

## 📋 Requisitos Previos

1. **Cuenta en Copernicus Data Space**: [Registrarse aquí](https://dataspace.copernicus.eu/)
2. **OAuth Client**: Configurar credenciales en el portal
3. Node.js v18+ y npm

---

## ⚙️ Instalación

```bash
# Clonar el repositorio
cd copernico

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

---

## 🔐 Variables de Entorno

```env
# Copernicus Data Space
VITE_COPERNICUS_CLIENT_ID=tu_client_id
VITE_COPERNICUS_CLIENT_SECRET=tu_client_secret
VITE_COPERNICUS_AUTH_URL=https://identity.dataspace.copernicus.eu

# APIs
VITE_STAC_API_URL=https://catalogue.dataspace.copernicus.eu/stac
VITE_OPENEO_API_URL=https://openeo.dataspace.copernicus.eu
VITE_SENTINEL_HUB_URL=https://sh.dataspace.copernicus.eu
```

---

## 📚 Documentación

- [Copernicus Data Space Docs](https://documentation.dataspace.copernicus.eu/)
- [STAC API](https://documentation.dataspace.copernicus.eu/APIs/STAC.html)
- [openEO](https://documentation.dataspace.copernicus.eu/APIs/openEO/openEO.html)
- [Sentinel Hub](https://documentation.dataspace.copernicus.eu/APIs/SentinelHub.html)

---

## 📜 Licencia

MIT License - Ver [LICENSE](LICENSE)
