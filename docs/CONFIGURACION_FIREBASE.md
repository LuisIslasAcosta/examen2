# Configuración de Firebase
## Sistema de Monitoreo Deportivo

---

## 📋 Pasos para Configurar Firebase

### Paso 1: Crear Proyecto en Firebase

1. **Acceder a Firebase Console**
   - Ir a: https://console.firebase.google.com/
   - Iniciar sesión con cuenta de Google

2. **Crear Nuevo Proyecto**
   - Click en "Agregar proyecto"
   - Nombre del proyecto: `sistema-monitoreo-deportivo`
   - Deshabilitar Google Analytics (opcional)
   - Click en "Crear proyecto"

3. **Habilitar Realtime Database**
   - En el menú lateral, ir a "Realtime Database"
   - Click en "Crear base de datos"
   - Seleccionar ubicación: `us-central` (o la más cercana)
   - Seleccionar modo: `Iniciar en modo prueba`
   - Click en "Habilitar"

### Paso 2: Obtener Credenciales

1. **Ir a Configuración del Proyecto**
   - Click en el icono de engranaje ⚙️
   - Seleccionar "Configuración del proyecto"

2. **Obtener Credenciales Web**
   - Ir a la pestaña "Tus apps"
   - Click en "Agregar app" → Seleccionar icono web `</>`
   - Registrar app con nombre: `sistema-monitoreo-web`
   - Copiar el objeto `firebaseConfig` generado

3. **Actualizar Archivo de Configuración**
   ```javascript
   // src/config/firebase.js
   const firebaseConfig = {
     apiKey: "AIzaSy...", // Pegar tu API Key
     authDomain: "sistema-monitoreo-deportivo.firebaseapp.com",
     databaseURL: "https://sistema-monitoreo-deportivo.firebaseio.com",
     projectId: "sistema-monitoreo-deportivo",
     storageBucket: "sistema-monitoreo-deportivo.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

### Paso 3: Configurar Reglas de Seguridad

1. **Ir a Realtime Database → Reglas**

2. **Reemplazar las reglas con:**
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
    },
    "devices": {
      "$deviceId": {
        ".read": true,
        ".write": true
      }
    },
    "events": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. **Click en "Publicar"**

### Paso 4: Configurar Autenticación (Opcional)

1. **Ir a Authentication**
   - En el menú lateral, seleccionar "Authentication"
   - Click en "Comenzar"

2. **Habilitar Proveedores**
   - Email/Contraseña: Habilitar
   - Google: Habilitar (opcional)

3. **Crear Usuario de Prueba**
   - Click en "Agregar usuario"
   - Email: `usuario@demo.com`
   - Contraseña: `demo123`
   - Click en "Agregar usuario"

---

## 🔧 Estructura de la Base de Datos

### Estructura Inicial Recomendada

```
sistema-monitoreo-deportivo/
├── steps/
│   └── usuario_demo/
│       └── 1717717000000/
│           ├── userId: "usuario_demo"
│           ├── totalSteps: 0
│           ├── newSteps: 0
│           ├── timestamp: 1717717000000
│           └── date: "2024-07-08"
│
├── notifications/
│   └── usuario_demo/
│       └── 1717717000000/
│           ├── userId: "usuario_demo"
│           ├── title: "Bienvenido"
│           ├── body: "Comienza a registrar tus pasos"
│           ├── type: "info"
│           ├── timestamp: 1717717000000
│           └── read: false
│
├── devices/
│   └── device_001/
│       ├── id: "device_001"
│       ├── name: "Smartwatch Deportivo Pro"
│       ├── model: "SW-2024-X1"
│       ├── userId: "usuario_demo"
│       ├── status: "online"
│       ├── battery: 100
│       ├── lastSync: "Ahora"
│       └── sensors: ["Podómetro", "Acelerómetro", "GPS"]
│
└── events/
    └── system_event_001/
        ├── id: "system_event_001"
        ├── type: "device_connected"
        ├── title: "Dispositivo conectado"
        ├── description: "Nuevo dispositivo registrado"
        ├── user: "usuario_demo"
        ├── device: "SW-2024-X1"
        ├── timestamp: 1717717000000
        └── severity: "info"
```

---

## 📊 Datos de Prueba

### Insertar Datos de Prueba

Puedes insertar datos de prueba manualmente desde la consola de Firebase:

1. **Ir a Realtime Database**
2. **Click en "Agregar" para crear nodos**
3. **O usar la consola de Firebase:**

```javascript
// Desde la consola de Firebase (Tools → Scripts)
const database = admin.database();

// Agregar usuario de prueba
await database.ref('users/usuario_demo').set({
  uid: 'usuario_demo',
  email: 'usuario@demo.com',
  name: 'Usuario Demo',
  weight: 70,
  height: 1.75,
  stepGoal: 10000,
  calorieGoal: 500,
  distanceGoal: 5.0,
  createdAt: Date.now(),
  lastLogin: Date.now()
});

// Agregar dispositivo de prueba
await database.ref('devices/device_001').set({
  id: 'device_001',
  name: 'Smartwatch Deportivo Pro',
  model: 'SW-2024-X1',
  userId: 'usuario_demo',
  status: 'online',
  battery: 85,
  lastSync: 'Ahora',
  sensors: ['Podómetro', 'Acelerómetro', 'GPS', 'Ritmo Cardíaco']
});

// Agregar pasos de prueba
for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  
  await database.ref(`steps/usuario_demo/${date.getTime()}`).set({
    userId: 'usuario_demo',
    totalSteps: Math.floor(Math.random() * 5000) + 5000,
    newSteps: Math.floor(Math.random() * 1000) + 500,
    timestamp: date.getTime(),
    date: date.toISOString().split('T')[0]
  });
}
```

---

## 🔒 Seguridad

### Reglas de Seguridad Recomendadas

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "steps": {
      "$userId": {
        ".read": "auth != null && auth.uid === $userId",
        ".write": "auth != null && auth.uid === $userId"
      }
    },
    "notifications": {
      "$userId": {
        ".read": "auth != null && auth.uid === $userId",
        ".write": "auth != null && auth.uid === $userId"
      }
    },
    "devices": {
      "$deviceId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "events": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Habilitar Autenticación

Para producción, es recomendable habilitar Firebase Authentication:

```javascript
// En src/config/firebase.js
import { getAuth } from 'firebase/auth';

export const auth = getAuth(app);

// En la pantalla de login
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuario autenticado:', user.uid);
    return user;
  } catch (error) {
    console.error('Error de autenticación:', error);
    throw error;
  }
};
```

---

## 📈 Monitoreo y Analytics

### Habilitar Firebase Analytics

1. **Ir a Analytics en Firebase Console**
2. **Habilitar Google Analytics** (si no lo hiciste antes)
3. **Configurar Eventos Personalizados:**

```javascript
// En src/services/analyticsService.js
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

// Eventos a registrar
logEvent(analytics, 'step_milestone', {
  steps: 5000,
  userId: 'usuario_demo'
});

logEvent(analytics, 'goal_achieved', {
  goalType: 'steps',
  value: 10000
});

logEvent(analytics, 'notification_sent', {
  type: 'reminder',
  userId: 'usuario_demo'
});
```

---

## 🚀 Despliegue

### Configurar para Producción

1. **Actualizar Reglas de Base de Datos**
```json
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

2. **Habilitar Modo Producción en Firebase**
   - Ir a Project Settings → General
   - Scroll hasta "Your apps"
   - Seleccionar la app web
   - En "Firebase SDK snippet", seleccionar "Config"

3. **Actualizar Credenciales en App.js**
```javascript
// Usar variables de entorno en producción
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
```

---

## 🧪 Pruebas

### Probar Conexión con Firebase

```javascript
// En App.js o pantalla de prueba
import { ref, set, onValue } from 'firebase/database';
import { database } from './src/config/firebase';

const testFirebaseConnection = async () => {
  try {
    const testRef = ref(database, 'test/connection');
    await set(testRef, {
      timestamp: Date.now(),
      message: 'Conexión exitosa'
    });
    
    onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Datos recibidos:', data);
      alert('Conexión Firebase: ✓ Exitosa');
    });
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('Error de conexión Firebase');
  }
};
```

### Verificar Lectura de Sensores

```javascript
import { Pedometer } from 'expo-sensors';

const testPedometer = async () => {
  const { status } = await Pedometer.requestPermissionsAsync();
  
  if (status === 'granted') {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    
    const result = await Pedometer.getStepCountAsync(start, end);
    console.log('Pasos en las últimas 24h:', result.steps);
    alert(`Pasos: ${result.steps}`);
  } else {
    alert('Permiso denegado');
  }
};
```

---

## 📝 Checklist de Configuración

- [ ] Proyecto Firebase creado
- [ ] Realtime Database habilitado
- [ ] Credenciales copiadas en `firebase.js`
- [ ] Reglas de seguridad configuradas
- [ ] Modo prueba activado en Database
- [ ] Autenticación configurada (opcional)
- [ ] Usuario de prueba creado
- [ ] Datos de prueba insertados
- [ ] Conexión probada desde la app
- [ ] Sensores probados en dispositivo

---

## 🆘 Solución de Problemas

### Error: "Firebase App already exists"

**Causa**: Firebase ya fue inicializado  
**Solución**:
```javascript
import { initializeApp, getApps } from 'firebase/app';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
```

### Error: "Permission denied"

**Causa**: Reglas de seguridad muy restrictivas  
**Solución**: Verificar reglas en Firebase Console

### Error: "Database URL not found"

**Causa**: URL de base de datos incorrecta  
**Solución**: Verificar `databaseURL` en `firebaseConfig`

### Error: "Network request failed"

**Causa**: Sin conexión a internet  
**Solución**: Verificar conexión y credenciales

---

## 📞 Soporte

Si tienes problemas con la configuración:

1. Verificar la consola de Firebase para errores
2. Revisar los logs de la aplicación
3. Consultar la documentación oficial: https://firebase.google.com/docs

---

**Versión**: 1.0.0  
**Fecha**: 08 de julio de 2026  
**Materia**: Desarrollo para Dispositivos Inteligentes