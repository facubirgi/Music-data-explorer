# 🎵 Explorador de Datos Musicales (Music Data Explorer)

> Una aplicación Full Stack que visualiza el "ADN Sónico" de los artistas utilizando la API de Spotify, Análisis Estadístico y Gamificación Interactiva.


## 🚀 Demo en Vivo
[**Ver Demo en Vivo**](https://tuproyecto.vercel.app) *(Reemplaza con tu link de Vercel)*

## 📖 Sobre el Proyecto

Este proyecto fue construido como un desafío técnico para explorar datos musicales más allá de las listas simples. Transforma datos crudos de la API en **visualizaciones interactivas** para responder preguntas como:
* *"¿La música de este artista es generalmente triste o feliz?"*
* *"¿Cómo ha evolucionado su tempo a través del tiempo?"*
* *"¿Cuáles son las anomalías estadísticas en su discografía?"*

Incluye un **Modo Quiz** para la participación del usuario, **Vistas Previas de Audio** y un robusto **Sistema de Exportación** para compartir hallazgos.

## ✨ Características Clave

### 📊 Visualización Avanzada
* **Radar Sónico:** Un gráfico de 6 ejes que compara bailabilidad, energía, acústica, instrumentalidad, etc.
* **Mapa Emocional (Scatter Plot):** Mapea las canciones en un plano cartesiano de Valencia (Positividad) vs. Energía.
* **Evolución Temporal:** Analiza los cambios de tempo a través de los años de lanzamiento.

### 🧠 Análisis Inteligente (El Toque "Senior")
* **Detección Estadística de Anomalías (Z-Score):** La app calcula la Media y la Desviación Estándar para Tempo y Energía en tiempo real. Marca automáticamente las canciones que se desvían significativamente (> 1.8 SD) del promedio del artista (ej: *"Inusualmente Rápida"* o *"Energía Explosiva"*).
* **Resiliencia (Graceful Degradation):** Incluye un sistema de respaldo robusto. Si la API de Spotify devuelve un error 403 para las características de audio (un problema común), el backend genera un perfil determinista basado en el ID del track, asegurando que la UI **nunca se rompa**.

### 🎮 Gamificación y UX
* **Modo Quiz:** Convierte la exploración de datos en un juego de trivia. Oculta los nombres de las canciones y permite a los usuarios adivinar basándose en sus "Coordenadas Emocionales" y fragmentos de audio.
* **Audio Previews:** Reproductor de audio HTML5 integrado con lógica de Play/Pause.
* **Reportes Exportables:** Utiliza `html2canvas` para generar reportes PNG de alta resolución y listos para compartir.

## 🛠️ Stack Tecnológico

* **Framework:** Next.js 15 (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS + Framer Motion (animaciones)
* **Gráficos:** Recharts
* **Notificaciones:** Sonner
* **API:** Spotify Web API (Client Credentials Flow)
* **Utils:** html2canvas, lucide-react

## ⚙️ Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone [https://github.com/tu-usuario/music-data-explorer.git](https://github.com/tu-usuario/music-data-explorer.git)
   cd music-data-explorer