import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DevicesScreen = () => {
  const [devices, setDevices] = useState([
    {
      id: '1',
      name: 'Smartwatch Deportivo Pro',
      model: 'SW-2024-X1',
      userId: 'usuario_demo',
      status: 'online',
      battery: 85,
      lastSync: 'Hace 2 minutos',
      sensors: ['Podómetro', 'Acelerómetro', 'GPS', 'Ritmo Cardíaco'],
    },
    {
      id: '2',
      name: 'Smartwatch Deportivo Pro',
      model: 'SW-2024-X1',
      userId: 'usuario_2',
      status: 'online',
      battery: 62,
      lastSync: 'Hace 5 minutos',
      sensors: ['Podómetro', 'Acelerómetro', 'GPS'],
    },
    {
      id: '3',
      name: 'Smartwatch Básico',
      model: 'SW-2023-B2',
      userId: 'usuario_3',
      status: 'offline',
      battery: 15,
      lastSync: 'Hace 2 horas',
      sensors: ['Podómetro'],
    },
  ]);

  const getStatusColor = (status) => {
    return status === 'online' ? '#22c55e' : '#ef4444';
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return '#22c55e';
    if (battery > 20) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dispositivos Wearables</Text>
        <Text style={styles.subtitle}>Registro y administración</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.statValue}>{devices.filter(d => d.status === 'online').length}</Text>
            <Text style={styles.statLabel}>En Línea</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#ef4444' }]}>
            <Text style={styles.statValue}>{devices.filter(d => d.status === 'offline').length}</Text>
            <Text style={styles.statLabel}>Desconectados</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2563eb' }]}>
            <Text style={styles.statValue}>{devices.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Lista de dispositivos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dispositivos Registrados</Text>
          
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.deviceHeader}>
                <View style={styles.deviceInfo}>
                  <View style={[styles.deviceIcon, { backgroundColor: '#dbeafe' }]}>
                    <Ionicons name="watch" size={24} color="#2563eb" />
                  </View>
                  <View>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceModel}>{device.model}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(device.status) + '20' }]}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(device.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(device.status) }]}>
                    {device.status === 'online' ? 'En línea' : 'Desconectado'}
                  </Text>
                </View>
              </View>

              <View style={styles.deviceDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Usuario:</Text>
                  <Text style={styles.detailValue}>{device.userId}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Batería:</Text>
                  <View style={styles.batteryContainer}>
                    <View style={styles.batteryBar}>
                      <View style={[styles.batteryFill, { width: `${device.battery}%`, backgroundColor: getBatteryColor(device.battery) }]} />
                    </View>
                    <Text style={styles.batteryText}>{device.battery}%</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Última sync:</Text>
                  <Text style={styles.detailValue}>{device.lastSync}</Text>
                </View>
              </View>

              <View style={styles.sensorsContainer}>
                <Text style={styles.sensorsLabel}>Sensores:</Text>
                <View style={styles.sensorsList}>
                  {device.sensors.map((sensor, index) => (
                    <View key={index} style={styles.sensorTag}>
                      <Text style={styles.sensorText}>{sensor}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.deviceActions}>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2563eb' }]}>
                  <Text style={styles.actionText}>Ver Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#f59e0b' }]}>
                  <Text style={styles.actionText}>Sincronizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#ef4444' }]}>
                  <Text style={styles.actionText}>Desconectar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Botón agregar dispositivo */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Agregar Nuevo Dispositivo</Text>
        </TouchableOpacity>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
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
  deviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceEmoji: {
    fontSize: 24,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  deviceModel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deviceDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  batteryBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  batteryFill: {
    height: '100%',
    borderRadius: 3,
  },
  batteryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    width: 40,
    textAlign: 'right',
  },
  sensorsContainer: {
    marginBottom: 12,
  },
  sensorsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sensorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sensorTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  sensorText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  deviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DevicesScreen;