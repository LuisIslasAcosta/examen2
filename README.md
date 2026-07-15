# Sistema de Monitoreo Deportivo

## Universidad Tecnológica del Valle de Toluca
### Desarrollo para Dispositivos Inteligentes

---

## 📋 Descripción del Proyecto

Sistema tecnológico compuesto por una **aplicación web** y una **aplicación wearable** (móvil con interfaz tipo smartwatch) que permiten la comunicación e intercambio de información en tiempo real o bajo demanda mediante el uso de sensores, notificaciones y servicios de comunicación.

## 🎯 Características Principales

### Aplicación Wearable (Smartwatch)
- ✅ 4 pantallas funcionales
- ✅ Diseño adaptado para wearables (forma circular)
- ✅ Inicio/Dashboard con visualización de pasos
- ✅ Visualización de información de sensores
- ✅ Recepción de notificaciones
- ✅ Navegación entre pantallas
- ✅ Manejo de errores y validación de datos
- ✅ Uso de al menos 2 sensores (Podómetro, Acelerómetro, GPS, Ritmo Cardíaco)

### Aplicación Web
- ✅ 6 pantallas funcionales
- ✅ Dashboard principal
- ✅ Registro y administración de dispositivos wearables
- ✅ Visualización de información enviada por wearables
- ✅ Envío de notificaciones (hacia uno o varios dispositivos)
- ✅ Historial de eventos o registros
- ✅ Consulta de información en tiempo real con actualización periódica

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma de desarrollo y despliegue
- **Expo Sensors** - Acceso a sensores del dispositivo
- **Expo Notifications** - Sistema de notificaciones
- **Expo Location** - Servicios de geolocalización
- **React Native SVG** - Gráficos vectoriales para watchfaces

### Backend
- **Firebase Realtime Database** - Base de datos en tiempo real
- **Firebase Authentication** - Autenticación de usuarios
- **Firebase Cloud Messaging** - Notificaciones push

### Navegación
- **React Navigation** - Navegación entre pantallas

## 📁 Estructura del Proyecto

```
sistema-monitoreo-deportivo/
├── App.js                          # Punto de entrada principal
├── package.json                    # Dependencias del proyecto
├── app.json                        # Configuración de Expo
├── .gitignore                      # Archivos ignorados por Git
│
├── src/
│   ├── config/
│   │   └── firebase.js            # Configuración de Firebase
│   │
│   ├── services/
│   │   ├── sensorService.js       # Servicio de sensores
│   │   └── notificationService.js # Servicio de notificaciones
│   │
│   ├── components/
│   │   ├── WatchFace.js           # Componente de watchface circular
│   │   └── web/
│   │       └── DashboardCard.js   # Tarjetas para dashboard web
│   │
│   ├── screens/
│   │   ├── wearable/
│   │   │   ├── DashboardScreen.js      # Pantalla principal
│   │   │   ├── SensorsScreen.js        # Pantalla de sensores
│   │   │   ├── NotificationsScreen.js  # Pantalla de notificaciones
│   │   │   └── SettingsScreen.js       # Pantalla de configuración
│   │   │
│   │   └── web/
│   │       ├── WebDashboardScreen.js       # Dashboard web
│   │       ├── DevicesScreen.js            # Gestión de dispositivos
│   │       ├── DataVisualizationScreen.js  # Visualización de datos
│   │       ├── NotificationsWebScreen.js   # Envío de notificaciones
│   │       ├── EventsHistoryScreen.js      # Historial de eventos
│   │       └── RealTimeQueryScreen.js      # Consulta en tiempo real
│   │
│   └── navigation/
│       ├── WearableNavigator.js   # Navegación de la app wearable
│       └── WebNavigator.js        # Navegación de la app web
│
└── assets/                         # Recursos (imágenes, iconos)
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Expo CLI
- Cuenta de Firebase

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd sistema-monitoreo-deportivo
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Realtime Database
   - Copiar las credenciales de Firebase
   - Actualizar el archivo `src/config/firebase.js` con tus credenciales:
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

4. **Configurar reglas de Firebase Database**
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

5. **Ejecutar la aplicación**
```bash
# Iniciar Expo
npm start

# O para plataformas específicas
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## 📱 Uso de la Aplicación

### Modo Wearable (Smartwatch)
1. Abrir la aplicación en modo wearable
2. Presionar "Iniciar" para comenzar el seguimiento de pasos
3. Navegar entre pantallas usando los botones inferiores:
   - 🏠 Dashboard - Vista principal con pasos, calorías y distancia
   - 📊 Sensores - Información de sensores (ritmo cardíaco, batería, GPS)
   - 🔔 Notificaciones - Lista de notificaciones recibidas
   - ⚙️ Configuración - Ajustes de la aplicación

### Modo Web (Panel de Control)
1. Cambiar al modo web en el selector superior
2. Navegar entre las 6 pantallas:
   - **Dashboard Principal**: Estadísticas generales y actividad reciente
   - **Dispositivos**: Gestión de wearables registrados
   - **Visualización de Datos**: Gráficos y estadísticas deportivas
   - **Envío de Notificaciones**: Crear y enviar notificaciones
   - **Historial de Eventos**: Registro completo de actividades
   - **Consulta en Tiempo Real**: Monitoreo live de datos

## 🔧 Funcionalidades Técnicas

### Sensores Implementados
- **Podómetro**: Conteo de pasos en tiempo real
- **Acelerómetro**: Detección de movimiento
- **GPS**: Obtención de ubicación y distancia
- **Ritmo Cardíaco**: Monitoreo cardíaco (simulado)
- **Batería**: Nivel de batería del dispositivo

### Servicios
- **SensorService**: Gestión de sensores y cálculo de métricas
- **NotificationService**: Manejo de notificaciones locales y push
- **Firebase Service**: Sincronización en tiempo real

### Cálculos
- **Distancia**: `pasos × 0.762 metros`
- **Calorías**: `pasos × 0.04 × (peso / 70)`
- **Progreso**: Porcentaje de meta diaria (10,000 pasos)

## 📊 Datos Sincronizados

### Estructura en Firebase
```
steps/
  └── {userId}/
      └── {timestamp}/
          ├── userId: string
          ├── totalSteps: number
          ├── newSteps: number
          ├── timestamp: number
          └── date: string

notifications/
  └── {userId}/
      └── {timestamp}/
          ├── userId: string
          ├── title: string
          ├── body: string
          ├── type: string
          ├── timestamp: number
          └── read: boolean
```

## 🧪 Pruebas

### Pruebas Unitarias
```bash
npm test
```

### Pruebas de Integración
1. Verificar conexión con Firebase
2. Probar lectura de sensores
3. Validar envío de notificaciones
4. Comprobar sincronización en tiempo real

## 📦 Entregables

### A) Documentación del Proyecto
- ✅ Portada (datos de materia, integrantes, nombre del proyecto)
- ✅ Resumen del proyecto
- ✅ Problemática a resolver
- ✅ Justificación de la solución
- ✅ Modelo entidad-relación
- ✅ Diccionario de datos
- ✅ Código fuente completo
- ✅ Video demostrativo (5 minutos máximo)

### B) Archivos Adicionales
- ✅ Manual técnico (PDF)
- ✅ Manual de usuario (PDF)
- ✅ Base de datos (copia de Firebase)

### C) Presentación
- Presentación del proyecto funcional

## 👥 Integrantes del Equipo

_(_Espacio para nombres de integrantes_)_


## 📝 Notas Adicionales

- La aplicación está diseñada para ser emulada en celular
- El diseño del wearable es circular para simular un smartwatch real
- Todos los datos se sincronizan en tiempo real mediante Firebase
- Las notificaciones se envían tanto localmente como a través de Firebase
- El sistema es escalable y permite agregar más sensores fácilmente

## 🔄 Actualizaciones Futuras

- [ ] Integración con más tipos de sensores
- [ ] Gráficos avanzados con librerías especializadas
- [ ] Modo oscuro/claro
- [ ] Exportación de reportes en PDF
- [ ] Integración con redes sociales
- [ ] Sistema de logros y gamificación
- [ ] Soporte para múltiples idiomas

## 📄 Licencia

Este proyecto es desarrollado con fines académicos para la Universidad Tecnológica del Valle de Toluca.

---

**Fecha de entrega**: 08 de julio de 2026  
**Materia**: Desarrollo para Dispositivos Inteligentes  
**Docente**: ITIC Roberto Vinicio Camacho Mendoza