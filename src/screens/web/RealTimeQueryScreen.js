import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ref, onValue, off, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../../config/firebase';

export const RealTimeQueryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('steps');
  const [realTimeData, setRealTimeData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [stats, setStats] = useState({
    totalSteps: 0,
    totalCalories: 0,
    totalDistance: 0,
    activeDevices: 0,
  });

  const metrics = [
    { key: 'steps', label: 'Pasos', icon: '👟', unit: 'pasos' },
    { key: 'calories', label: 'Calorías', icon: '🔥', unit: 'kcal' },
    { key: 'distance', label: 'Distancia', icon: '📏', unit: 'km' },
    { key: 'heartRate', label: 'Ritmo Cardíaco', icon: '❤️', unit: 'bpm' },
  ];

  useEffect(() => {
    // Simular datos en tiempo real
    if (isListening) {
      const interval = setInterval(() => {
        const newDataPoint = {
          id: Date.now(),
          timestamp: Date.now(),
          steps: Math.floor(Math.random() * 100) + 50,
          calories: (Math.random() * 10 + 5).toFixed(2),
          distance: (Math.random() * 0.1 + 0.05).toFixed(3),
          heartRate: Math.floor(Math.random() * 30) + 60,
          userId: 'usuario_demo',
          device: 'SW-2024-X1',
        };

        setRealTimeData(prev => [newDataPoint, ...prev].slice(0, 20));
        
        setStats(prev => ({
          totalSteps: prev.totalSteps + newDataPoint.steps,
          totalCalories: prev.totalCalories + parseFloat(newDataPoint.calories),
          totalDistance: prev.totalDistance + parseFloat(newDataPoint.distance),
          activeDevices: 3,
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isListening]);

  const toggleRealTimeListener = () => {
    setIsListening(!isListening);
  };

  const clearData = () => {
    setRealTimeData([]);
    setStats({
      totalSteps: 0,
      totalCalories: 0,
      totalDistance: 0,
      activeDevices: 0,
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getMetricValue = (dataPoint) => {
    switch (selectedMetric) {
      case 'steps': return dataPoint.steps;
      case 'calories': return dataPoint.calories;
      case 'distance': return dataPoint.distance;
      case 'heartRate': return dataPoint.heartRate;
      default: return 0;
    }
  };

  const selectedMetricData = metrics.find(m => m.key === selectedMetric);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consulta en Tiempo Real</Text>
        <Text style={styles.subtitle}>Monitoreo live de datos de sensores</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Controles */}
        <View style={styles.controlsCard}>
          <View style={styles.controlRow}>
            <TouchableOpacity
              style={[styles.controlButton, isListening && styles.controlButtonActive]}
              onPress={toggleRealTimeListener}
            >
              <Text style={styles.controlIcon}>
                {isListening ? '⏸' : '▶️'}
              </Text>
              <Text style={styles.controlText}>
                {isListening ? 'Detener' : 'Iniciar'} Monitoreo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.controlButtonSecondary]}
              onPress={clearData}
            >
              <Text style={styles.controlIcon}>🗑️</Text>
              <Text style={styles.controlText}>Limpiar</Text>
            </TouchableOpacity>
          </View>

          {/* Selector de métrica */}
          <View style={styles.metricSelector}>
            <Text style={styles.metricLabel}>Métrica a visualizar:</Text>
            <View style={styles.metricButtons}>
              {metrics.map((metric) => (
                <TouchableOpacity
                  key={metric.key}
                  style={[
                    styles.metricButton,
                    selectedMetric === metric.key && styles.metricButtonActive
                  ]}
                  onPress={() => setSelectedMetric(metric.key)}
                >
                  <Text style={styles.metricIcon}>{metric.icon}</Text>
                  <Text style={[
                    styles.metricText,
                    selectedMetric === metric.key && styles.metricTextActive
                  ]}>
                    {metric.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Estadísticas en tiempo real */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas Acumuladas</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#2563eb' }]}>
              <Text style={styles.statIcon}>👟</Text>
              <Text style={styles.statValue}>{Math.round(stats.totalSteps).toLocaleString()}</Text>
              <Text style={styles.statLabel}>Pasos Totales</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#ef4444' }]}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{stats.totalCalories.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Calorías (kcal)</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#22c55e' }]}>
              <Text style={styles.statIcon}>📏</Text>
              <Text style={styles.statValue}>{stats.totalDistance.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Distancia (km)</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#8b5cf6' }]}>
              <Text style={styles.statIcon}>⌚</Text>
              <Text style={styles.statValue}>{stats.activeDevices}</Text>
              <Text style={styles.statLabel}>Dispositivos</Text>
            </View>
          </View>
        </View>

        {/* Visualización en tiempo real */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Datos en Vivo - {selectedMetricData?.label}
            </Text>
            <View style={[
              styles.liveIndicator,
              isListening && styles.liveIndicatorActive
            ]}>
              <View style={styles.liveDot} />
              <Text style={[
                styles.liveText,
                isListening && styles.liveTextActive
              ]}>
                {isListening ? 'EN VIVO' : 'PAUSADO'}
              </Text>
            </View>
          </View>

          {/* Gráfico de línea en tiempo real */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>
                Últimos {realTimeData.length} registros
              </Text>
              <Text style={styles.chartUnit}>
                {selectedMetricData?.unit}
              </Text>
            </View>

            {realTimeData.length > 0 ? (
              <View style={styles.realTimeChart}>
                {realTimeData.slice(0, 10).map((dataPoint, index) => {
                  const value = getMetricValue(dataPoint);
                  const maxValue = Math.max(...realTimeData.map(d => getMetricValue(d)));
                  const height = maxValue > 0 ? (value / maxValue) * 150 : 50;
                  
                  return (
                    <View key={dataPoint.id} style={styles.chartBarContainer}>
                      <View style={styles.chartBarWrapper}>
                        <View style={[
                          styles.chartBar,
                          { 
                            height,
                            backgroundColor: isListening ? '#22c55e' : '#6b7280'
                          }
                        ]}>
                          <Text style={styles.chartBarValue}>
                            {typeof value === 'number' ? value.toFixed(1) : value}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.chartBarTime}>
                        {formatTime(dataPoint.timestamp)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.emptyChart}>
                <Text style={styles.emptyChartIcon}>📊</Text>
                <Text style={styles.emptyChartText}>
                  {isListening ? 'Esperando datos...' : 'Inicia el monitoreo para ver datos'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Lista de registros recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Registros Recientes ({realTimeData.length})
          </Text>

          {realTimeData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📡</Text>
              <Text style={styles.emptyText}>No hay datos disponibles</Text>
              <Text style={styles.emptySubtext}>
                Inicia el monitoreo para ver datos en tiempo real
              </Text>
            </View>
          ) : (
            <View style={styles.recordsList}>
              {realTimeData.slice(0, 10).map((record, index) => (
                <View key={record.id || index} style={styles.recordCard}>
                  <View style={styles.recordHeader}>
                    <View style={styles.recordIconContainer}>
                      <Text style={styles.recordIcon}>
                        {selectedMetricData?.icon}
                      </Text>
                    </View>
                    <View style={styles.recordInfo}>
                      <Text style={styles.recordTitle}>
                        {selectedMetricData?.label}: {getMetricValue(record)}
                      </Text>
                      <Text style={styles.recordTime}>
                        {formatTime(record.timestamp)}
                      </Text>
                    </View>
                    <View style={[
                      styles.recordStatus,
                      { backgroundColor: isListening ? '#dcfce7' : '#f1f5f9' }
                    ]}>
                      <View style={[
                        styles.recordStatusDot,
                        { backgroundColor: isListening ? '#22c55e' : '#6b7280' }
                      ]} />
                    </View>
                  </View>

                  <View style={styles.recordDetails}>
                    <View style={styles.recordDetailItem}>
                      <Text style={styles.recordDetailLabel}>Usuario:</Text>
                      <Text style={styles.recordDetailValue}>{record.userId}</Text>
                    </View>
                    <View style={styles.recordDetailItem}>
                      <Text style={styles.recordDetailLabel}>Dispositivo:</Text>
                      <Text style={styles.recordDetailValue}>{record.device}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Información de conexión */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Conexión Firebase</Text>
              <Text style={styles.infoText}>
                Estado: {isListening ? '🟢 Conectado' : '🔴 Desconectado'}
              </Text>
              <Text style={styles.infoSubtext}>
                Los datos se actualizan cada 2 segundos
              </Text>
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
  controlsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  controlRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: '#f1f5f9',
  },
  controlButtonActive: {
    backgroundColor: '#ef4444',
  },
  controlButtonSecondary: {
    backgroundColor: '#f59e0b',
  },
  controlIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  controlText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  metricSelector: {
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 10,
  },
  metricButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  metricButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    margin: 4,
  },
  metricButtonActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  metricIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  metricText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  metricTextActive: {
    color: '#2563eb',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
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
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  chartUnit: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  realTimeChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  chartBar: {
    width: '80%',
    borderRadius: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 6,
    minHeight: 20,
  },
  chartBarValue: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  chartBarTime: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 6,
    fontWeight: '600',
  },
  emptyChart: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChartIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyChartText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  liveIndicatorActive: {
    backgroundColor: '#dcfce7',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6b7280',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  liveTextActive: {
    color: '#22c55e',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  recordsList: {
    marginTop: 12,
  },
  recordCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recordIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  recordIcon: {
    fontSize: 18,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  recordTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  recordStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recordDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  recordDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordDetailLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 4,
  },
  recordDetailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#94a3b8',
  },
});

export default RealTimeQueryScreen;