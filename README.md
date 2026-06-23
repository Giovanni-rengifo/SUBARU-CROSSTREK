# 🚗 Subaru Crosstrek — App de Mantenimiento

PWA (Progressive Web App) para el control de mantenimiento del Subaru Crosstrek Híbrida bajo condiciones de uso severo en Bogotá, Colombia.

---

## ✨ Funcionalidades

- **Resumen** — KM actuales, días con el vehículo, alertas de servicios vencidos o próximos
- **Mantenimiento** — Tabla con 10 servicios, fechas calculadas automáticamente desde la adquisición, barras de progreso por KM
- **Gastos** — Registro de costos, historial completo, exportar/importar JSON
- **Configuración** — Datos del vehículo (fecha adquisición, KM, modelo, placa)
- **Offline** — Funciona sin conexión gracias al Service Worker
- **PWA** — Instalable en Chrome (Android/Desktop) como app nativa

---

## 📁 Estructura del Proyecto

```
SUBARU CROSSTREK/
├── index.html          # App completa (HTML + CSS + JS inline)
├── manifest.json       # Configuración PWA (nombre, íconos, colores)
├── sw.js               # Service Worker (caché offline)
├── subaru-logo.png     # Ícono oficial Subaru (PWA icon)
├── icon.svg            # Ícono SVG de respaldo (puede eliminarse)
├── README.md           # Este archivo
├── CHANGELOG.md        # Historial de cambios
└── DEVELOPMENT.md      # Guía técnica de desarrollo
```

---

## 🚀 Despliegue

**URL en producción:** `https://[usuario].github.io/SUBARU-CROSSTREK/`

El despliegue es automático vía **GitHub Pages** desde la rama `main`.

### Flujo de trabajo para cambios:
1. Editar los archivos localmente
2. Abrir **GitHub Desktop**
3. Escribir mensaje en "Summary" describiendo el cambio
4. Clic en **"Commit to main"**
5. Clic en **"Push origin"**
6. GitHub Pages despliega en ~1 minuto

---

## 💾 Almacenamiento de Datos

Todos los datos se guardan en **`localStorage`** del navegador bajo la clave `subaru_crosstrek_v1`. Los datos **no se pierden** al actualizar el código.

```javascript
// Estructura del objeto guardado
{
  v: 1,
  cfg: {
    acquisitionDate: "2026-06-13",
    initialKm: 20,
    currentKm: 500,
    model: "Crosstrek Híbrida 2026",
    color: "",
    plate: ""
  },
  records: {
    "oil_change": { lastDate: "2026-12-13", lastKm: 9670, shop: "Subaru", notes: "" }
  },
  costs: [
    { id: "abc123", date: "2026-12-13", serviceId: "oil_change", desc: "Aceite de Motor", cost: 350000, mileage: 9670, shop: "Subaru Colombia", notes: "" }
  ]
}
```

### Respaldo de datos
Desde la app → **Configuración → Exportar JSON** → guardar en Google Drive o OneDrive.

---

## 🔧 Datos del Vehículo

| Campo | Valor |
|-------|-------|
| Modelo | Subaru Crosstrek Híbrida 2026 |
| Fecha de adquisición | 13 de junio de 2026 |
| KM inicial | 20 km |
| Condición de uso | Severo (Bogotá, 2.600 m altitud) |

---

## 📋 Servicios de Mantenimiento Configurados

| ID | Nombre | Frecuencia | KM Límite | Crítico |
|----|--------|-----------|-----------|---------|
| `brake_exercise` | Ejercicio de Frenos | 1 mes | — | No |
| `oil_change` | Aceite de Motor y Filtro | 6 meses | 9.650 km | Sí |
| `tire_rotation` | Rotación de Llantas | 6 meses | 9.650 km | No |
| `cabin_filter` | Filtro de Aire de Cabina | 12 meses | 19.300 km | No |
| `engine_filter` | Filtro de Aire del Motor | 12 meses | 19.300 km | No |
| `cvt_fluid` | Fluido Transmisión CVT | 30 meses | 40.000 km | Sí |
| `brake_service` | Limpieza de Frenos | 30 meses | 48.000 km | No |
| `brake_fluid` | Líquido de Frenos | 36 meses | 48.000 km | Sí |
| `spark_plugs` | Bujías de Platino | 54 meses | 100.000 km | No |
| `coolant` | Líquido Refrigerante | 60 meses | 150.000 km | No |
