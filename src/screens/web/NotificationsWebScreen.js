import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import notificationService from '../../services/notificationService';

export const NotificationsWebScreen = () => {
  const [selectedType, setSelectedType] = useState('info');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [recentNotifications, setRecentNotifications] = useState([
    {
      id: '1',
      title: 'Meta de pasos alcanzada',
      body: 'El usuario usuario_demo ha completado su meta de 10,000 pasos',
      type: 'goal_achieved',
      timestamp: Date.now() - 3600000,
      sent: true,
    },
    {
      id: '2',
      title: 'Recordatorio de actividad',
      body: 'Es hora de moverse! Llevas 2 horas inactivo',
      type: 'reminder',
      timestamp: Date.now() - 7200000,
      sent: true,
    },
    {
      id: '3',
      title: 'Batería baja',
      body: 'El dispositivo SW-2024-X1 tiene 15% de batería',
      type: 'warning',
      timestamp: Date.now() - 10800000,
      sent: true,
    },
  ]);

  const notificationTypes = [
    { key: 'info', label: 'Informativa', icon: '📢', color: '#6b7280' },
    { key: 'reminder', label: 'Recordatorio', icon: '⏰', color: '#2563eb' },
    { key: 'goal_achieved', label: 'Meta', icon: '🎉', color: '#22c55e' },
    { key: 'warning', label: 'Alerta', icon: '⚠️', color: '#f59e0b' },
  ];

  const sendNotification = async () => {
    if (!title.trim() || !body.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const notification = {
      title,
      body,
      type: selectedType,
    };

    // Guardar en Firebase
    await notificationService.saveNotificationToFirebase(notification);
    
    // Enviar notificación local
    await notificationService.sendLocalNotification(title, body, { type: selectedType });

    // Agregar a la lista
    const newNotification = {
      id: Date.now().toString(),
      title,
      body,
      type: selectedType,
      timestamp: Date.now(),
      sent: true,
    };

    setRecentNotifications([newNotification, ...recentNotifications]);
    
    // Limpiar campos
    setTitle('');
    setBody('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Hace un momento';
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} minutos`;
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
    return date.toLocaleDateString('es-ES');
  };

  const getNotificationIcon = (type) => {
    const found = notificationTypes.find(t => t.key === type);
    return found ? found.icon : '📢';
  };

  const getNotificationColor = (type) => {
    const found = notificationTypes.find(t => t.key === type);
    return found ? found.color : '#6b7280';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Envío de Notificaciones</Text>
        <Text style={styles.subtitle}>Gestiona y envía notificaciones a los usuarios</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Formulario de envío */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nueva Notificación</Text>
          <View style={styles.formCard}>
            {/* Selector de tipo */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de Notificación</Text>
              <View style={styles.typeSelector}>
                {notificationTypes.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.typeButton,
                      selectedType === type.key && { 
                        backgroundColor: type.color + '20',
                        borderColor: type.color 
                      }
                    ]}
                    onPress={() => setSelectedType(type.key)}
                  >
                    <Text style={styles.typeIcon}>{type.icon}</Text>
                    <Text style={[
                      styles.typeLabel,
                      selectedType === type.key && { color: type.color }
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Título */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Meta alcanzada"
                placeholderTextColor="#94a3b8"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Cuerpo */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Mensaje</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ej: Has completado tu meta de pasos"
                placeholderTextColor="#94a3b8"
                value={body}
                onChangeText={setBody}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Botón de envío */}
            <TouchableOpacity style={styles.sendButton} onPress={sendNotification}>
              <Text style={styles.sendButtonText}>📤 Enviar Notificación</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notificaciones recientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones Recientes</Text>
          
          {recentNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={styles.notificationHeader}>
                <View style={styles.notificationIconContainer}>
                  <Text style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </Text>
                </View>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationTime}>{formatTime(notification.timestamp)}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getNotificationColor(notification.type) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getNotificationColor(notification.type) }
                  ]}>
                    {notification.sent ? 'Enviada' : 'Pendiente'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.notificationBody}>{notification.body}</Text>
              
              <View style={styles.notificationFooter}>
                <View style={[
                  styles.typeBadge,
                  { backgroundColor: getNotificationColor(notification.type) + '15' }
                ]}>
                  <Text style={[
                    styles.typeBadgeText,
                    { color: getNotificationColor(notification.type) }
                  ]}>
                    {notification.type === 'goal_achieved' ? 'Meta' :
                     notification.type === 'reminder' ? 'Recordatorio' :
                     notification.type === 'warning' ? 'Alerta' : 'Informativa'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Estadísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas de Notificaciones</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#2563eb' }]}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Enviadas Hoy</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#22c55e' }]}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Tasa de Entrega</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#8b5cf6' }]}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Leídas</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  typeButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    margin: 4,
  },
  typeIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1e293b',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  notificationBody: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default NotificationsWebScreen;