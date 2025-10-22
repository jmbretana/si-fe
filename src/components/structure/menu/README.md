# Sistema de Control de Acceso por Roles - Menú

## Descripción

Este sistema permite controlar la visibilidad de los items del menú basándose en el rol del usuario autenticado. Actualmente está configurado para ocultar la sección "Dashboard" a usuarios que no tengan roles de administrador.

## Configuración Actual

### Roles Permitidos para Dashboard

Los siguientes roles pueden ver la sección Dashboard:

- `admin`
- `superadmin`

## Cómo Funciona

### 1. Definición de Roles

En `ItemsMenu.tsx` se define el array de roles permitidos:

```typescript
const DASHBOARD_ALLOWED_ROLES = ["admin", "superadmin"];
```

### 2. Marcado de Items Restringidos

Los items que requieren verificación de rol deben incluir la propiedad `requiresRole: true`:

```typescript
{
  key: 0,
  text: "Dashboard",
  icon: <DashboardOutlinedIcon />,
  link: "/dashboard",
  name: "dashboard",
  requiresRole: true, // ← Indica que requiere verificación
}
```

### 3. Filtrado Automático

Las funciones `getMenuListItems()` y `getMenuListItemsMobile()` filtran automáticamente los items basándose en el rol del usuario:

```typescript
// En MenuDesktop.tsx
const { user } = useAuth();
const menuListItems = getMenuListItems(user?.role);

// En MenuMobile.tsx
const { user } = useAuth();
const menuListItemsMobile = getMenuListItemsMobile(user?.role);
```

## Agregar Control de Rol a Otros Items

### Paso 1: Definir los Roles Permitidos

```typescript
// En ItemsMenu.tsx
const PRODUCTS_ALLOWED_ROLES = ["admin", "manager"];
```

### Paso 2: Crear Función de Verificación

```typescript
const canViewProducts = (userRole?: string): boolean => {
  if (!userRole) return false;
  return PRODUCTS_ALLOWED_ROLES.includes(userRole.toLowerCase());
};
```

### Paso 3: Marcar el Item

```typescript
{
  key: 2,
  text: "Productos",
  icon: <Inventory2OutlinedIcon />,
  link: "/productos",
  name: "producto",
  requiresRole: true,
  roleChecker: "products", // Identificador del tipo de verificación
}
```

### Paso 4: Actualizar el Filtro

```typescript
const filteredItems = allItems.filter((item) => {
  if (item.requiresRole) {
    if (item.roleChecker === "dashboard") {
      return canViewDashboard(userRole);
    }
    if (item.roleChecker === "products") {
      return canViewProducts(userRole);
    }
  }
  return true;
});
```

## Ejemplos de Uso

### Usuario Admin

Usuario con rol `"admin"`:

- ✅ Ve Dashboard
- ✅ Ve todos los demás items

### Usuario Regular

Usuario con rol `"user"`:

- ❌ No ve Dashboard
- ✅ Ve todos los demás items

### Sin Rol Definido

Usuario sin rol:

- ❌ No ve Dashboard
- ✅ Ve todos los demás items

## Ventajas

1. **Centralizado**: Toda la lógica de control de acceso está en un solo lugar
2. **Reutilizable**: Se aplica automáticamente a desktop y mobile
3. **Mantenible**: Fácil agregar o modificar permisos
4. **Seguro**: El filtrado ocurre antes de renderizar el menú
5. **Flexible**: Puedes agregar diferentes niveles de acceso fácilmente

## Notas Importantes

⚠️ **Seguridad del Frontend**: Este sistema solo oculta visualmente los items del menú. Debes **siempre** validar los permisos en el backend para evitar accesos no autorizados a través de URLs directas.

⚠️ **Sensibilidad a Mayúsculas**: Los roles se comparan en minúsculas (`toLowerCase()`), por lo que "Admin", "ADMIN" y "admin" son equivalentes.

## Testing

Para probar el sistema:

1. Hacer login con diferentes roles
2. Verificar que el Dashboard aparece/desaparece según el rol
3. Revisar la consola del navegador para ver logs del rol del usuario:

````text
   Usuario logueado con rol: admin
   ✅ Rol del usuario detectado: admin

   ```

## Mantenimiento

Para cambiar los roles permitidos para Dashboard:

```typescript
// Antes
const DASHBOARD_ALLOWED_ROLES = ["admin", "superadmin"];

// Después (ejemplo: agregar "manager")
const DASHBOARD_ALLOWED_ROLES = ["admin", "superadmin", "manager"];
````

Los cambios se aplicarán automáticamente sin necesidad de modificar otros archivos.
