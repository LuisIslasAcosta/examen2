import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DashboardCard } from '../../components/web/DashboardCard';
import sensorService from '../../services/sensorService';

export const DataVisualizationScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [chartData, setChartData] = useState({
    steps: [6500, 8200, 7800, 9100, 8500, 7200, 8900],
    calories: [320, 410, 380, 450, 420, 350, 440],
    distance: [4.9, 6.2, 5.9, 6.9, 6.4, 5.4, 6.7],
  });

  const periods = [
    { key: 'day', label: 'Día' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mes' },
    { key: 'year', label: 'Año' },
  ];

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Calcular promedios
  const avgSteps = Math.round(chartData.steps.reduce((a, b) => a + b, 0) / chartData.steps.length);
  const avgCalories = Math.round(chartData.calories.reduce((a, b) => a + b, 0) / chartData.calories.length);
  const avgDistance = (chartData.distance.reduce((a, b) => a + b, 0) / chartData.distance.length).toFixed(1);

  // Encontrar máximos
  const maxSteps = Math.max(...chartData.steps);
  const maxCalories = Math.max(...chartData.calories);
  const maxDistance = Math.max(...chartData.distance);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visualización de Datos</Text>
        <Text style={styles.subtitle}>Análisis y estadísticas deportivas</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selector de período */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[styles.periodButton, selectedPeriod === period.key && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[styles.periodText, selectedPeriod === period.key && styles.periodTextActive]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resumen de promedios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promedios</Text>
          <View style={styles.statsGrid}>
            <DashboardCard
              title="Pasos Promedio"
              value={avgSteps.toLocaleString()}
              unit="pasos"
              icon="👟"
              color="#2563eb"
              subtitle="Por día"
            />
            <DashboardCard
              title="Calorías Promedio"
              value={avgCalories}
              unit="kcal"
              icon="🔥"
              color="#ef4444"
              subtitle="Por día"
            />
            <DashboardCard
              title="Distancia Promedio"
              value={avgDistance}
              unit="km"
              icon="📏"
              color="#22c55e"
              subtitle="Por día"
            />
          </View>
        </View>

        {/* Gráfico de barras - Pasos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pasos por Día</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Registro Semanal</Text>
              <Text style={styles.chartMax}>Máximo: {maxSteps.toLocaleString()}</Text>
            </View>
            
            <View style={styles.barChart}>
              {chartData.steps.map((steps, index) => {
                const height = (steps / maxSteps) * 150;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View style={[styles.bar, { height, backgroundColor: '#2563eb' }]}>
                        <Text style={styles.barValue}>{steps}</Text>
                      </View>
                    </View>
                    <Text style={styles.barLabel}>{days[index]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Gráfico de barras - Calorías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calorías Quemadas</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Registro Semanal</Text>
              <Text style={styles.chartMax}>Máximo: {maxCalories} kcal</Text>
            </View>
            
            <View style={styles.barChart}>
              {chartData.calories.map((calories, index) => {
                const height = (calories / maxCalories) * 150;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View style={[styles.bar, { height, backgroundColor: '#ef4444' }]}>
                        <Text style={styles.barValue}>{calories}</Text>
                      </View>
                    </View>
                    <Text style={styles.barLabel}>{days[index]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Gráfico de barras - Distancia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distancia Recorrida</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Registro Semanal (km)</Text>
              <Text style={styles.chartMax}>Máximo: {maxDistance} km</Text>
            </View>
            
            <View style={styles.barChart}>
              {chartData.distance.map((distance, index) => {
                const height = (distance / maxDistance) * 150;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View style={[styles.bar, { height, backgroundColor: '#22c55e' }]}>
                        <Text style={styles.barValue}>{distance}</Text>
                      </View>
                    </View>
                    <Text style={styles.barLabel}>{days[index]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Estadísticas adicionales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas Adicionales</Text>
          <View style={styles.extraStatsCard}>
            <View style={styles.extraStatItem}>
              <Text style={styles.extraStatIcon}>🎯</Text>
              <View style={styles.extraStatInfo}>
                <Text style={styles.extraStatLabel}>Días Activos</Text>
                <Text style={styles.extraStatValue}>7 / 7</Text>
              </View>
            </View>
            
            <View style={styles.extraStatItem}>
              <Text style={styles.extraStatIcon}>⭐</Text>
              <View style={styles.extraStatInfo}>
                <Text style={styles.extraStatLabel}>Mejor Día</Text>
                <Text style={styles.extraStatValue}>Jueves</Text>
              </View>
            </View>
            
            <View style={styles.extraStatItem}>
              <Text style={styles.extraStatIcon}>📈</Text>
              <View style={styles.extraStatInfo}>
                <Text style={styles.extraStatLabel}>Tendencia</Text>
                <Text style={[styles.extraStatValue, { color: '#22c55e' }]}>+12% ↑</Text>
              </View>
            </View>
            
            <View style={styles.extraStatItem}>
              <Text style={styles.extraStatIcon}>🏆</Text>
              <View style={styles.extraStatInfo}>
                <Text style={styles.extraStatLabel}>Récord Personal</Text>
                <Text style={styles.extraStatValue}>12,450 pasos</Text>
              </View>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#2563eb',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  periodTextActive: {
    color: '#ffffff',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  chartMax: {
    fontSize: 12,
    color: '#64748b',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: '70%',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    minHeight: 20,
  },
  barValue: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  barLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    fontWeight: '600',
  },
  extraStatsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  extraStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  extraStatIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  extraStatInfo: {
    flex: 1,
  },
  extraStatLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  extraStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});

export default DataVisualizationScreen;