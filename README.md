# AppPeliculas - Movie Discovery Mobile App

## English

### Overview
AppPeliculas is a React Native mobile application for discovering movies and TV series. The app integrates with The Movie Database (TMDb) API to provide comprehensive content catalogs with search capabilities, user authentication via Firebase, and personal favorites management.

### Key Features
- **Content Discovery**: Browse popular movies and TV series [1](#0-0) 
- **Real-time Search**: Search movies and series with autocomplete dropdown [2](#0-1) 
- **Genre Filtering**: Filter content by categories like Action, Drama, Mystery
- **User Authentication**: Firebase-based login and registration
- **Favorites Management**: Save and manage favorite movies/series [3](#0-2) 
- **User Reviews**: Create and view movie/series reviews
- **User Profile**: Manage account settings and view personal content [4](#0-3) 

### Technology Stack
- **Framework**: React Native 0.76.3 with Expo 52.0.11 [5](#0-4) 
- **Backend**: Firebase (Authentication & Firestore)
- **API**: The Movie Database (TMDb) API
- **Navigation**: React Navigation with stack and drawer patterns
- **State Management**: React Context API with AsyncStorage

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/JoseBurgoss/Apicacion_Movil_Peliculas.git
cd Apicacion_Movil_Peliculas
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API Keys**
   - Get a TMDb API key from [themoviedb.org](https://www.themoviedb.org/settings/api)
   - Set up Firebase project and get configuration
   - Update API keys in the respective screen files

4. **Start the development server**
```bash
npx expo start
```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

### Project Structure
```
├── screens/
│   ├── MovieListScreen.js      # Movie discovery and search
│   ├── SeriesListScreen.js     # TV series discovery and search
│   ├── ProfileScreen.js        # User profile management
│   └── FavoritesScreen.js      # Favorites management
├── context/                    # React Context providers
├── shared/                     # Shared components
├── app.json                    # Expo configuration
└── package.json               # Dependencies
```

---

## Español

### Descripción General
AppPeliculas es una aplicación móvil React Native para descubrir películas y series de TV. La aplicación se integra con la API de The Movie Database (TMDb) para proporcionar catálogos completos de contenido con capacidades de búsqueda, autenticación de usuarios vía Firebase y gestión de favoritos personales.

### Características Principales
- **Descubrimiento de Contenido**: Navegar películas y series populares
- **Búsqueda en Tiempo Real**: Buscar películas y series con dropdown de autocompletado
- **Filtrado por Género**: Filtrar contenido por categorías como Acción, Drama, Misterio
- **Autenticación de Usuario**: Inicio de sesión y registro basado en Firebase
- **Gestión de Favoritos**: Guardar y gestionar películas/series favoritas
- **Reseñas de Usuario**: Crear y ver reseñas de películas/series
- **Perfil de Usuario**: Gestionar configuración de cuenta y ver contenido personal

### Stack Tecnológico
- **Framework**: React Native 0.76.3 con Expo 52.0.11
- **Backend**: Firebase (Autenticación y Firestore)
- **API**: The Movie Database (TMDb) API
- **Navegación**: React Navigation con patrones stack y drawer
- **Gestión de Estado**: React Context API con AsyncStorage

### Prerrequisitos
- Node.js >= 18.0.0
- npm o yarn
- Expo CLI
- iOS Simulator (para desarrollo iOS) o Android Studio (para desarrollo Android)

### Instalación y Configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/JoseBurgoss/Apicacion_Movil_Peliculas.git
cd Apicacion_Movil_Peliculas
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar claves API**
   - Obtener una clave API de TMDb desde [themoviedb.org](https://www.themoviedb.org/settings/api)
   - Configurar proyecto Firebase y obtener configuración
   - Actualizar claves API en los archivos de pantalla respectivos

4. **Iniciar el servidor de desarrollo**
```bash
npx expo start
```

5. **Ejecutar en dispositivo/simulador**
   - Presionar `i` para simulador iOS
   - Presionar `a` para emulador Android
   - Escanear código QR con la app Expo Go en dispositivo físico

### Estructura del Proyecto
```
├── screens/
│   ├── MovieListScreen.js      # Descubrimiento y búsqueda de películas
│   ├── SeriesListScreen.js     # Descubrimiento y búsqueda de series
│   ├── ProfileScreen.js        # Gestión de perfil de usuario
│   └── FavoritesScreen.js      # Gestión de favoritos
├── context/                    # Proveedores React Context
├── shared/                     # Componentes compartidos
├── app.json                    # Configuración Expo
└── package.json               # Dependencias
```

![login-img](https://github.com/user-attachments/assets/090d7718-8359-4f0d-9911-23e08b381f2f)
![IMG_5730](https://github.com/user-attachments/assets/91f5d336-6d6b-4164-a622-a4db25396b43)
![IMG_5731](https://github.com/user-attachments/assets/c4dcab7c-bcb3-4897-928c-6131c1fa18a6)
![IMG_5735](https://github.com/user-attachments/assets/bc98e397-672d-4376-88c8-340f79fd2f7d)
![Uploading IMG_5737.PNG…]()
