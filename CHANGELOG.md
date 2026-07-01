# Historial de Cambios

Todos los cambios importantes de la app se documentan aquí.
Formato: `[versión] — AAAA-MM-DD`

---

## [1.4.0] — 2026-06-23

### Cambiado
- Rediseño visual completo: dark mode con fondo `#09111e` y cards `#111c2e`
- Tipografía: Rajdhani 700 para números/headings + DM Sans para cuerpo (Google Fonts)
- Navegación: iconos SVG en lugar de emoji
- Header: logo Pléyades SVG + subtítulo del modelo
- Barras de progreso con gradiente verde→rojo según estado
- Modales con efecto glass-morphism (`backdrop-filter: blur`)
- Badges de estado integrados en cada tarjeta con color de borde lateral
- Service Worker actualizado a `crosstrek-v7`

---

## [1.3.0] — 2026-06-22

### Nuevo
- Botón "Forzar actualización" en Config: desregistra el SW y limpia todos los cachés para resolver versiones bloqueadas
- Sección Config reorganizada en "Vehículo" y "Kilometraje y Fecha" con botones al pie

### Corregido
- Config tab: eliminado `position:sticky` que rompía el layout en móvil
- Service Worker: HTML pasa directamente a la red (sin interceptar) para garantizar versión fresca siempre
- Service Worker actualizado a `crosstrek-v6` (v4→v5→v6 progresivos)

---

## [1.2.0] — 2026-06-22

### Nuevo
- Botón ℹ️ en cada tarjeta de servicio para desplegar/colapsar la descripción del ítem

### Cambiado
- Tab Servicio: rediseño mobile-first con tarjetas verticales (reemplaza tabla horizontal)
- Tarjetas ordenadas por urgencia: VENCIDO → PRÓXIMO → AL DÍA
- Cada tarjeta muestra: nombre, frecuencia, fecha próxima, días/KM restantes, barra de progreso
- Service Worker actualizado a `crosstrek-v3`

---

## [1.1.0] — 2026-06-22

### Cambiado
- Ícono de la PWA actualizado al logo oficial de Subaru (`subaru-logo.png`)
- `manifest.json` apunta ahora a `subaru-logo.png` en lugar de `icon.svg`
- Service Worker actualizado a `crosstrek-v2` para forzar recarga del nuevo ícono
- `index.html` actualizado: `apple-touch-icon` apunta a `subaru-logo.png`

---

## [1.0.0] — 2026-06-22

### Nuevo
- App PWA completa con 4 secciones: Resumen, Mantenimiento, Gastos, Configuración
- 10 ítems de mantenimiento con frecuencia por tiempo y por KM
- Cálculo automático de próximas fechas desde la fecha de adquisición
- Barras de progreso KM por servicio
- Estados: AL DÍA / PRÓXIMO (≤30 días o ≤500 km) / VENCIDO
- Modal para registrar servicio (actualiza fecha, KM y costo en un solo paso)
- Historial de gastos con exportar/importar JSON
- Estimado de gasto anual basado en costos registrados
- KM pill en header para actualizar kilometraje rápidamente
- Service Worker para funcionamiento offline (`crosstrek-v1`)
- Ícono SVG personalizado con colores Subaru
- Desplegado en GitHub Pages (repositorio SUBARU-CROSSTREK)
