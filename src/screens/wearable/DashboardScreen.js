import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WatchFace } from '../../components/WatchFace';
import sensorService from '../../services/sensorService';
import notificationService from '../../services/notificationService';

const { width } = Dimensions.get('window');

export const DashboardScreen = ({ navigation }) => {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  // Meta diaria de pasos
  const STEP_GOAL = 10000;

  useEffect(() => {
    initializeServices();
    return () => {
      sensorService.stopStepTracking();
    };
  }, []);

  const initializeServices = async () => {
    try {
      const userId = 'user_demo'; // En producción, obtener del auth
      sensorService.initialize(userId);
      await notificationService.initialize(userId);
      
      await notificationService.requestPermissions();
    } catch (error) {
      console.error('Error al inicializar servicios:', error);
    }
  };

  useEffect(() => {
    // Actualizar datos cada segundo
    const interval = setInterval(() => {
      const currentSteps = sensorService.getCurrentSteps();
      setSteps(currentSteps);
      
      const distanceData = sensorService.calculateDistance(currentSteps);
      setDistance(distanceData.km);
      
      const caloriesData = sensorService.calculateCalories(currentSteps);
      setCalories(caloriesData);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTracking = async () => {
    console.log('Botón presionado, isTracking:', isTracking);
    
    if (isTracking) {
      console.log('Deteniendo seguimiento...');
      sensorService.stopStepTracking();
      setIsTracking(false);
    } else {
      console.log('Iniciando seguimiento...');
      try {
        const success = await sensorService.startStepTracking();
        console.log('Resultado de startStepTracking:', success);
        if (success) {
          setIsTracking(true);
          console.log('Estado actualizado a tracking activo');
        } else {
          console.log('No se pudo iniciar el seguimiento');
          alert('No se pudo iniciar el seguimiento. Verifica que los sensores estén disponibles.');
        }
      } catch (error) {
        console.error('Error en toggleTracking:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  const progress = Math.min(steps / STEP_GOAL, 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>10:30</Text>
        <Text style={styles.date}>Lun, 7 Jul</Text>
      </View>

      <View style={styles.watchFaceContainer}>
        <WatchFace
          title="Pasos"
          value={steps}
          unit="pasos"
          iconName="footsteps"
          progress={progress}
          color="#2563eb"
          size={width * 0.85}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="flame" size={24} color="#ef4444" />
          <Text style={styles.statValue}>{calories}</Text>
          <Text style={styles.statLabel}>kcal</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="map" size={24} color="#22c55e" />
          <Text style={styles.statValue}>{distance}</Text>
          <Text style={styles.statLabel}>km</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, isTracking ? styles.buttonActive : styles.buttonInactive]}
        onPress={toggleTracking}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isTracking ? "pause" : "play"} 
          size={20} 
          color="#ffffff" 
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>
          {isTracking ? 'Detener' : 'Iniciar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Sensors')}
        >
          <Ionicons name="analytics" size={24} color="#94a3b8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications" size={24} color="#94a3b8" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  date: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  watchFaceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: '#ef4444',
  },
  buttonInactive: {
    backgroundColor: '#22c55e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default DashboardScreen;