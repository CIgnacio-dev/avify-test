# ⚡ UK Energy Mix - Prueba Técnica Avify

Esta aplicación consume la API pública de [Carbon Intensity UK](https://api.carbonintensity.org.uk/generation) para visualizar en tiempo real la mezcla de fuentes de generación eléctrica en el Reino Unido. Es parte de una prueba técnica para Avify.

---

## 🧱 Stack Tecnológico

- **React** (con configuración custom de Webpack y Babel)
- **TypeScript**
- **Recharts** para gráficos
- **Jest + React Testing Library** para testing
- **API pública**: https://api.carbonintensity.org.uk/generation

---

## 🔍 Funcionalidades

- Visualización en tarjetas y gráfico circular de fuentes como solar, nuclear, wind, etc.
- Estilos personalizados y color por tipo de energía
- Orden descendente por porcentaje de contribución
- Test unitarios que verifican renderizado y lógica de ordenamiento

---

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/CIgnacio-dev/avify-test
