# Guía de Instalación Rápida
## Sistema de Monitoreo Deportivo

---

## ⚡ Instalación en 5 Pasos

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0
- Expo CLI
- Cuenta de Firebase

---

### Paso 1: Instalar Dependencias

```bash
# Navegar al directorio del proyecto
cd ~/examenes/sistema-monitoreo-deportivo

# Instalar todas las dependencias
npm install
```

**Tiempo estimado**: 2-3 minutos

---

### Paso 2: Configurar Firebase

1. **Crear proyecto en Firebase**
   - Ir a: https://console.firebase.google.com/
   - Crear nuevo proyecto: `sistema-monitoreo-deportivo`
   - Habilitar Realtime Database

2. **Obtener credenciales**
   - En Firebase Console → Configuración del proyecto
   - Copiar credenciales web

3. **Actualizar configuración**
   ```bash
   # Editar archivo
   nano src/config/firebase.js
   ```
   
   Reemplazar con tus credenciales:
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

4. **Configurar reglas de seguridad**
   - En Firebase Console → Realtime Database → Reglas
   - Pegar las reglas desde `docs/CONFIGURACION_FIREBASE.md`
   - Click en "Publicar"

---

### Paso 3: Verificar Instalación

```bash
# Verificar que todas las dependencias están instaladas
npm list

# Deberías ver algo como:
# ├── expo@~51.0.0
# ├── firebase@^10.7.0
# ├── react-native@0.74.0
# └── ...
```

---

### Paso 4: Iniciar la Aplicación

```bash
# Iniciar Expo
npm start

# O usar directamente:
npx expo start
```

**Verás**:
- Un código QR en la terminal
- Opciones para abrir en Android/iOS/Web

---

### Paso 5: Probar en tu Celular

1. **Instalar Expo Go**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **Escanear código QR**
   - Abrir Expo Go en tu celular
   - Escanear el código QR de la terminal
   - La app se cargará automáticamente

3. **Probar funcionalidades**
   - Cambiar entre modo Wearable y Web
   - Iniciar seguimiento de pasos
   - Navegar entre pantallas

---

## 🔧 Configuración Adicional

### Variables de Entorno (Opcional)

Crear archivo `.env` en la raíz del proyecto:

```bash
# .env
FIREBASE_API_KEY=AIzaSy...
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com
FIREBASE_PROJECT_ID=tu-proyecto
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123
```

Instalar dotenv:
```bash
npm install dotenv
```

---

## 📱 Modos de la Aplicación

### Modo Wearable (Smartwatch)
- Diseño circular oscuro
- 4 pantallas funcionales
- Enfoque en métricas deportivas

### Modo Web (Panel de Control)
- Diseño claro y profesional
- 6 pantallas funcionales
- Enfoque en administración y visualización

**Cambiar entre modos**: Usar el selector en la parte superior de la app

---

## 🧪 Pruebas

### Probar Sensores

```javascript
// En DashboardScreen.js, el botón "Iniciar" activará:
// - Podómetro (pasos)
// - Cálculo de calorías
// - Cálculo de distancia
```

### Probar Firebase

```javascript
// Los datos se guardan automáticamente en:
// - steps/{userId}/{timestamp}
// - notifications/{userId}/{timestamp}
```

Verificar en Firebase Console → Realtime Database

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"

**Solución**:
```bash
# Limpiar cache y reinstalar
rm -rf node_modules
npm install
```

### Error: "Firebase not configured"

**Solución**:
- Verificar que `firebase.js` tenga las credenciales correctas
- Verificar que Firebase Realtime Database esté habilitado

### Error: "Permission denied"

**Solución**:
- Verificar reglas de seguridad en Firebase
- Asegurarse de estar en modo prueba o tener reglas correctas

### La app no carga en Expo Go

**Solución**:
```bash
# Reiniciar Expo
npm start -- --clear

# O usar tunnel en lugar de LAN
npx expo start --tunnel
```

### Los sensores no funcionan

**Solución**:
- Verificar permisos en el dispositivo
- Asegurarse de usar un dispositivo físico (no emulador)
- Reiniciar la aplicación

---

## 📚 Documentación Adicional

- **README.md**: Documentación general del proyecto
- **docs/MANUAL_TECNICO.md**: Documentación técnica completa
- **docs/MANUAL_USUARIO.md**: Manual de usuario
- **docs/DICCIONARIO_DE_DATOS.md**: Diccionario de datos
- **docs/CONFIGURACION_FIREBASE.md**: Guía detallada de Firebase

---

## ✅ Checklist de Verificación

Antes de entregar el proyecto, verificar:

- [ ] Dependencias instaladas correctamente
- [ ] Firebase configurado con credenciales propias
- [ ] Reglas de seguridad publicadas
- [ ] App se ejecuta en Expo Go
- [ ] Modo Wearable funciona (4 pantallas)
- [ ] Modo Web funciona (6 pantallas)
- [ ] Sensores responden correctamente
- [ ] Datos se sincronizan en Firebase
- [ ] Notificaciones se muestran
- [ ] Documentación completa

---

## 🚀 Próximos Pasos

1. **Personalizar la aplicación**
   - Cambiar colores en `styles`
   - Modificar metas en `SettingsScreen.js`
   - Ajustar intervalos de actualización

2. **Agregar funcionalidades**
   - Autenticación de usuarios
   - Gráficos avanzados
   - Exportación de reportes
   - Integración con más sensores

3. **Preparar para producción**
   - Build con EAS
   - Publicar en stores
   - Configurar dominio web

---

## 📞 Contacto y Soporte

**Universidad**: Tecnológica del Valle de Toluca  
**Materia**: Desarrollo para Dispositivos Inteligentes  
**Docente**: ITIC Roberto Vinicio Camacho Mendoza  
**Fecha de entrega**: 08 de julio de 2026

---

## 🎯 Comandos Útiles

```bash
# Iniciar desarrollo
npm start

# Iniciar en Android
npm run android

# Iniciar en iOS
npm run ios

# Iniciar en Web
npm run web

# Instalar dependencias
npm install

# Actualizar dependencias
npm update

# Verificar errores
npm audit

# Limpiar cache
expo start --clear

# Build para producción
eas build --platform android
eas build --platform ios
```

---

**¡Listo!** Tu proyecto está configurado y listo para usar.

Para cualquier problema, consulta la documentación en la carpeta `docs/`.