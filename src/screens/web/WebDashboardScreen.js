import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DashboardCard } from '../../components/web/DashboardCard';
import sensorService from '../../services/sensorService';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../../config/firebase';
import { Ionicons } from '@expo/vector-icons';

export const WebDashboardScreen = () => {
  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
    distance: 0,
    activeUsers: 1,
  });

  useEffect(() => {
    // Obtener datos reales desde Firebase
    const stepsRef = ref(database, 'steps');
    
    const unsubscribe = onValue(stepsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Calcular total de pasos de todos los usuarios
        let totalSteps = 0;
        let totalCalories = 0;
        let totalDistance = 0;
        let userCount = 0;

        Object.values(data).forEach((userData) => {
          if (userData) {
            const userSteps = Object.values(userData);
            userSteps.forEach((stepRecord) => {
              if (stepRecord && stepRecord.totalSteps) {
                totalSteps = Math.max(totalSteps, stepRecord.totalSteps);
              }
            });
            userCount++;
          }
        });

        // Calcular calorías y distancia basados en los pasos
        totalCalories = parseFloat(sensorService.calculateCalories(totalSteps));
        const distance = sensorService.calculateDistance(totalSteps);
        totalDistance = parseFloat(distance.km);

        setStats({
          steps: totalSteps,
          calories: totalCalories.toFixed(2),
          distance: totalDistance.toFixed(2),
          activeUsers: userCount || 1,
        });
      }
    });

    // Limpiar suscripción
    return () => off(stepsRef);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard Principal</Text>
        <Text style={styles.subtitle}>Monitoreo en tiempo real</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tarjetas de estadísticas principales */}
        <View style={styles.statsGrid}>
          <DashboardCard
            title="Pasos Totales"
            value={stats.steps.toLocaleString()}
            unit="pasos"
            iconName="footsteps"
            color="#2563eb"
            subtitle="Hoy"
          />
          
          <DashboardCard
            title="Calorías"
            value={stats.calories}
            unit="kcal"
            iconName="flame"
            color="#ef4444"
            subtitle="Quemadas hoy"
          />
          
          <DashboardCard
            title="Distancia"
            value={stats.distance}
            unit="km"
            iconName="map"
            color="#22c55e"
            subtitle="Recorrida hoy"
          />
          
          <DashboardCard
            title="Usuarios Activos"
            value={stats.activeUsers}
            unit=""
            iconName="people"
            color="#8b5cf6"
            subtitle="En línea ahora"
          />
        </View>

        {/* Sección de actividad reciente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#dbeafe' }]}>
                <Ionicons name="pulse" size={20} color="#2563eb" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Datos desde sensores</Text>
                <Text style={styles.activityTime}>Actualización en tiempo real</Text>
              </View>
              <Text style={styles.activityValue}>{stats.steps > 0 ? 'Activo' : 'Esperando'}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Meta de pasos actualizada</Text>
                <Text style={styles.activityTime}>Hace 1 minuto</Text>
              </View>
              <Text style={styles.activityValue}>75%</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#fee2e2' }]}>
                <Ionicons name="flame" size={20} color="#ef4444" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Calorías quemadas</Text>
                <Text style={styles.activityTime}>Hace 3 minutos</Text>
              </View>
              <Text style={styles.activityValue}>+45 kcal</Text>
            </View>
          </View>
        </View>

        {/* Rendimiento del sistema */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rendimiento del Sistema</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>API</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceFill, { width: '95%', backgroundColor: '#22c55e' }]} />
              </View>
              <Text style={styles.performanceValue}>95%</Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Firebase</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceFill, { width: '88%', backgroundColor: '#2563eb' }]} />
              </View>
              <Text style={styles.performanceValue}>88%</Text>
            </View>
            
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Sensores</Text>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceFill, { width: '100%', backgroundColor: '#22c55e' }]} />
              </View>
              <Text style={styles.performanceValue}>100%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 52,
  },
  performanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    width: 80,
  },
  performanceBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  performanceFill: {
    height: '100%',
    borderRadius: 4,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    width: 40,
    textAlign: 'right',
  },
});

export default WebDashboardScreen;