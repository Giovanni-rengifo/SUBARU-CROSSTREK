# Contexto del Proyecto — Subaru Crosstrek PWA

## Qué es esto
PWA de control de mantenimiento para un Subaru Crosstrek Híbrida 2026 en Bogotá, Colombia. Una sola página (`index.html`) con todo el CSS y JS inline, sin dependencias externas. Desplegada en GitHub Pages.

## Datos del vehículo
- Modelo: Subaru Crosstrek Híbrida 2026
- Fecha de adquisición: 2026-06-13
- KM inicial: 20 km
- Condición de uso: Severa (Bogotá, 2.600 m altitud)

## Archivos clave
- `index.html` — toda la app (HTML + CSS + JS)
- `manifest.json` — configuración PWA
- `sw.js` — Service Worker; la constante `CACHE` debe incrementarse con cada deploy
- `subaru-logo.png` — ícono oficial Subaru usado en manifest y apple-touch-icon

## Reglas críticas

### localStorage
- Clave: `subaru_crosstrek_v1`
- **Nunca cambiar esta clave** — si se cambia, el usuario pierde todos sus datos
- Los datos son independientes del código: actualizar archivos nunca afecta los datos guardados

### Service Worker
- Versión actual del caché: `crosstrek-v7`
- **Incrementar la versión** (`v8`, `v9`...) en `sw.js` cada vez que se modifique `index.html`, `manifest.json` o `subaru-logo.png`
- Si no se incrementa, los usuarios ven la versión vieja desde el caché
- El HTML de navegación nunca se intercepta (pasa directo a la red) — garantiza versión fresca online

### Commits y push
- Claude hace commit y push directamente via Bash tool (`git add`, `git commit -m`, `git push origin main`)
- Usar siempre `-m "tipo: descripción"` simple — nunca heredoc (falla en Windows/bash)
- Repo en: `C:\Users\PC\Documents\Claude\Artifacts\SUBARU CROSSTREK`

## Moneda y localización
```javascript
function cop(n) {
  return '$ ' + Number(n).toLocaleString('es-CO');
}
```

## Agregar un servicio de mantenimiento
Buscar `const SCHED = [` en `index.html` y agregar:
```javascript
{
  id: 'id_unico',       // nunca cambiar después de creado
  name: 'Nombre',
  freq: '12 Meses',
  months: 12,
  km: 19300,            // null si no aplica por KM
  critical: false,
  note: 'Texto informativo.'
}
```

## Umbrales de alerta (función `status()` en index.html)
- `daysLeft <= 30` → PRÓXIMO
- `kmLeft <= 500` → PRÓXIMO
- Cualquier valor negativo → VENCIDO

## Servidor local de desarrollo
```bash
npx serve -p 3456 .
# http://localhost:3456
```

## Despliegue
GitHub Pages desde rama `main`. El usuario hace push y GitHub Pages despliega en ~1 minuto.

## Convención de commits
```
feat:   nueva funcionalidad
fix:    corrección de bug
ui:     cambio visual
data:   cambio en ítems de mantenimiento
docs:   documentación
chore:  actualización técnica (sw, manifest)
```
