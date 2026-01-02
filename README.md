# HabitLife 🧠📈  
**Monitorea tus hábitos. Desarrolla la constancia. Mejora tu vida.**

HabitLife es una aplicación para **crear, organizar y realizar seguimiento de hábitos** diarios y semanales, con **estadísticas y gráficas de progreso** para motivarte y mantener la constancia.

---

## 🎯 Objetivos

- Diseñar e implementar una **interfaz intuitiva** para la creación y gestión de hábitos.
- Desarrollar un **backend robusto y escalable** para almacenar y consultar datos de forma eficiente.
- Implementar **autenticación y autorización** de usuarios.
- Mostrar **gráficas de evolución** para motivar al usuario.
- **Sincronizar** datos entre cliente y servidor (pull).

---

## 🧩 Descripción del proyecto

### Descripción general
HabitLife permite a los usuarios crear hábitos, registrar su cumplimiento y visualizar su progreso con estadísticas.  
El sistema se apoya en una **API REST** segura y una **base de datos relacional** diseñada para el proyecto.

### Funcionalidades principales
- ✅ Registro e inicio de sesión de usuarios  
- ✅ Creación, modificación y eliminación de hábitos  
- ✅ Registro diario/semanal de cumplimiento  
- ✅ Visualización de estadísticas y gráficas de progreso  
- ✅ Persistencia en servidor y sincronización (pull)

---

## 🏗️ Arquitectura y stack

### Frontend
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Redux Toolkit**
- **i18next** (ES/EN)
- **Highcharts** para estadísticas y gráficas

### Backend
- **Spring Boot**
- **Arquitectura Hexagonal (Ports & Adapters)**
- **API REST**
- **Flyway** para control de versiones de base de datos

### Base de datos
- **PostgreSQL en Docker**

---
