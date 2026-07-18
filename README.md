# 🏃‍♂️ Sistema de Monitoreo Deportivo Wearable

**Universidad Tecnológica del Valle de Toluca**  
Materia: Desarrollo para Dispositivos Inteligentes  
Docente: Mtro. Roberto Vinicio Camacho Mendoza  
Fecha: 08 de julio de 2026

---

## 📋 Descripción del Proyecto

Solución tecnológica integral para el monitoreo de actividad física en tiempo real, compuesta por una aplicación wearable (Android) y una plataforma web centralizada para la visualización de datos deportivos.

### 🎯 Características Principales

- **Detección de pasos** en tiempo real usando el acelerómetro del dispositivo
- **Cálculo automático** de calorías quemadas y distancia recorrida
- **Dashboard web** con visualización de estadísticas
- **Actualización automática** cada 2 segundos
- **Funcionamiento offline** sin necesidad de conexión constante
- **Interfaz tipo smartwatch** optimizada para dispositivos móviles

---

## 🛠️ Tecnologías Utilizadas

### Aplicación Wearable
- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma de desarrollo
- **Expo Sensors** - API de sensores (acelerómetro)
- **Firebase** - Base de datos en tiempo real (opcional)

### Aplicación Web
- **React Native Web** - Framework para web
- **Expo** - Plataforma de desarrollo
- **Fetch API** - Comunicación HTTP

### Servidor (Opcional)
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **CORS** - Manejo de cross-origin requests

---

## 📱 Estructura del Proyecto

```
monitoreo-deportivo-wearable/
├── wearable/                 # Aplicación Android
│   ├── App.js                # Punto de entrada
│   ├── src/
│   │   ├── screens/
│   │   │   ├── wearable/     # Pantallas para modo wearable
│   │   │   │   └── DashboardScreen.js
│   │   │   └── web/          # Pantallas para modo web
│   │   │       └── WebDashboardScreen.js
│   │   ├── services/         # Servicios de la aplicación
│   │   │   ├── sensorService.js    # Lógica de sensores
│   │   │   └── syncService.js      # Sincronización
│   │   ├── config/           # Configuraciones
│   │   │   └── firebase.js
│   │   └── navigation/       # Navegación
│   │       ├── WearableNavigator.js
│   │       └── WebNavigator.js
│   ├── android/              # Configuración nativa Android
│   ├── package.json
│   └── app.json
├── server/                   # Servidor API (opcional)
│   └── server.js
├── docs/                     # Documentación
│   ├── MANUAL_TECNICO.md
│   ├── MANUAL_USUARIO.md
│   └── DICCIONARIO_DE_DATOS.md
├── DOCUMENTACION_PROYECTO.md # Documentación completa
├── INSTRUCCIONES_SINCRONIZACION.md
├── package.json
└── README.md
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Android Studio (para compilar la app Android)
- Dispositivo Android (7.0 o superior)

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/[tu-usuario]/monitoreo-deportivo-wearable.git
cd monitoreo-deportivo-wearable
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar Firebase (opcional):**
   - Crear proyecto en Firebase Console
   - Descargar archivo de configuración
   - Actualizar `src/config/firebase.js`

4. **Ejecutar la aplicación:**
```bash
# Modo desarrollo web
npx expo start --web

# Modo desarrollo Android
npx expo run:android
```

5. **Iniciar servidor (opcional):**
```bash
node server.js
```

---

## 📖 Uso de la Aplicación

### Aplicación Wearable (Android)

1. **Instalar la app** en tu dispositivo Android
2. **Conceder permisos** de actividad física cuando se solicite
3. **Presionar "Iniciar"** para comenzar el conteo de pasos
4. **Caminar** - la app detectará automáticamente los pasos
5. **Presionar "Detener"** al finalizar la actividad

**Métricas mostradas:**
- Pasos totales
- Calorías quemadas (calculadas automáticamente)
- Distancia recorrida en kilómetros

### Aplicación Web

1. **Abrir** `http://localhost:8081` en tu navegador
2. **Seleccionar modo "Web"** en el selector superior
3. **Visualizar** las estadísticas en el dashboard
4. **Actualizar** manualmente con el botón de refresh o pull-to-refresh

**Características del dashboard:**
- Actualización automática cada 2 segundos
- Tarjetas de estadísticas interactivas
- Scroll vertical para ver todo el contenido
- Indicador de última actualización

---

## 🔧 Configuración Avanzada

### Permisos Android

La aplicación requiere los siguientes permisos en `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="android.permission.INTERNET" />
```

### Variables de Entorno

Para configurar Firebase, actualizar `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 🧪 Pruebas

### Pruebas Unitarias
```bash
npm test
```

### Pruebas de Integración
1. Verificar detección de pasos en dispositivo Android
2. Comprobar cálculos de calorías y distancia
3. Validar actualización del dashboard web
4. Probar modo offline

---

## 📊 Base de Datos

### Esquema SQL

Ver `DOCUMENTACION_PROYECTO.md` para el esquema completo de base de datos.

### Datos de Ejemplo

```sql
-- Usuario de prueba
INSERT INTO usuarios VALUES ('user_001', 'Juan Pérez', 'juan@example.com', NOW(), 'SM_X110');

-- Registro de actividad
INSERT INTO registros_actividad (id_usuario, fecha, hora_inicio, pasos_totales, calorias_quemadas, distancia_metros) 
VALUES ('user_001', CURDATE(), CURTIME(), 28, 1.12, 21.34);
```

---

## 🎥 Video Demostrativo

**Duración:** 5 minutos máximo  
**Formato:** 1080p, audio claro  
**Plataforma:** YouTube

### Contenido del Video

1. **Introducción** (0:00 - 0:30)
   - Presentación del proyecto
   - Objetivos principales

2. **App Wearable** (0:30 - 2:30)
   - Pantalla principal
   - Inicio de sesión
   - Detección de pasos en tiempo real
   - Cálculo de métricas

3. **App Web** (2:30 - 4:30)
   - Dashboard web
   - Visualización de datos
   - Actualización automática
   - Controles interactivos

4. **Conclusiones** (4:30 - 5:00)
   - Resumen de funcionalidades
   - Tecnologías utilizadas
   - Agradecimientos

---

## 👥 Integrantes del Equipo

- [Nombre del integrante 1]
- [Nombre del integrante 2]
- [Nombre del integrante 3]
- [Nombre del integrante 4]

---

## 📝 Licencia

Este proyecto fue desarrollado para fines académicos en la Universidad Tecnológica del Valle de Toluca.

---

## 📞 Contacto

Para más información sobre el proyecto, contactar a los integrantes del equipo.

---

## 🙏 Agradecimientos

- **Mtro. Roberto Vinicio Camacho Mendoza** - Docente de la materia
- **Universidad Tecnológica del Valle de Toluca** - Institución educativa
- **Comunidad de React Native y Expo** - Herramientas de desarrollo

---

**Última actualización:** 08 de julio de 2026  
**Versión:** 1.0.0# examen2
