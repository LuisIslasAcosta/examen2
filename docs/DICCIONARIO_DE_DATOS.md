# Diccionario de Datos
## Sistema de Monitoreo Deportivo

---

## 1. TABLAS/COLECCIONES

### 1.1. steps (Pasos)
**Descripción**: Registro de pasos realizados por los usuarios

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| userId | String | Identificador único del usuario | NOT NULL, Primary Key |
| totalSteps | Integer | Total acumulado de pasos | NOT NULL, >= 0 |
| newSteps | Integer | Pasos nuevos en esta sesión | NOT NULL, >= 0 |
| timestamp | Integer | Marca de tiempo Unix (milisegundos) | NOT NULL, Unique |
| date | String | Fecha en formato ISO (YYYY-MM-DD) | NOT NULL |

**Ejemplo**:
```json
{
  "userId": "usuario_demo",
  "totalSteps": 5230,
  "newSteps": 230,
  "timestamp": 1717717000000,
  "date": "2024-07-08"
}
```

---

### 1.2. notifications (Notificaciones)
**Descripción**: Notificaciones enviadas a los usuarios

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| userId | String | Identificador del usuario destinatario | NOT NULL |
| title | String | Título de la notificación | NOT NULL, Max: 100 chars |
| body | String | Contenido del mensaje | NOT NULL, Max: 500 chars |
| type | String | Tipo de notificación | NOT NULL, Enum: [info, reminder, goal_achieved, warning] |
| timestamp | Integer | Marca de tiempo Unix | NOT NULL, Unique |
| read | Boolean | Estado de lectura | NOT NULL, Default: false |

**Tipos de Notificación**:
- `info`: Informativa
- `reminder`: Recordatorio
- `goal_achieved`: Meta alcanzada
- `warning`: Alerta

**Ejemplo**:
```json
{
  "userId": "usuario_demo",
  "title": "Meta de pasos alcanzada",
  "body": "Has completado tu meta de 10,000 pasos",
  "type": "goal_achieved",
  "timestamp": 1717717000000,
  "read": false
}
```

---

### 1.3. devices (Dispositivos)
**Descripción**: Registro de dispositivos wearables

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| id | String | Identificador único del dispositivo | NOT NULL, Primary Key |
| name | String | Nombre del dispositivo | NOT NULL |
| model | String | Modelo del dispositivo | NOT NULL |
| userId | String | Usuario propietario | NOT NULL, Foreign Key |
| status | String | Estado de conexión | NOT NULL, Enum: [online, offline] |
| battery | Integer | Porcentaje de batería | NOT NULL, Range: 0-100 |
| lastSync | String | Última sincronización | NOT NULL |
| sensors | Array | Lista de sensores disponibles | NOT NULL |

**Sensores Disponibles**:
- Podómetro
- Acelerómetro
- GPS
- Ritmo Cardíaco
- Giroscopio
- Luz Ambiental
- Micrófono
- Cámara

**Ejemplo**:
```json
{
  "id": "device_001",
  "name": "Smartwatch Deportivo Pro",
  "model": "SW-2024-X1",
  "userId": "usuario_demo",
  "status": "online",
  "battery": 85,
  "lastSync": "Hace 2 minutos",
  "sensors": ["Podómetro", "Acelerómetro", "GPS", "Ritmo Cardíaco"]
}
```

---

### 1.4. events (Eventos)
**Descripción**: Registro de eventos del sistema

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| id | String | Identificador único del evento | NOT NULL, Primary Key |
| type | String | Tipo de evento | NOT NULL |
| title | String | Título del evento | NOT NULL, Max: 100 chars |
| description | String | Descripción detallada | NOT NULL, Max: 500 chars |
| user | String | Usuario relacionado | NOT NULL |
| device | String | Dispositivo relacionado | NOT NULL |
| timestamp | Integer | Marca de tiempo Unix | NOT NULL |
| severity | String | Nivel de severidad | NOT NULL, Enum: [info, success, warning, error] |

**Tipos de Evento**:
- `step_milestone`: Hito de pasos
- `goal_achieved`: Meta completada
- `battery_warning`: Alerta de batería
- `device_connected`: Dispositivo conectado
- `device_disconnected`: Dispositivo desconectado
- `notification_sent`: Notificación enviada
- `calorie_milestone`: Hito de calorías
- `sync_completed`: Sincronización completada

**Niveles de Severidad**:
- `info`: Informativo (azul)
- `success`: Éxito (verde)
- `warning`: Advertencia (amarillo)
- `error`: Error (rojo)

**Ejemplo**:
```json
{
  "id": "event_001",
  "type": "goal_achieved",
  "title": "Meta diaria completada",
  "description": "Meta de 10,000 pasos completada por usuario_demo",
  "user": "usuario_demo",
  "device": "SW-2024-X1",
  "timestamp": 1717717000000,
  "severity": "success"
}
```

---

### 1.5. users (Usuarios)
**Descripción**: Información de usuarios del sistema

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| uid | String | Identificador único de Firebase | NOT NULL, Primary Key |
| email | String | Correo electrónico | NOT NULL, Unique, Email format |
| name | String | Nombre completo | NOT NULL, Max: 100 chars |
| weight | Float | Peso en kilogramos | NOT NULL, Range: 20-300 |
| height | Float | Altura en metros | NOT NULL, Range: 0.5-2.5 |
| stepGoal | Integer | Meta diaria de pasos | NOT NULL, Default: 10000 |
| calorieGoal | Integer | Meta diaria de calorías | NOT NULL, Default: 500 |
| distanceGoal | Float | Meta diaria de distancia (km) | NOT NULL, Default: 5.0 |
| createdAt | Integer | Fecha de creación (timestamp) | NOT NULL |
| lastLogin | Integer | Último acceso (timestamp) | NOT NULL |

**Ejemplo**:
```json
{
  "uid": "user_demo_123",
  "email": "usuario@demo.com",
  "name": "Usuario Demo",
  "weight": 70.5,
  "height": 1.75,
  "stepGoal": 10000,
  "calorieGoal": 500,
  "distanceGoal": 5.0,
  "createdAt": 1717717000000,
  "lastLogin": 1717717000000
}
```

---

## 2. CONSTANTES Y VALORES PREDEFINIDOS

### 2.1. Constantes de Cálculo

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| METERS_PER_STEP | 0.762 | Metros promedio por paso |
| CALORIES_PER_STEP | 0.04 | Calorías promedio por paso por kg |
| DEFAULT_WEIGHT | 70 | Peso por defecto en kg |
| DEFAULT_STEP_GOAL | 10000 | Meta de pasos diaria |
| DEFAULT_CALORIE_GOAL | 500 | Meta de calorías diaria |
| DEFAULT_DISTANCE_GOAL | 5.0 | Meta de distancia diaria (km) |
| UPDATE_INTERVAL | 2000 | Intervalo de actualización (ms) |
| HEART_RATE_MIN | 40 | Frecuencia cardíaca mínima (bpm) |
| HEART_RATE_MAX | 160 | Frecuencia cardíaca máxima (bpm) |

### 2.2. Rangos de Valores

| Parámetro | Mínimo | Máximo | Unidad |
|-----------|--------|--------|--------|
| Batería | 0 | 100 | % |
| Pasos | 0 | 999,999 | pasos |
| Calorías | 0 | 9,999 | kcal |
| Distancia | 0 | 999.99 | km |
| Ritmo cardíaco | 40 | 160 | bpm |
| Velocidad | 0 | 50 | km/h |
| Altitud | -500 | 9000 | metros |

### 2.3. Códigos de Color

| Color | Código Hex | Uso |
|-------|-----------|-----|
| Azul primario | #2563eb | Botones principales, enlaces |
| Verde éxito | #22c55e | Estados exitosos, metas |
| Rojo error | #ef4444 | Errores, alertas |
| Amarillo advertencia | #f59e0b | Advertencias |
| Gris oscuro | #0f172a | Fondo wearable |
| Gris medio | #1e293b | Tarjetas, contenedores |
| Blanco | #ffffff | Texto, fondos web |
| Gris claro | #f8fafc | Fondo web |

---

## 3. FORMATOS DE FECHA Y HORA

### 3.1. Formatos Utilizados

| Formato | Ejemplo | Uso |
|---------|---------|-----|
| ISO 8601 | 2024-07-08T10:30:00.000Z | Almacenamiento en BD |
| Unix Timestamp | 1717717000000 | Marcas de tiempo |
| HH:MM | 10:30 | Reloj smartwatch |
| DD/MM/YYYY | 08/07/2024 | Fechas legibles |
| Relativo | "Hace 2 minutos" | Notificaciones, eventos |

### 3.2. Zona Horaria
- **Zona**: America/Mexico_City (UTC-6)
- **Formato 24h**: Sí
- **Idioma**: Español (es-ES)

---

## 4. VALIDACIONES

### 4.1. Validaciones de Usuario

| Campo | Validación |
|-------|-----------|
| email | Formato email válido, único |
| name | Requerido, máximo 100 caracteres |
| weight | Rango: 20-300 kg |
| height | Rango: 0.5-2.5 m |
| stepGoal | Mínimo: 1000, máximo: 100000 |

### 4.2. Validaciones de Pasos

| Campo | Validación |
|-------|-----------|
| totalSteps | Entero positivo |
| newSteps | Entero positivo |
| timestamp | Timestamp válido, único |

### 4.3. Validaciones de Notificaciones

| Campo | Validación |
|-------|-----------|
| title | Requerido, máximo 100 caracteres |
| body | Requerido, máximo 500 caracteres |
| type | Valor enum válido |

---

## 5. ÍNDICES

### 5.1. Índices Recomendados para Firebase

```json
{
  "steps": {
    "userId": {
      ".indexOn": ["userId", "timestamp"]
    }
  },
  "notifications": {
    "userId": {
      ".indexOn": ["userId", "timestamp", "read"]
    }
  },
  "events": {
    "timestamp": {
      ".indexOn": ["timestamp", "severity"]
    }
  }
}
```

---

## 6. RELACIONES

### 6.1. Diagrama de Relaciones

```
users (1) ──────< devices (N)
  │
  ├───< steps (N)
  │
  ├───< notifications (N)
  │
  └───< events (N)
```

### 6.2. Descripción de Relaciones

- **Un usuario** puede tener **muchos dispositivos**
- **Un usuario** puede tener **muchos registros de pasos**
- **Un usuario** puede recibir **muchas notificaciones**
- **Un usuario** puede estar relacionado con **muchos eventos**

---

## 7. PERMISOS

### 7.1. Permisos de Aplicación

| Permiso | Plataforma | Uso |
|---------|-----------|-----|
| ACTIVITY_RECOGNITION | Android/iOS | Lectura de pasos |
| ACCESS_FINE_LOCATION | Android/iOS | GPS y ubicación |
| POST_NOTIFICATIONS | iOS | Envío de notificaciones |
| VIBRATE | Android/iOS | Vibración de notificaciones |

---

## 8. LÍMITES Y RESTRICCIONES

### 8.1. Firebase Realtime Database

| Límite | Valor | Descripción |
|--------|-------|-------------|
| Tamaño de documento | 256 MB | Máximo por nodo |
| Ancho de banda | 10 GB/mes | Plan gratuito |
| Operaciones simultáneas | 100,000 | Por segundo |
| Profundidad de nodos | 32 | Niveles máximo |

### 8.2. Aplicación

| Límite | Valor | Descripción |
|--------|-------|-------------|
| Registros mostrados | 20 | Pantalla tiempo real |
| Historial mostrado | 7 días | Por defecto |
| Meta de pasos | 10,000 | Por defecto |
| Intervalo de actualización | 2 segundos | Tiempo real |

---

## 9. CÓDIGOS DE ERROR

| Código | Mensaje | Descripción |
|--------|---------|-------------|
| ERR_SENSOR_DENIED | "Permiso denegado" | Acceso a sensores no autorizado |
| ERR_LOCATION_DENIED | "Permiso de ubicación denegado" | GPS no autorizado |
| ERR_NOTIFICATION_DENIED | "Permiso de notificaciones denegado" | Notificaciones no autorizadas |
| ERR_FIREBASE_CONNECTION | "Error de conexión Firebase" | Sin conexión a BD |
| ERR_INVALID_DATA | "Datos inválidos" | Formato de datos incorrecto |
| ERR_USER_NOT_FOUND | "Usuario no encontrado" | Usuario no existe en BD |

---

## 10. ESTADOS DE SINCRONIZACIÓN

| Estado | Código | Descripción |
|--------|--------|-------------|
| Sincronizado | 0 | Datos actualizados |
| Pendiente | 1 | Esperando sincronización |
| Error | 2 | Error en sincronización |
| Offline | 3 | Sin conexión |

---

**Versión**: 1.0.0  
**Fecha**: 08 de julio de 2026  
**Materia**: Desarrollo para Dispositivos Inteligentes