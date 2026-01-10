# Guía de Desarrollo - Copernico

## Configuración Inicial

### 1. Crear cuenta en Copernicus Data Space

1. Ve a https://dataspace.copernicus.eu/
2. Haz clic en "Register" para crear una cuenta
3. Verifica tu correo electrónico
4. Inicia sesión en el portal

### 2. Configurar credenciales OAuth

1. En el portal de Copernicus, ve a tu perfil
2. Busca la sección de "API Access" o "Applications"
3. Crea una nueva aplicación OAuth
4. Copia el `client_id` y `client_secret`

### 3. Configurar el proyecto

```bash
# Clonar e instalar
cd copernico
npm install

# Copiar archivo de entorno
cp .env.example .env.local

# Editar .env.local con tus credenciales
nano .env.local
```

Configura estas variables:
```env
VITE_COPERNICUS_CLIENT_ID=tu_client_id
VITE_COPERNICUS_CLIENT_SECRET=tu_client_secret
```

### 4. Iniciar el desarrollo

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

---

## Estructura de la API STAC

### Búsqueda básica

```typescript
import { stacClient } from '@/api';

// Buscar imágenes Sentinel-2
const results = await stacClient.search({
  collections: ['SENTINEL-2'],
  bbox: [-5.0, 40.0, -3.0, 42.0], // [minLon, minLat, maxLon, maxLat]
  datetime: '2024-01-01/2024-01-31',
  limit: 10,
  query: {
    'eo:cloud_cover': { lte: 20 } // máximo 20% nubes
  }
});
```

### Obtener detalles de un producto

```typescript
const item = await stacClient.getItem('SENTINEL-2', 'S2A_MSIL2A_...');

// Obtener URL de preview
const quicklook = stacClient.getQuicklookUrl(item);

// Obtener assets disponibles
console.log(Object.keys(item.assets));
```

---

## Agregar nuevas funcionalidades

### Crear un nuevo componente

```bash
mkdir -p src/components/MiComponente
```

Estructura:
```
MiComponente/
├── MiComponente.tsx
├── MiComponente.css
└── index.ts
```

### Crear una nueva página

```bash
mkdir -p src/pages/MiPagina
```

Luego agregar la ruta en `App.tsx`:
```tsx
<Route path="/mi-pagina" element={<MiPagina />} />
```

### Agregar al store

Editar `src/stores/appStore.ts` para agregar nuevo estado global.

---

## Testing

```bash
# Ejecutar tests
npm test

# Con coverage
npm test -- --coverage
```

---

## Deployment

```bash
# Build de producción
npm run build

# Los archivos estarán en dist/
```
