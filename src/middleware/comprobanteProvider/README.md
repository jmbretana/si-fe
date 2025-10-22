# Middleware ComprobantesProvider

Este middleware proporciona funcionalidad completa de CRUD para la gestión de comprobantes/facturas de proveedores.

## Estructura del Middleware

### Interfaces

#### ComprobanteProvider
```typescript
export interface ComprobanteProvider {
  _id?: string;
  comprobante_id?: number;
  provider_id: number;
  proveedor?: string;
  numero_comprobante: string;
  tipo_comprobante: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  subtotal: number;
  impuestos: number;
  total: number;
  moneda: string;
  estado: string; // pendiente, pagado, vencido, cancelado
  observaciones: string;
  archivo_adjunto?: string;
  created_at?: string;
  updated_at?: string;
}
```

### Action Types

- `COMPROBANTE_PROVIDER_CREATE_SUCCESS`
- `COMPROBANTE_PROVIDER_GETALL_SUCCESS`
- `COMPROBANTE_PROVIDER_GETBY_SUCCESS`
- `COMPROBANTE_PROVIDER_UPDATE_SUCCESS`
- `COMPROBANTE_PROVIDER_REMOVE_SUCCESS`
- `COMPROBANTE_PROVIDER_GET_FAIL`
- `COMPROBANTE_PROVIDER_MAKE_REQ`
- `COMPROBANTE_PROVIDER_CREATE_FAIL`
- `COMPROBANTE_PROVIDER_UPDATE_FAIL`

### Acciones Disponibles

#### Crear Comprobante
```typescript
CreateComprobanteProvider(newComprobante: ComprobanteProvider)
```

#### Obtener Comprobantes por Proveedor
```typescript
GetAllComprobantesByProvider(providerId: string)
```

#### Obtener Comprobante por ID
```typescript
GetComprobanteById(comprobanteId: string)
```

#### Actualizar Comprobante
```typescript
UpdateComprobanteProvider(comprobante: ComprobanteProvider)
```

#### Eliminar Comprobante
```typescript
RemoveComprobanteProvider(comprobanteId: string)
```

#### Filtrar por Estado
```typescript
GetComprobantesByStatus(providerId: string, status: string)
```

#### Filtrar por Rango de Fechas
```typescript
GetComprobantesByDateRange(providerId: string, fechaInicio: string, fechaFin: string)
```

## Uso en Componentes

### 1. Importar dependencias
```typescript
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/store";
import {
  GetAllComprobantesByProvider,
  CreateComprobanteProvider,
  UpdateComprobanteProvider,
  RemoveComprobanteProvider,
} from "@actions/comprobanteProviderActions";
```

### 2. Usar en el componente
```typescript
const dispatch = useDispatch<AppDispatch>();
const { comprobantes, status, isLoading } = useSelector(
  (state: RootState) => state.comprobantesProvider
);

// Cargar comprobantes
useEffect(() => {
  dispatch(GetAllComprobantesByProvider(providerId));
}, [providerId]);

// Crear nuevo comprobante
const handleCreate = (newComprobante: ComprobanteProvider) => {
  dispatch(CreateComprobanteProvider(newComprobante));
};
```

## Endpoints de API Esperados

El middleware espera que la API tenga los siguientes endpoints:

- `POST /api/comprobantes-provider/` - Crear comprobante
- `GET /api/comprobantes-provider/provider/:providerId` - Obtener por proveedor
- `GET /api/comprobantes-provider/:comprobanteId` - Obtener por ID
- `PUT /api/comprobantes-provider/:comprobanteId` - Actualizar
- `DELETE /api/comprobantes-provider/:comprobanteId` - Eliminar
- `GET /api/comprobantes-provider/provider/:providerId/status/:status` - Por estado
- `GET /api/comprobantes-provider/provider/:providerId/date-range` - Por rango de fechas

## Estados del Comprobante

- `pendiente` - Comprobante pendiente de pago
- `pagado` - Comprobante pagado completamente
- `vencido` - Comprobante vencido
- `cancelado` - Comprobante cancelado

## Integración con el Store

El reducer se ha agregado al store principal como `comprobantesProvider`:

```typescript
export const store = configureStore({
  reducer: {
    // ... otros reducers
    comprobantesProvider: ComprobanteProviderReducer,
    // ... otros reducers
  },
});
```

## Componente de Ejemplo

Se incluye `ProviderComprobantesComponent.tsx` como ejemplo de implementación que muestra:

- Listado de comprobantes
- Creación de nuevos comprobantes
- Actualización de estado
- Eliminación de comprobantes
- Manejo de estados de carga y errores

## Notas Importantes

- Todas las acciones manejan estados de carga y error automáticamente
- Los mensajes de éxito y error se muestran mediante el sistema de snackbars
- El middleware es compatible con el patrón Redux Toolkit existente en el proyecto
- Se mantiene consistencia con los otros middlewares del proyecto
