# HabitLife — Frontend (template-front)

Frontend de **HabitLife**, una app para crear hábitos, marcarlos día a día y ver estadísticas semanales.

Incluye:
- ✅ Login/registro (estado con Redux + persistencia en `localStorage`)
- ✅ CRUD de hábitos (crear / editar / eliminar)
- ✅ Marcar hábitos como hecho / no hecho por día
- ✅ Estadísticas con **Highcharts**
- ✅ Idiomas **ES/EN** con **i18next**
- ✅ Tema claro/oscuro con `data-theme` + Tailwind v4

> ℹ️ Este repositorio es el **frontend**. El **backend** expone la API REST y se conecta a una **BD en Docker**.

---

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM
- Redux Toolkit + React Redux
- TailwindCSS v4 (`@tailwindcss/vite`)
- Axios
- Highcharts + highcharts-react-official
- i18next + react-i18next + i18next-browser-languagedetector
- Heroicons

---

## Requisitos

- Node.js (recomendado 18+ / 20+)
- pnpm
- Backend ejecutándose (por defecto en `http://localhost:8080`)
- Base de datos en Docker (levantada por el backend con su `docker-compose` o equivalente)

---

## Instalación (pnpm)

Desde la carpeta `template-front`:

```bash
pnpm install
