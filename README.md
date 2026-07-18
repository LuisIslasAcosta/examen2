# Sistema de Monitoreo Deportivo Wearable

---

## ¿Qué es?

Una aplicación que convierte tu celular Android en un smartwatch deportivo. Usa el acelerómetro para detectar pasos, calcular calorías y distancia recorrida. Incluye un dashboard web para visualizar las estadísticas en tiempo real.

---

## Características

- **Detección de pasos** en tiempo real usando el acelerómetro
- **Cálculo automático** de calorías quemadas y distancia en km
- **Meta diaria** de 10,000 pasos con progreso visual
- **Dashboard web** con actualización automática cada 2 segundos
- **Notificaciones push** para metas alcanzadas
- **Modo offline** - funciona sin internet
- **Sincronización bidireccional** entre wearable y web

---

## Tecnologías

### Core
- **React Native 0.81.5** + **Expo 54.0.0** - Framework principal
- **React Native Web 0.21.0** - Soporte para navegador
- **TypeScript 5.9.2** - Tipado estático

### Servicios nativos
- **Expo Sensors 15.0.8** - Acelerómetro
- **Expo Location 19.0.8** - Geolocalización
- **Expo Notifications 0.32.17** - Notificaciones push
- **Expo Task Manager 14.0.9** - Tareas en background
- **Expo Background Fetch 14.0.9** - Sincronización en background

### Backend
- **Node.js** + **Express 5.2.1** - API REST (puerto 3000)
- **Firebase 10.7.0** - Base de datos en tiempo real (opcional)

### Navegación y UI
- **React Navigation 6.1.0** - Navegación entre pantallas
- **React Native SVG 15.12.1** - Gráficos vectoriales
- **Ionicons** - Iconos

### Build
- **Capacitor 8.4.2** - Compilación nativa Android

---

## Estructura del proyecto

```
sistema-monitoreo-deportivo/
├── App.js                      # Punto de entrada con selector de modo
├── server.js                   # API REST para sincronización
├── package.json                # Dependencias
├── src/
│   ├── screens/
│   │   ├── wearable/           # Modo reloj
│   │   │   ├── DashboardScreen.js      # Pantalla principal
│   │   │   ├── SensorsScreen.js        # Datos del acelerómetro
│   │   │   ├── NotificationsScreen.js  # Historial de notificaciones
│   │   │   └── SettingsScreen.js       # Configuración
│   │   └── web/                # Modo dashboard
│   │       ├── WebDashboardScreen.js   # Dashboard principal
│   │       ├── DataVisualizationScreen.js
│   │       ├── EventsHistoryScreen.js
│   │       ├── DevicesScreen.js
│   │       └── NotificationsWebScreen.js
│   ├── services/
│   │   ├── sensorService.js            # Lógica de detección de pasos
│   │   ├── syncService.js              # Sincronización con servidor
│   │   └── notificationService.js      # Gestión de notificaciones
│   ├── config/
│   │   └── firebase.js                 # Configuración Firebase
│   ├── components/
│   │   ├── WatchFace.js                # Reloj con progreso circular
│   │   └── web/
│   │       └── DashboardCard.js        # Tarjetas de estadísticas
│   └── navigation/
│       ├── WearableNavigator.js        # Navegación wearable
│       └── WebNavigator.js             # Navegación web
└── android/                           # Configuración nativa
```

---

## Instalación

### Requisitos
- Node.js 18+
- npm o yarn
- Android Studio (para compilar APK)
- Android 7.0+ (para modo wearable)

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/LuisIslasAcosta/examen2.git
cd sistema-monitoreo-deportivo

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor (terminal 1)
node server.js

# 4. Ejecutar app (terminal 2)
# Modo web
npx expo start --web

# Modo Android
npx expo run:android
```


## Uso

### Modo Wearable

1. Abrir app en Android
2. Seleccionar "Wearable" en el selector
3. Conceder permisos de actividad física
4. Presionar "Iniciar" para comenzar detección de pasos
5. La app muestra en tiempo real:
   - Pasos totales
   - Calorías quemadas
   - Distancia recorrida (km)
   - Progreso hacia meta de 10,000 pasos

**Pantallas:**
- **Dashboard**: Vista principal con métricas
- **Sensores**: Datos del acelerómetro en vivo
- **Notificaciones**: Historial de alertas
- **Settings**: Configuración

### Modo Web

1. Abrir `http://localhost:8081` en navegador
2. Seleccionar "Web" en el selector
3. Visualizar dashboard con estadísticas
4. Actualización automática cada 2 segundos
5. Refresh manual con botón o pull-to-refresh

**Vistas disponibles:**
- Dashboard principal
- Historial de eventos
- Dispositivos conectados
- Notificaciones

---

## API del servidor

El servidor Express corre en `http://localhost:3000`

### Endpoints

**POST /api/steps**
Recibe datos de pasos desde el wearable
```json
{
  "userId": "user_demo",
  "totalSteps": 150,
  "newSteps": 10,
  "timestamp": 1699123456789,
  "date": "2024-11-04"
}
```

**GET /api/steps**
Obtiene todos los registros de pasos
```
Query params: ?userId=user_demo
```

---

## Permisos Android

```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="android.permission.INTERNET" />
```

- **ACTIVITY_RECOGNITION**: Acceso al acelerómetro
- **INTERNET**: Sincronización de datos

---

## Pruebas

### Unitarias
```bash
npm test
```

### Manuales
- Detección de pasos caminando
- Cálculo de calorías y distancia
- Actualización del dashboard web
- Modo offline
- Sincronización con servidor
- Notificaciones push

---

## Troubleshooting

**La app no detecta pasos**
- Verificar permisos de actividad física
- Probar caminando a diferente velocidad
- Verificar que el sensor del teléfono funcione

**El dashboard no se actualiza**
- Verificar que el servidor esté corriendo en puerto 3000
- Revisar consola del navegador
- Confirmar que ambas apps estén en el mismo modo

**Error al compilar Android**
- Verificar Android Studio instalado
- Actualizar SDK de Android
- Revisar variables de entorno

---

## Mejoras futuras

- [ ] Autenticación de usuarios
- [ ] GPS para distancia precisa
- [ ] Gráficos de historial
- [ ] Comparativas entre usuarios
- [ ] Exportar datos a CSV/PDF
- [ ] Ritmo cardíaco y velocidad
- [ ] Modo oscuro/claro
- [ ] Integración con redes sociales

---


**Versión:** 1.0.0