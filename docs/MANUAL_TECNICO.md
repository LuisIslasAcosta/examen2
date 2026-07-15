# Manual Técnico
## Sistema de Monitoreo Deportivo

---

## 📋 Información General

**Proyecto**: Sistema de Monitoreo Deportivo  
**Versión**: 1.0.0  
**Fecha**: 08 de julio de 2026  
**Materia**: Desarrollo para Dispositivos Inteligentes  
**Docente**: ITIC Roberto Vinicio Camacho Mendoza  
**Institución**: Universidad Tecnológica del Valle de Toluca

---

## 🏗️ Arquitectura del Sistema

### 1.1. Arquitectura General

El sistema sigue una arquitectura **cliente-servidor** con las siguientes capas:

```
┌─────────────────────────────────────────────────────────┐
│                    Capa de Presentación                  │
│  ┌──────────────────────┐    ┌──────────────────────┐  │
│  │   App Wearable       │    │   App Web            │  │
│  │   (React Native)     │    │   (React Native)     │  │
│  └──────────────────────┘    └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Capa de Servicios                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ SensorService│  │Notification  │  │   Firebase   │  │
│  │              │  │  Service     │  │   Client     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Capa de Datos                         │
│              Firebase Realtime Database                  │
│     ┌──────────────┐      ┌──────────────┐              │
│     │    steps     │      │ notifications│              │
│     └──────────────┘      └──────────────┘              │
└─────────────────────────────────────────────────────────┘
```

### 1.2. Patrones de Diseño Utilizados

#### Singleton Pattern
```javascript
// Implementado en servicios para asegurar una única instancia
class SensorService {
  constructor() {
    if (SensorService.instance) {
      return SensorService.instance;
    }
    SensorService.instance = this;
  }
}
```

#### Observer Pattern
```javascript
// Implementado en Firebase listeners
onValue(stepsRef, (snapshot) => {
  // Actualizar UI cuando cambien los datos
});
```

#### Service Layer Pattern
```javascript
// Separación de lógica de negocio en servicios
- sensorService.js
- notificationService.js
```

---

## 🛠️ Stack Tecnológico

### 2.1. Tecnologías Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React Native | 0.74.0 | Framework móvil |
| Expo | ~51.0.0 | Plataforma de desarrollo |
| React Navigation | 6.1.0 | Navegación entre pantallas |
| React Native SVG | 15.0.0 | Gráficos vectoriales |
| Expo Sensors | ~13.0.0 | Acceso a sensores |
| Expo Notifications | ~0.28.0 | Sistema de notificaciones |
| Expo Location | ~17.0.0 | Servicios de geolocalización |

### 2.2. Tecnologías Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Firebase | 10.7.0 | Backend como servicio |
| Firebase Realtime Database | - | Base de datos en tiempo real |
| Firebase Authentication | - | Autenticación de usuarios |
| Firebase Cloud Messaging | - | Notificaciones push |

### 2.3. Herramientas de Desarrollo

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| Node.js | 18+ | Runtime de JavaScript |
| npm | 9+ | Gestor de paquetes |
| Expo CLI | Latest | CLI para Expo |
| Git | Latest | Control de versiones |

---

## 📁 Estructura del Proyecto

### 3.1. Organización de Archivos

```
sistema-monitoreo-deportivo/
│
├── App.js                          # Punto de entrada
├── package.json                    # Dependencias
├── app.json                        # Configuración Expo
├── .gitignore                      # Archivos ignorados
│
├── src/
│   ├── config/
│   │   └── firebase.js            # Configuración Firebase
│   │
│   ├── services/
│   │   ├── sensorService.js       # Lógica de sensores
│   │   └── notificationService.js # Lógica de notificaciones
│   │
│   ├── components/
│   │   ├── WatchFace.js           # Componente circular
│   │   └── web/
│   │       └── DashboardCard.js   # Tarjetas dashboard
│   │
│   ├── screens/
│   │   ├── wearable/              # 4 pantallas
│   │   │   ├── DashboardScreen.js
│   │   │   ├── SensorsScreen.js
│   │   │   ├── NotificationsScreen.js
│   │   │   └── SettingsScreen.js
│   │   │
│   │   └── web/                   # 6 pantallas
│   │       ├── WebDashboardScreen.js
│   │       ├── DevicesScreen.js
│   │       ├── DataVisualizationScreen.js
│   │       ├── NotificationsWebScreen.js
│   │       ├── EventsHistoryScreen.js
│   │       └── RealTimeQueryScreen.js
│   │
│   └── navigation/
│       ├── WearableNavigator.js   # Stack navigator wearable
│       └── WebNavigator.js        # Stack navigator web
│
├── assets/                        # Recursos estáticos
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
└── docs/                          # Documentación
    ├── DICCIONARIO_DE_DATOS.md
    ├── MANUAL_TECNICO.md
    └── MANUAL_USUARIO.md
```

### 3.2. Convenciones de Código

#### Nomenclatura
- **Archivos**: camelCase (ej: `sensorService.js`)
- **Componentes**: PascalCase (ej: `DashboardScreen.js`)
- **Variables/Funciones**: camelCase (ej: `getCurrentSteps`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `STEP_GOAL`)
- **Clases**: PascalCase (ej: `SensorService`)

#### Estructura de Componentes
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Componente
export const ComponentName = (props) => {
  // 2.1 Hooks
  const [state, setState] = useState(initialValue);
  
  // 2.2 Effects
  useEffect(() => {
    // Lógica
  }, [dependencies]);
  
  // 2.3 Handlers
  const handleAction = () => {
    // Lógica
  };
  
  // 2.4 Render
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

// 3. Estilos
const styles = StyleSheet.create({
  container: {
    // Estilos
  },
});

// 4. Export
export default ComponentName;
```

---

## 🔧 Configuración del Entorno

### 4.1. Requisitos Previos

```bash
# Verificar versiones
node --version  # >= 18.0.0
npm --version   # >= 9.0.0
expo --version  # Latest
```

### 4.2. Instalación de Dependencias

```bash
# Instalar todas las dependencias
npm install

# Verificar instalación
npm list
```

### 4.3. Configuración de Firebase

#### Paso 1: Crear Proyecto Firebase
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto
3. Habilitar Realtime Database
4. Configurar reglas de seguridad

#### Paso 2: Obtener Credenciales
```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "proyecto.firebaseapp.com",
  databaseURL: "https://proyecto.firebaseio.com",
  projectId: "proyecto",
  storageBucket: "proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

#### Paso 3: Configurar Reglas
```json
{
  "rules": {
    "steps": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    },
    "notifications": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
```

### 4.4. Configuración de Expo

```json
// app.json
{
  "expo": {
    "name": "Sistema Monitoreo Deportivo",
    "slug": "monitoreo-deportivo",
    "version": "1.0.0",
    "orientation": "portrait",
    "plugins": [
      "expo-sensors",
      "expo-notifications",
      "expo-task-manager",
      "expo-background-fetch",
      "expo-location"
    ]
  }
}
```

---

## 🧩 Componentes Principales

### 5.1. WatchFace Component

**Ubicación**: `src/components/WatchFace.js`  
**Propósito**: Componente circular para mostrar métricas en smartwatch

```javascript
<WatchFace
  title="Pasos"
  value={steps}
  unit="pasos"
  icon="👟"
  progress={0.75}
  color="#2563eb"
  size={200}
/>
```

**Características**:
- Diseño circular con SVG
- Barra de progreso animada
- Personalizable en color y tamaño
- Responsive

### 5.2. DashboardCard Component

**Ubicación**: `src/components/web/DashboardCard.js`  
**Propósito**: Tarjetas de estadísticas para dashboard web

```javascript
<DashboardCard
  title="Pasos Totales"
  value={stats.steps}
  unit="pasos"
  icon="👟"
  color="#2563eb"
  subtitle="Hoy"
/>
```

**Características**:
- Diseño de tarjeta con sombra
- Indicador de color lateral
- Icono y título personalizable
- Subtítulo opcional

---

## 🔄 Servicios

### 6.1. SensorService

**Ubicación**: `src/services/sensorService.js`  
**Propósito**: Gestión de sensores y cálculo de métricas

#### Métodos Principales

| Método | Descripción | Retorno |
|--------|-------------|---------|
| `initialize(userId)` | Inicializa el servicio con usuario | void |
| `startStepTracking()` | Inicia seguimiento de pasos | Promise<boolean> |
| `stopStepTracking()` | Detiene seguimiento | void |
| `getCurrentSteps()` | Obtiene pasos actuales | number |
| `getStepHistory(callback, days)` | Obtiene historial | Function |
| `getCurrentLocation()` | Obtiene ubicación GPS | Promise<Object> |
| `calculateDistance(steps)` | Calcula distancia | Object {meters, km} |
| `calculateCalories(steps, weight)` | Calcula calorías | number |

#### Flujo de Trabajo

```javascript
// 1. Inicializar
sensorService.initialize('user_id');

// 2. Iniciar seguimiento
await sensorService.startStepTracking();

// 3. Obtener datos
const steps = sensorService.getCurrentSteps();
const distance = sensorService.calculateDistance(steps);
const calories = sensorService.calculateCalories(steps);

// 4. Detener seguimiento
sensorService.stopStepTracking();
```

### 6.2. NotificationService

**Ubicación**: `src/services/notificationService.js`  
**Propósito**: Gestión de notificaciones

#### Métodos Principales

| Método | Descripción | Retorno |
|--------|-------------|---------|
| `initialize(userId)` | Inicializa el servicio | void |
| `requestPermissions()` | Solicita permisos | Promise<boolean> |
| `sendLocalNotification(title, body, data)` | Envía notificación local | Promise<void> |
| `sendGoalNotification(goalType, current, goal)` | Notificación de meta | Promise<void> |
| `sendReminderNotification(message)` | Notificación de recordatorio | Promise<void> |
| `listenForNotifications(callback)` | Escucha notificaciones Firebase | Function |
| `saveNotificationToFirebase(notification)` | Guarda en Firebase | Promise<void> |

---

## 🗄️ Base de Datos

### 7.1. Estructura en Firebase

```
sistema-monitoreo/
├── steps/
│   └── {userId}/
│       └── {timestamp}/
│           ├── userId: string
│           ├── totalSteps: number
│           ├── newSteps: number
│           ├── timestamp: number
│           └── date: string
│
├── notifications/
│   └── {userId}/
│       └── {timestamp}/
│           ├── userId: string
│           ├── title: string
│           ├── body: string
│           ├── type: string
│           ├── timestamp: number
│           └── read: boolean
│
└── devices/
    └── {deviceId}/
        ├── id: string
        ├── name: string
        ├── model: string
        ├── userId: string
        ├── status: string
        ├── battery: number
        ├── lastSync: string
        └── sensors: array
```

### 7.2. Operaciones CRUD

#### Crear Registro de Pasos
```javascript
const stepData = {
  userId: 'user_id',
  totalSteps: 5000,
  newSteps: 100,
  timestamp: Date.now(),
  date: '2024-07-08'
};

const stepRef = ref(database, `steps/${userId}/${Date.now()}`);
await set(stepRef, stepData);
```

#### Leer Datos en Tiempo Real
```javascript
const stepsRef = ref(database, `steps/${userId}`);

onValue(stepsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const history = Object.values(data);
    updateUI(history);
  }
});
```

#### Actualizar Datos
```javascript
// Se actualiza automáticamente con set()
await set(stepRef, newData);
```

#### Eliminar Datos
```javascript
import { remove } from 'firebase/database';

const stepRef = ref(database, `steps/${userId}/${timestamp}`);
await remove(stepRef);
```

---

## 🧪 Pruebas

### 8.1. Pruebas Unitarias

```javascript
// Ejemplo: sensorService.test.js
import sensorService from '../sensorService';

describe('SensorService', () => {
  test('calculateDistance should convert steps to km', () => {
    const result = sensorService.calculateDistance(1000);
    expect(result.km).toBeCloseTo(0.762, 2);
  });

  test('calculateCalories should calculate correctly', () => {
    const result = sensorService.calculateCalories(1000, 70);
    expect(result).toBeCloseTo(2800, 0);
  });
});
```

### 8.2. Pruebas de Integración

```javascript
// Verificar conexión Firebase
test('Firebase connection', async () => {
  const testRef = ref(database, 'test');
  await set(testRef, { value: true });
  const snapshot = await get(testRef);
  expect(snapshot.val().value).toBe(true);
});
```

### 8.3. Pruebas de UI

```javascript
// Verificar renderizado de componentes
test('DashboardScreen renders correctly', () => {
  const { getByText } = render(<DashboardScreen />);
  expect(getByText('Pasos')).toBeTruthy();
});
```

---

## 🚀 Despliegue

### 9.1. Build para Producción

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Configurar EAS
eas build:configure

# Build para Android
eas build --platform android

# Build para iOS
eas build --platform ios

# Build para web
expo build:web
```

### 9.2. Variables de Entorno

```bash
# .env
FIREBASE_API_KEY=AIzaSy...
FIREBASE_AUTH_DOMAIN=proyecto.firebaseapp.com
FIREBASE_DATABASE_URL=https://proyecto.firebaseio.com
FIREBASE_PROJECT_ID=proyecto
FIREBASE_STORAGE_BUCKET=proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123
```

### 9.3. Optimizaciones

- **Bundle Size**: Usar `expo optimize`
- **Imágenes**: Compresión automática de assets
- **Tree Shaking**: Eliminar código no usado
- **Code Splitting**: Carga diferida de pantallas

---

## 🔍 Depuración

### 10.1. Herramientas

```bash
# Reactotron
npm install --save-dev reactotron-react-native

# Flipper
npm install --save-dev react-native-flipper

# Expo DevTools
expo start --dev-client
```

### 10.2. Logs

```javascript
// Habilitar logs detallados
console.log('[SensorService]', 'Iniciando seguimiento');
console.error('[Error]', error.message);
console.warn('[Warning]', 'Batería baja');
```

---

## 📊 Métricas y Monitoreo

### 11.1. Métricas de Performance

- **Tiempo de carga**: < 2 segundos
- **FPS**: 60 FPS objetivo
- **Memoria**: < 150 MB
- **Batería**: Optimizado para wearables

### 11.2. Métricas de Negocio

- Usuarios activos diarios
- Pasos registrados por día
- Notificaciones enviadas/leídas
- Tasa de sincronización

---

## 🔒 Seguridad

### 12.1. Autenticación

```javascript
// Firebase Authentication
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
const user = await signInWithEmailAndPassword(auth, email, password);
```

### 12.2. Autorización

```javascript
// Reglas de Firebase Database
{
  "rules": {
    "steps": {
      "$userId": {
        ".read": "auth != null && auth.uid === $userId",
        ".write": "auth != null && auth.uid === $userId"
      }
    }
  }
}
```

### 12.3. Validación de Datos

```javascript
// Validar entrada de usuario
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateSteps = (steps) => {
  return Number.isInteger(steps) && steps >= 0;
};
```

---

## 🐛 Troubleshooting

### 13.1. Problemas Comunes

#### Error: "Permission denied"
**Solución**: Verificar permisos en `app.json` y solicitar en runtime

#### Error: "Firebase connection failed"
**Solución**: 
1. Verificar credenciales en `firebase.js`
2. Comprobar conexión a internet
3. Verificar reglas de Firebase

#### Error: "Sensor not available"
**Solución**:
1. Verificar compatibilidad del dispositivo
2. Solicitar permisos antes de usar
3. Implementar fallback

### 13.2. Logs de Debug

```javascript
// Habilitar modo debug
if (__DEV__) {
  console.log('Debug mode enabled');
}
```

---

## 📚 Recursos Adicionales

### 14.1. Documentación Oficial

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)

### 14.2. Repositorios

- GitHub: `[URL del repositorio]`
- Issues: `[URL de issues]`

---

## 👥 Equipo de Desarrollo

**Rol**: Desarrollo para Dispositivos Inteligentes  
**Institución**: Universidad Tecnológica del Valle de Toluca  
**Fecha**: 08 de julio de 2026

---

**Versión del Manual**: 1.0.0  
**Última Actualización**: 08 de julio de 2026