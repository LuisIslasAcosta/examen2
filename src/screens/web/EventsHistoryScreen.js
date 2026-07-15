import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const EventsHistoryScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [events, setEvents] = useState([
    {
      id: '1',
      type: 'step_milestone',
      title: 'Hito de pasos alcanzado',
      description: 'El usuario usuario_demo alcanzó 5,000 pasos',
      user: 'usuario_demo',
      device: 'SW-2024-X1',
      timestamp: Date.now() - 1800000,
      severity: 'info',
    },
    {
      id: '2',
      type: 'goal_achieved',
      title: 'Meta diaria completada',
      description: 'Meta de 10,000 pasos completada por usuario_demo',
      user: 'usuario_demo',
      device: 'SW-2024-X1',
      timestamp: Date.now() - 3600000,
      severity: 'success',
    },
    {
      id: '3',
      type: 'battery_warning',
      title: 'Alerta de batería baja',
      description: 'El dispositivo SW-2024-X1 tiene 15% de batería',
      user: 'usuario_3',
      device: 'SW-2023-B2',
      timestamp: Date.now() - 5400000,
      severity: 'warning',
    },
    {
      id: '4',
      type: 'device_connected',
      title: 'Dispositivo conectado',
      description: 'Nuevo dispositivo SW-2024-X1 conectado por usuario_2',
      user: 'usuario_2',
      device: 'SW-2024-X1',
      timestamp: Date.now() - 7200000,
      severity: 'info',
    },
    {
      id: '5',
      type: 'notification_sent',
      title: 'Notificación enviada',
      description: 'Recordatorio de actividad enviado a 3 usuarios',
      user: 'Sistema',
      device: 'N/A',
      timestamp: Date.now() - 9000000,
      severity: 'info',
    },
    {
      id: '6',
      type: 'device_disconnected',
      title: 'Dispositivo desconectado',
      description: 'El dispositivo SW-2023-B2 se desconectó inesperadamente',
      user: 'usuario_3',
      device: 'SW-2023-B2',
      timestamp: Date.now() - 10800000,
      severity: 'error',
    },
    {
      id: '7',
      type: 'calorie_milestone',
      title: 'Hito de calorías',
      description: 'usuario_demo quemó 500 kcal en una sesión',
      user: 'usuario_demo',
      device: 'SW-2024-X1',
      timestamp: Date.now() - 14400000,
      severity: 'success',
    },
    {
      id: '8',
      type: 'sync_completed',
      title: 'Sincronización completada',
      description: 'Sincronización exitosa de 3 dispositivos',
      user: 'Sistema',
      device: 'Múltiples',
      timestamp: Date.now() - 18000000,
      severity: 'info',
    },
  ]);

  const filters = [
    { key: 'all', label: 'Todos', icon: '📋' },
    { key: 'info', label: 'Info', icon: 'ℹ️' },
    { key: 'success', label: 'Éxito', icon: '✅' },
    { key: 'warning', label: 'Alertas', icon: '⚠️' },
    { key: 'error', label: 'Errores', icon: '❌' },
  ];

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.severity === selectedFilter);

  const getEventIcon = (type) => {
    switch (type) {
      case 'step_milestone': return '👟';
      case 'goal_achieved': return '🎯';
      case 'battery_warning': return '🔋';
      case 'device_connected': return '🔗';
      case 'device_disconnected': return '🔌';
      case 'notification_sent': return '📢';
      case 'calorie_milestone': return '🔥';
      case 'sync_completed': return '🔄';
      default: return '📌';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#2563eb';
    }
  };

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case 'success': return '#dcfce7';
      case 'warning': return '#fef3c7';
      case 'error': return '#fee2e2';
      default: return '#dbeafe';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Hace un momento';
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} minutos`;
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial de Eventos</Text>
        <Text style={styles.subtitle}>Registro completo de actividades del sistema</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={styles.filterIcon}>{filter.icon}</Text>
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Estadísticas rápidas */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStatCard, { backgroundColor: '#2563eb' }]}>
            <Text style={styles.miniStatValue}>{events.length}</Text>
            <Text style={styles.miniStatLabel}>Total</Text>
          </View>
          <View style={[styles.miniStatCard, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.miniStatValue}>
              {events.filter(e => e.severity === 'success').length}
            </Text>
            <Text style={styles.miniStatLabel}>Éxitos</Text>
          </View>
          <View style={[styles.miniStatCard, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.miniStatValue}>
              {events.filter(e => e.severity === 'warning').length}
            </Text>
            <Text style={styles.miniStatLabel}>Alertas</Text>
          </View>
          <View style={[styles.miniStatCard, { backgroundColor: '#ef4444' }]}>
            <Text style={styles.miniStatValue}>
              {events.filter(e => e.severity === 'error').length}
            </Text>
            <Text style={styles.miniStatLabel}>Errores</Text>
          </View>
        </View>

        {/* Lista de eventos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Eventos ({filteredEvents.length})
          </Text>
          
          {filteredEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View style={[
                  styles.eventIconContainer,
                  { backgroundColor: getSeverityBgColor(event.severity) }
                ]}>
                  <Text style={styles.eventIcon}>{getEventIcon(event.type)}</Text>
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>{formatTime(event.timestamp)}</Text>
                </View>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: getSeverityColor(event.severity) + '20' }
                ]}>
                  <View style={[
                    styles.severityDot,
                    { backgroundColor: getSeverityColor(event.severity) }
                  ]} />
                </View>
              </View>

              <Text style={styles.eventDescription}>{event.description}</Text>

              <View style={styles.eventFooter}>
                <View style={styles.eventMeta}>
                  <Text style={styles.eventMetaLabel}>Usuario:</Text>
                  <Text style={styles.eventMetaValue}>{event.user}</Text>
                </View>
                <View style={styles.eventMeta}>
                  <Text style={styles.eventMetaLabel}>Dispositivo:</Text>
                  <Text style={styles.eventMetaValue}>{event.device}</Text>
                </View>
              </View>

              <View style={[
                styles.severityBar,
                { backgroundColor: getSeverityColor(event.severity) }
              ]} />
            </View>
          ))}
        </View>

        {/* Botón cargar más */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Cargar más eventos</Text>
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
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  miniStatCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  miniStatLabel: {
    fontSize: 11,
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
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventIcon: {
    fontSize: 22,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  severityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  severityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventMetaLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 4,
  },
  eventMetaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  severityBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  loadMoreButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  loadMoreText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EventsHistoryScreen;