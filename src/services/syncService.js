import { Platform } from 'react-native';

class SyncService {
  constructor() {
    this.isOnline = false;
  }

  // Sincronizar datos de pasos (almacenamiento local)
  async syncSteps(userId, stepsData) {
    try {
      // Guardar datos localmente en el dispositivo
      console.log('Guardando datos localmente...', stepsData);
      
      // En Android, guardar en memoria/localStorage
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        // Los datos ya se guardan en sensorService
        console.log('Datos guardados en el dispositivo');
      }
      
      return true;
    } catch (error) {
      console.error('Error al sincronizar:', error);
      return false;
    }
  }

  // Guardar datos localmente
  saveLocalData(userId, data) {
    try {
      const key = `steps_${userId}`;
      const existingData = this.getLocalData(userId) || [];
      const newData = {
        ...data,
        timestamp: Date.now(),
        synced: false
      };
      
      // Agregar nuevo dato
      const updatedData = [...existingData, newData].slice(-100); // Mantener últimos 100
      
      // Guardar en localStorage (web) o AsyncStorage (native)
      if (Platform.OS === 'web') {
        localStorage.setItem(key, JSON.stringify(updatedData));
      } else {
        // En Android, guardar en localStorage del WebView
        // Esto permitirá que la parte web acceda a los datos
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(updatedData));
        }
        console.log('Datos guardados para sincronización:', newData);
      }
      
      return true;
    } catch (error) {
      console.error('Error al guardar datos locales:', error);
      return false;
    }
  }

  // Obtener datos locales
  getLocalData(userId) {
    try {
      const key = `steps_${userId}`;
      
      if (Platform.OS === 'web') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      } else {
        // En Android/iOS usaríamos AsyncStorage
        return [];
      }
    } catch (error) {
      console.error('Error al obtener datos locales:', error);
      return [];
    }
  }

  // Obtener datos pendientes de sincronizar
  getPendingSync(userId) {
    try {
      const data = this.getLocalData(userId);
      return data.filter(item => !item.synced);
    } catch (error) {
      console.error('Error al obtener pendientes:', error);
      return [];
    }
  }

  // Marcar datos como sincronizados
  markAsSynced(userId, timestamp) {
    try {
      const key = `steps_${userId}`;
      let data = this.getLocalData(userId);
      
      data = data.map(item => 
        item.timestamp === timestamp ? { ...item, synced: true } : item
      );
      
      if (Platform.OS === 'web') {
        localStorage.setItem(key, JSON.stringify(data));
      }
      
      return true;
    } catch (error) {
      console.error('Error al marcar como sincronizado:', error);
      return false;
    }
  }
}

// Singleton instance
const syncService = new SyncService();
export default syncService;