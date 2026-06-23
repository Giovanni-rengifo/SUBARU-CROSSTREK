# Guía de Desarrollo

Referencia técnica para modificar y mantener la app a lo largo del tiempo.

---

## ⚙️ Desarrollo Local

```bash
# Iniciar servidor local (requiere Node.js)
npx serve -p 3456 .

# Abrir en navegador
# http://localhost:3456
```

> Los datos en localhost son independientes de GitHub Pages. No uses localhost para datos reales.

---

## 📦 Actualizar el Service Worker (obligatorio en cada cambio)

Cada vez que modificas `index.html`, `manifest.json` o cualquier archivo cacheado, **debes incrementar la versión del caché** en `sw.js` para que los usuarios reciban la versión nueva:

```javascript
// sw.js — cambiar 'crosstrek-v2' → 'crosstrek-v3', etc.
const CACHE = 'crosstrek-v3';  // ← incrementar con cada deploy
```

Si no lo haces, los usuarios seguirán viendo la versión vieja desde el caché.

---

## ➕ Agregar un Nuevo Servicio de Mantenimiento

Editar el array `SCHED` en `index.html` (buscar `const SCHED = [`):

```javascript
{
  id: 'nombre_unico',          // snake_case, sin espacios
  name: 'Nombre Visible',      // Texto que ve el usuario
  freq: '12 Meses',            // Texto descriptivo de frecuencia
  months: 12,                  // Número de meses entre servicios
  km: 19300,                   // KM entre servicios (null si no aplica)
  critical: false,             // true = muestra badge rojo "CRÍTICO"
  note: 'Nota informativa.'    // Texto de ayuda visible en la tabla
},
```

**Campos importantes:**
- `id` debe ser único y no cambiar después (es la clave en localStorage)
- `months` se usa para calcular la próxima fecha automáticamente
- `km: null` si el servicio solo tiene frecuencia por tiempo (ej: ejercicio de frenos)

---

## 🗑️ Eliminar un Servicio de Mantenimiento

1. Eliminar el objeto del array `SCHED` en `index.html`
2. Los datos históricos de ese servicio quedan en localStorage pero no se muestran
3. Si quieres limpiar también el localStorage: en la app, **Configuración → Exportar JSON**, editar el JSON manualmente y re-importar

---

## 🎨 Cambiar Colores (Tema)

Las variables CSS están al inicio del `<style>` en `index.html`:

```css
:root {
  --primary: #003366;       /* Azul Subaru oscuro */
  --primary-light: #1a5fa8; /* Azul Subaru claro */
  --accent: #e8b84b;        /* Dorado (detalles, nav activo) */
  --success: #1e8a44;       /* Verde (AL DÍA) */
  --warning: #b87600;       /* Amarillo (PRÓXIMO) */
  --danger: #c0392b;        /* Rojo (VENCIDO) */
  --bg: #eef2f7;            /* Fondo general */
  --card: #ffffff;          /* Fondo de tarjetas */
}
```

---

## 💰 Cambiar Moneda

La función de formato de moneda está en `index.html`:

```javascript
function cop(n) {
  return '$ ' + Number(n).toLocaleString('es-CO');
}
```

Para cambiar a otra moneda, modificar el locale (`'es-CO'`) o agregar el símbolo:

```javascript
// Ejemplo: Dólares americanos
function cop(n) {
  return 'USD ' + Number(n).toLocaleString('en-US');
}
```

---

## 🔔 Umbrales de Alerta

Definidos en la función `status()` en `index.html`:

```javascript
let s = 'ok';
if (daysLeft < 0 || (kmLeft !== null && kmLeft < 0))         s = 'overdue';  // VENCIDO
else if (daysLeft <= 30 || (kmLeft !== null && kmLeft <= 500)) s = 'warning'; // PRÓXIMO
```

Para cambiar los umbrales:
- `daysLeft <= 30` → días antes de vencimiento para mostrar PRÓXIMO
- `kmLeft <= 500` → KM antes del límite para mostrar PRÓXIMO

---

## 🔑 Clave de localStorage

```javascript
const KEY = 'subaru_crosstrek_v1';
```

> ⚠️ No cambiar esta clave. Si se cambia, todos los usuarios pierden sus datos guardados. Solo cambiar si se hace una migración de datos controlada.

---

## 🌐 GitHub Pages

- **Rama:** `main`
- **Carpeta:** `/` (raíz)
- **URL:** `https://[usuario].github.io/SUBARU-CROSSTREK/`
- **Deploy:** Automático en cada push a `main` (~1 minuto)

### Checklist antes de cada push:
- [ ] Incrementar versión del caché en `sw.js`
- [ ] Probar localmente con `npx serve -p 3456 .`
- [ ] Commit con mensaje descriptivo en CHANGELOG.md
- [ ] Push desde GitHub Desktop

---

## 📱 Instalar como PWA en Android

1. Abrir Chrome en el celular
2. Navegar a `https://[usuario].github.io/SUBARU-CROSSTREK/`
3. Menú ⋮ → **"Añadir a pantalla de inicio"** o **"Instalar app"**
4. Confirmar — el ícono Subaru aparecerá en el home screen

Para **actualizar** la PWA instalada después de un deploy:
- Abrir la app → esperar que el Service Worker detecte la nueva versión (~segundos)
- O cerrar y reabrir la app

---

## 🗄️ Migración de Datos entre Dispositivos

1. En el dispositivo origen → **Configuración → Exportar JSON** → guardar el archivo
2. Compartir el archivo JSON (WhatsApp, email, Drive, etc.)
3. En el dispositivo destino → abrir la app → **Configuración → Importar JSON**
4. Confirmar la importación

---

## 📋 Convención de Commits

```
tipo: descripción corta en español

Tipos:
  feat:     nueva funcionalidad
  fix:      corrección de bug
  ui:       cambio visual/estético
  data:     cambio en datos de mantenimiento
  docs:     cambio en documentación
  chore:    actualización técnica (sw, manifest, etc.)

Ejemplos:
  feat: agregar recordatorio de lavado mensual
  fix: corregir cálculo de días para año bisiesto
  ui: cambiar colores del tema a modo oscuro
  data: agregar servicio de revisión de batería híbrida
  chore: actualizar caché a crosstrek-v3
```
