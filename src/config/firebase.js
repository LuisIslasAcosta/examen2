import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuración de Firebase (usar valores reales en producción)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

// Inicializar Firebase (evitar inicialización múltiple)
let app = null;
let database = null;

try {
  // Verificar si Firebase está configurado con valores reales
  const isConfigured = firebaseConfig.apiKey !== "TU_API_KEY" && 
                       firebaseConfig.databaseURL !== "https://tu-proyecto.firebaseio.com";
  
  if (isConfigured) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    database = getDatabase(app);
    console.log('Firebase configurado correctamente');
  } else {
    console.log('Firebase no configurado - funcionando en modo local');
  }
} catch (error) {
  console.log('Firebase no disponible, funcionando en modo local');
}

// Exportar servicios
export const databaseInstance = database;
// No usar Auth para evitar errores
export const auth = null;

export default app;
