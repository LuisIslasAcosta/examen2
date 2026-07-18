import { Pedometer, Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { ref, set, onValue, off } from 'firebase/database';
import { databaseInstance } from '../config/firebase';
import syncService from './syncService';

// Verificar que Firebase esté disponible
const isFirebaseAvailable = databaseInstance !== null;

class SensorService {
  constructor() {
    this.isTracking = false;
    this.stepCount = 0;
    this.lastStepCount = 0;
    this.subscription = null;
    this.userId = null;
    this.accelerometerSubscription = null;
    this.lastAcceleration = { x: 0, y: 0, z: 0 };
    this.stepThreshold = 1.5; // Umbral para detectar un paso
    this.lastStepTime = 0;
    this.minStepInterval = 300; // Mínimo 300ms entre pasos
  }

  // Inicializar servicio con usuario
  initialize(userId) {
    this.userId = userId;
    this.lastStepCount = 0;
  }

  // Iniciar seguimiento de pasos
  async startStepTracking() {
    try {
      console.log('=== INICIANDO SEGUIMIENTO DE PASOS ===');
      
      // Verificar si el dispositivo tiene sensor de pasos
      console.log('Verificando disponibilidad del sensor...');
      const isAvailable = await Pedometer.isAvailableAsync();
      console.log('Sensor de pasos disponible:', isAvailable);
      
      // Si el Pedometer no está disponible, usar el acelerómetro como alternativa
      if (!isAvailable) {
        console.log('Pedometer no disponible, usando acelerómetro como alternativa');
        return this.startAccelerometerTracking();
      }
      
      // Solicitar permisos de actividad física
      console.log('Solicitando permisos...');
      const permission = await Pedometer.requestPermissionsAsync();
      console.log('Permiso de actividad física:', permission.granted ? 'concedido' : 'denegado');
      
      if (!permission.granted) {
        const errorMsg = 'Permiso de actividad física denegado';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      // Obtener recuento de pasos de las últimas 24 horas
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      console.log('Obteniendo pasos anteriores desde', start, 'hasta', end);
      try {
        const pastStepCount = await Pedometer.getStepCountAsync(start, end);
        console.log('Datos recibidos de getStepCountAsync:', pastStepCount);
        this.lastStepCount = pastStepCount ? pastStepCount.steps : 0;
      } catch (error) {
        console.log('No se pudieron obtener pasos anteriores, iniciando desde 0');
        this.lastStepCount = 0;
      }
      
      this.stepCount = this.lastStepCount;
      console.log('Pasos base establecidos:', this.lastStepCount);

      // Suscribirse a actualizaciones en tiempo real
      console.log('Iniciando watchStepCount...');
      this.subscription = Pedometer.watchStepCount((result) => {
        console.log('=== PASO DETECTADO (Pedometer) ===');
        console.log('Datos del sensor:', result);
        console.log('Pasos nuevos:', result.steps);
        // watchStepCount devuelve el total acumulado desde que se inició
        // Sumamos con el último recuento conocido para obtener el total
        this.stepCount = this.lastStepCount + result.steps;
        console.log('Total acumulado:', this.stepCount);
        
        // Guardar en Firebase
        this.saveStepData(result.steps);
      });

      this.isTracking = true;
      console.log('=== SEGUIMIENTO INICIADO EXITOSAMENTE (Pedometer) ===');
      return true;
    } catch (error) {
      console.error('=== ERROR AL INICIAR SEGUIMIENTO ===');
      console.error('Mensaje:', error.message);
      console.error('Stack:', error.stack);
      this.isTracking = false;
      return false;
    }
  }

  // Método alternativo usando acelerómetro
  async startAccelerometerTracking() {
    try {
      console.log('=== INICIANDO SEGUIMIENTO CON ACELERÓMETRO ===');
      
      // Solicitar permisos
      const permission = await Accelerometer.requestPermissionsAsync();
      console.log('Permiso acelerómetro:', permission.granted ? 'concedido' : 'denegado');
      
      if (!permission.granted) {
        throw new Error('Permiso de acelerómetro denegado');
      }

      // Configurar acelerómetro
      Accelerometer.setUpdateInterval(100); // Actualizar cada 100ms
      
      this.stepCount = 0;
      this.lastStepTime = 0;

      // Suscribirse al acelerómetro
      this.accelerometerSubscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        
        // Calcular la magnitud de la aceleración
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        
        // Detectar pico de aceleración (paso)
        const now = Date.now();
        if (magnitude > this.stepThreshold && 
            (now - this.lastStepTime) > this.minStepInterval) {
          
          this.stepCount++;
          this.lastStepTime = now;
          
          console.log('=== PASO DETECTADO (Acelerómetro) ===');
          console.log('Magnitud:', magnitude.toFixed(2));
          console.log('Total pasos:', this.stepCount);
          
          // Guardar en Firebase
          this.saveStepData(1);
        }
        
        this.lastAcceleration = { x, y, z };
      });

      this.isTracking = true;
      console.log('=== SEGUIMIENTO CON ACELERÓMETRO INICIADO ===');
      console.log('Camina para detectar pasos...');
      return true;
    } catch (error) {
      console.error('=== ERROR AL INICIAR ACELERÓMETRO ===');
      console.error('Mensaje:', error.message);
      this.isTracking = false;
      return false;
    }
  }

  // Detener seguimiento
  stopStepTracking() {
    try {
      // Detener suscripción del Pedometer
      if (this.subscription) {
        this.subscription.remove();
        this.subscription = null;
      }
      
      // Detener suscripción del acelerómetro
      if (this.accelerometerSubscription) {
        this.accelerometerSubscription.remove();
        this.accelerometerSubscription = null;
      }
      
      this.isTracking = false;
      console.log('Seguimiento de pasos detenido');
    } catch (error) {
      console.error('Error al detener seguimiento:', error);
    }
  }

  // Guardar datos de pasos en Firebase
  async saveStepData(newSteps) {
    const stepData = {
      totalSteps: this.stepCount,
      newSteps: newSteps,
      timestamp: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    // Si Firebase no está disponible, guardar localmente
    if (!this.userId || !isFirebaseAvailable) {
      console.log('Firebase no disponible, guardando localmente');
      this.saveLocalStepData(newSteps);
      // Intentar sincronizar con el servidor web
      await syncService.syncSteps(this.userId, stepData);
      return;
    }

    try {
      // Guardar en Firebase si está disponible
      if (databaseInstance) {
        const stepRef = ref(databaseInstance, `steps/${this.userId}/${Date.now()}`);
        await set(stepRef, {
          userId: this.userId,
          ...stepData
        });
      }
      
      // También sincronizar con el servidor web
      await syncService.syncSteps(this.userId, stepData);
    } catch (error) {
      console.error('Error al guardar pasos en Firebase, guardando localmente:', error);
      this.saveLocalStepData(newSteps);
      // Intentar sincronizar con el servidor web
      await syncService.syncSteps(this.userId, stepData);
    }
  }

  // Guardar datos de pasos localmente (AsyncStorage)
  async saveLocalStepData(newSteps) {
    try {
      const stepData = {
        totalSteps: this.stepCount,
        newSteps: newSteps,
        timestamp: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      
      // Guardar en localStorage para que la parte web pueda acceder
      if (typeof localStorage !== 'undefined') {
        const key = `steps_${this.userId || 'default'}`;
        const existingData = this.getLocalStepData() || [];
        const updatedData = [...existingData, stepData].slice(-100); // Mantener últimos 100
        localStorage.setItem(key, JSON.stringify(updatedData));
        console.log('Datos guardados en localStorage para sincronización web');
      }
      
      console.log('Datos guardados localmente:', stepData);
    } catch (error) {
      console.error('Error al guardar datos locales:', error);
    }
  }

  // Obtener datos locales de pasos
  getLocalStepData() {
    try {
      if (typeof localStorage !== 'undefined') {
        const key = `steps_${this.userId || 'default'}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
      }
      return [];
    } catch (error) {
      console.error('Error al obtener datos locales:', error);
      return [];
    }
  }

  // Obtener recuento actual de pasos
  getCurrentSteps() {
    return this.stepCount;
  }

  // Obtener datos históricos de pasos
  getStepHistory(callback, days = 7) {
    if (!this.userId || !isFirebaseAvailable) return;

    const stepsRef = ref(database, `steps/${this.userId}`);
    
    onValue(stepsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const history = Object.values(data).slice(-days);
        callback(history);
      }
    });

    // Retornar función para cancelar suscripción
    return () => off(stepsRef);
  }

  // Obtener ubicación actual
  async getCurrentLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('Permiso de ubicación denegado');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
        speed: location.coords.speed,
        timestamp: location.timestamp
      };
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      return null;
    }
  }

  // Calcular distancia recorrida (aproximada)
  calculateDistance(steps) {
    // Promedio: 0.762 metros por paso
    const metersPerStep = 0.762;
    const distanceMeters = steps * metersPerStep;
    const distanceKm = distanceMeters / 1000;
    
    return {
      meters: distanceMeters.toFixed(2),
      km: distanceKm.toFixed(2)
    };
  }

  // Calcular calorías quemadas (aproximado)
  calculateCalories(steps, weightKg = 70) {
    // Fórmula aproximada: 0.04 calorías por paso por kg
    const caloriesPerStep = 0.04;
    const totalCalories = steps * caloriesPerStep * (weightKg / 70);
    
    return totalCalories.toFixed(2);
  }
}

// Singleton instance
const sensorService = new SensorService();
export default sensorService;