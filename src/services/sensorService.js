import { Pedometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { ref, set, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

class SensorService {
  constructor() {
    this.isTracking = false;
    this.stepCount = 0;
    this.lastStepCount = 0;
    this.subscription = null;
    this.userId = null;
  }

  // Inicializar servicio con usuario
  initialize(userId) {
    this.userId = userId;
    this.lastStepCount = 0;
  }

  // Iniciar seguimiento de pasos
  async startStepTracking() {
    try {
      // Solicitar permisos de actividad física
      const permission = await Pedometer.requestPermissionsAsync();
      
      if (!permission.granted) {
        throw new Error('Permiso de actividad física denegado');
      }

      // Obtener recuento de pasos de las últimas 24 horas
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCount = await Pedometer.getStepCountAsync(start, end);
      this.lastStepCount = pastStepCount ? pastStepCount.steps : 0;
      this.stepCount = this.lastStepCount;

      // Suscribirse a actualizaciones en tiempo real
      this.subscription = Pedometer.watchStepCount((result) => {
        this.stepCount = this.lastStepCount + result.steps;
        
        // Guardar en Firebase
        this.saveStepData(result.steps);
      });

      this.isTracking = true;
      console.log('Seguimiento de pasos iniciado');
      return true;
    } catch (error) {
      console.error('Error al iniciar seguimiento:', error);
      return false;
    }
  }

  // Detener seguimiento
  stopStepTracking() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
    this.isTracking = false;
    console.log('Seguimiento de pasos detenido');
  }

  // Guardar datos de pasos en Firebase
  async saveStepData(newSteps) {
    if (!this.userId) return;

    try {
      const stepData = {
        userId: this.userId,
        totalSteps: this.stepCount,
        newSteps: newSteps,
        timestamp: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };

      const stepRef = ref(database, `steps/${this.userId}/${Date.now()}`);
      await set(stepRef, stepData);
    } catch (error) {
      console.error('Error al guardar pasos:', error);
    }
  }

  // Obtener recuento actual de pasos
  getCurrentSteps() {
    return this.stepCount;
  }

  // Obtener datos históricos de pasos
  getStepHistory(callback, days = 7) {
    if (!this.userId) return;

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