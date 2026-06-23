# Historial de Cambios

Todos los cambios importantes de la app se documentan aquí.
Formato: `[versión] — AAAA-MM-DD`

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
