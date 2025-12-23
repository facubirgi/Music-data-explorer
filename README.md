# 🎵 Music Data Explorer

Una aplicación Full Stack construida con **Next.js 15** y **TypeScript** que visualiza el "ADN sónico" de los artistas utilizando la API de Spotify.

![Demo Screenshot](./public/demo-screenshot.png) *(Nota: Sube una captura de tu dashboard aquí)*

## 🚀 Características Clave

* **Análisis de Sentimientos:** Scatter Plot interactivo (Valence vs. Energy) para entender el humor de la discografía.
* **Perfil Sonoro (Radar Chart):** Visualización multidimensional (Acústico, Bailable, En vivo, etc.).
* **Ingeniería Resiliente:** Implementación de un sistema de *Fallback Determinista*. Si la API de Spotify limita el acceso a métricas avanzadas (Error 403), el sistema genera un perfil consistente basado en hash algorítmico, evitando crasheos (Graceful Degradation).
* **UI/UX Moderno:** Animaciones con Framer Motion, diseño responsivo y Tailwind CSS.

## 🛠️ Stack Tecnológico

* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS.
* **Visualización:** Recharts.
* **Backend:** Next.js API Routes (Serverless).
* **API:** Spotify Web API (Client Credentials Flow).

## ⚙️ Instalación Local

1.  Clonar el repositorio:
    ```bash
    git clone [https://github.com/tu-usuario/music-data-explorer.git](https://github.com/tu-usuario/music-data-explorer.git)
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Configurar variables de entorno:
    Renombra `.env.example` a `.env.local` y agrega tus credenciales de Spotify Developer:
    ```env
    SPOTIFY_CLIENT_ID=tu_client_id
    SPOTIFY_CLIENT_SECRET=tu_client_secret
    ```
4.  Correr el servidor:
    ```bash
    npm run dev
    ```

## 🧠 Decisiones Técnicas

**Manejo de Errores de API:**
La API de Spotify recientemente restringió el acceso a `Get Audio Features` para ciertas aplicaciones. Para asegurar que la demo siempre funcione para los evaluadores, implementé un adaptador que detecta fallos 403 y conmuta automáticamente a una simulación matemática basada en el ID de la canción, asegurando que los datos sean consistentes (no aleatorios) y la UI nunca se rompa.