import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WatchFace } from '../../components/WatchFace';
import sensorService from '../../services/sensorService';

export const SensorsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [heartRate, setHeartRate] = useState(72);
  const [battery, setBattery] = useState(85);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Simular datos de sensores
    const interval = setInterval(() => {
      // Simular frecuencia cardíaca (60-100 bpm)
      const simulatedHR = Math.floor(Math.random() * 40) + 60;
      setHeartRate(simulatedHR);

      // Simular batería
      setBattery(prev => Math.max(0, prev - 0.1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getLocation = async () => {
    const loc = await sensorService.getCurrentLocation();
    if (loc) {
      setLocation(loc);
    }
  };

  const heartRateProgress = (heartRate - 40) / 120; // Normalizar entre 40-160 bpm
  const batteryProgress = battery / 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensores</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Frecuencia Cardíaca */}
        <View style={styles.sensorContainer}>
          <WatchFace
            title="Ritmo Cardíaco"
            value={heartRate}
            unit="bpm"
            iconName="heart"
            progress={heartRateProgress}
            color="#ef4444"
            size={200}
          />
        </View>

        {/* Batería */}
        <View style={styles.sensorContainer}>
          <WatchFace
            title="Batería"
            value={Math.round(battery)}
            unit="%"
            iconName="battery-full"
            progress={batteryProgress}
            color={battery > 20 ? '#22c55e' : '#ef4444'}
            size={200}
          />
        </View>

        {/* Ubicación */}
        <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
          <View style={[styles.locationIcon, { backgroundColor: '#dbeafe' }]}>
            <Ionicons name="location" size={24} color="#2563eb" />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Ubicación GPS</Text>
            {location ? (
              <View>
                <Text style={styles.locationText}>
                  Lat: {location.latitude.toFixed(4)}
                </Text>
                <Text style={styles.locationText}>
                  Lon: {location.longitude.toFixed(4)}
                </Text>
              </View>
            ) : (
              <Text style={styles.locationText}>Toca para obtener ubicación</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Acelerómetro Info */}
        <View style={styles.infoCard}>
          <View style={[styles.infoIcon, { backgroundColor: '#dcfce7' }]}>
            <Ionicons name="phone-portrait" size={24} color="#22c55e" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Acelerómetro</Text>
            <Text style={styles.infoText}>Activo</Text>
            <Text style={styles.infoSubtext}>Detección de movimiento</Text>
          </View>
        </View>

        {/* Giroscopio Info */}
        <View style={styles.infoCard}>
          <View style={[styles.infoIcon, { backgroundColor: '#fef3c7' }]}>
            <Ionicons name="refresh" size={24} color="#f59e0b" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Giroscopio</Text>
            <Text style={styles.infoText}>Activo</Text>
            <Text style={styles.infoSubtext}>Orientación del dispositivo</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home" size={24} color="#94a3b8" />
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sensorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
  },
  infoSubtext: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: '#0f172a',
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});

export default SensorsScreen;
