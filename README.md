# ⚡ Inversa Tech - Plataforma Web & Catálogo Híbrido

Plataforma de comercio electrónico y catálogo híbrido de alta tecnología para:
1. **Dispositivos Electrónicos & Gadgets**: Hardware con control de stock, fotos múltiples, ficha técnica (specs) y estado de disponibilidad.
2. **Soluciones Web & Software**: Paquetes de desarrollo web predefinidos, cotizador interactivo en tiempo real y enlaces a demos en vivo.

Incluye checkout directo por WhatsApp con guardado automático de pedidos en Cloud Firestore y Panel de Administración (`/admin`) protegido con Firebase Auth.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+, TypeScript, Vite.
- **Estilos**: Tailwind CSS con paleta Tech Premium (Oscuro Slate/Zinc `#0B0F19`, `#151D2F`, Cyan `#06B6D4`, Azul `#3B82F6`, Verde WhatsApp `#22C55E`, Rojo Carmesí `#EF4444`).
- **Iconografía**: `lucide-react`.
- **Backend & Cloud (Firebase v10+ Modular)**:
  - **Cloud Firestore**: Colecciones `productos`, `categorias` y `pedidos`.
  - **Firebase Authentication**: Inicio y cierre de sesión de administradores.
  - **Firebase Storage**: Almacenamiento y vinculación de fotos físicas de productos (`/productos/...`).
- **Enrutamiento & Despliegue**: `react-router-dom` con `vercel.json` configurado para SPA sin errores 404.

---

## 🚀 Inicio Rápido en Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173/`.

---

## 🔐 Acceso al Panel de Administración (`/admin`)

- **Ruta:** `/admin` o mediante el icono de **Acceso** en la barra superior.
- **Credenciales en Modo Demostración:**
  - **Correo:** `admin@inversa.com`
  - **Contraseña:** `admin1234`
  *(O haz clic en el botón **Autocompletar** en la pantalla de login).*

---

## ☁️ Conexión con tu Proyecto de Firebase

Para vincular tu propia consola de Firebase:
1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un nuevo proyecto.
2. Habilita:
   - **Authentication**: Proveedor *Correo electrónico/contraseña*.
   - **Firestore Database**: Crea la base de datos en modo producción o prueba.
   - **Storage**: Habilita el bucket de almacenamiento.
3. Copia tus credenciales en el archivo `.env`:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   VITE_WHATSAPP_PHONE_NUMBER=5215555555555
   ```

---

## 🌐 Despliegue en Vercel

1. Sube tu repositorio a GitHub o GitLab.
2. Importa el proyecto en [Vercel](https://vercel.com).
3. En la sección **Environment Variables**, añade todas las variables definidas en tu archivo `.env`.
4. El archivo [`vercel.json`](file:///c:/PaginaInversa/vercel.json) incluido se encargará automáticamente de que las rutas `/admin`, `/login` y el catálogo funcionen sin errores 404 al recargar la página.
